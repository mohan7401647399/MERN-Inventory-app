import React, { useEffect, useState } from 'react';
import { SpinnerImg } from '../../Loader/Loader';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../../redux/features/product/filterSlice';
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteProduct, getProducts } from "../../../redux/features/product/productSlice";
import { Link } from 'react-router-dom';

const ProductList = ({ products, isLoading }) => {
    const [search, setSearch] = useState("");
    const filteredProducts = useSelector(selectFilteredProducts);
    const dispatch = useDispatch()

    //  name shorting
    const shortenText = (text, n) => {
        if (text.length > n) {
            const shortText = text.substring(0, n).concat('...');
            return shortText
        }
        return text;
    }

    //  filter products
    useEffect(() => {
        dispatch(FILTER_PRODUCTS({ products, search }))
    }, [products, search, dispatch])

    //   Begin Pagination
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, filteredProducts]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
        setItemOffset(newOffset);
    };

    //  Delete
    const delProduct = async (id) => {
        await dispatch(deleteProduct(id))
        await dispatch(getProducts())
    }

    const confirmDelete = (id) => {
        confirmAlert({
            title: "Delete Product",
            message: "Are you sure you want to delete this product.",
            buttons: [
                {
                    label: "Delete",
                    onClick: () => delProduct(id),
                },
                {
                    label: "Cancel",
                },
            ],
        });
    };

    return (
        <div>
            <hr />
            <div className="p-1 w-100 overflow-x-auto m-auto">
                <div className='d-flex p-1 m-auto align-items-center justify-content-between'>
                    <span>
                        <h3 className=' text-purple-900'>Inventory Items</h3>
                    </span>
                    <span>
                        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                    </span>
                </div>
                {isLoading && <SpinnerImg />}
                <div className="w-100 text-2xl border-collapse p-1 m-auto">
                    {products.length === 0 ? (
                        <p className=' text-warning w-fit rounded-2 p-2 m-auto bg-black'>No Products found, Please add a new products here.</p>
                    ) : (
                        <table className='table table-bordered table-responsive table-hover'>
                            <thead className='border-4 border-t-blue-500 border-b-blue-500  solid'>
                                <tr>
                                    <th className='border-2 solid'>S.No</th>
                                    <th className='border-2 solid'>Name</th>
                                    <th className='border-2 solid'>Category</th>
                                    <th className='border-2 solid'>Price</th>
                                    <th className='border-2 solid'>Quantity</th>
                                    <th className='border-2 solid'>Value</th>
                                    <th className='border-2 solid'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='table-dark'>
                                {
                                    currentItems.map((product, index) => {
                                        const { _id, name, category, price, quantity } = product
                                        return (
                                            <tr key={_id}>
                                                <td >{index + 1} </td>
                                                <td> {shortenText(name, 16)} </td>
                                                <td>{category} </td>
                                                <td>{"Rs."}{price}</td>
                                                <td>  {quantity} </td>
                                                <td> {"Rs."} {price * quantity} </td>
                                                <td className='d-flex justify-content-between align-items-center'>
                                                    <span> <Link to={`/product-detail/${_id}`}><AiOutlineEye size={35} color={"yellow"} className='cursor-pointer' /></Link> </span>
                                                    <span> <Link to={`/edit-product/${_id}`}><FaEdit size={20} color={"lightGreen"} className='cursor-pointer' /></Link> </span>
                                                    <span> <FaTrashAlt size={20} color={"red"} className='cursor-pointer' onClick={() => confirmDelete(_id)} /></span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )}
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="Prev"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName="activePage"
                />
            </div>
        </div>
    );
}

export default ProductList;
