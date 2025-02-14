import React, { useEffect } from 'react';
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from '../../infoBox/InfoBox'
import './ProductSummary.scss';
import { useDispatch, useSelector } from "react-redux";
import { CALC_STORE_VALUE, selectTotalStoreValue, CALC_OUT_OF_STOCK, selectOutOfStock, CALC_CATEGORY, selectCategory } from '../../../redux/features/product/productSlice';
import { ChartJs } from '../../infoBox/ChartJs';

// Icons
const earningIcon = <AiFillDollarCircle size={ 40 } color="#fff" />;
const productIcon = <BsCart4 size={ 40 } color="#fff" />;
const categoryIcon = <BiCategory size={ 40 } color="#fff" />;
const outOfStockIcon = <BsCartX size={ 40 } color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products }) => {
    const dispatch = useDispatch();
    const totalStoreValue = useSelector(selectTotalStoreValue);
    const outOfStock = useSelector(selectOutOfStock)
    const category = useSelector(selectCategory)

    useEffect(() => {
        dispatch(CALC_STORE_VALUE(products))
        dispatch(CALC_OUT_OF_STOCK(products))
        dispatch(CALC_CATEGORY(products))

    }, [dispatch, products])

    return (
        <div className="product-summary">
            <h3 className='font-bold p-2 m-auto hover:font-black'>Inventory status</h3>
            <div className="info-summary">
                <InfoBox icon={ productIcon } title={ "Total Products" } count={ products.length } bgColor={ "card1" } />
                <InfoBox icon={ earningIcon } title={ "Total Store Value" } count={ totalStoreValue.toFixed(2) } bgColor={ "card2" } />
                <InfoBox icon={ outOfStockIcon } title={ "Out of Stock" } count={ outOfStock } bgColor={ "card3" } />
                <InfoBox icon={ categoryIcon } title={ "All Categories" } count={ category.length } bgColor={ "card4" } />
            </div>
            <ChartJs products={ products } />
        </div>
    );
}

export default ProductSummary;
