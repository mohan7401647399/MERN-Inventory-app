import React, { useEffect } from 'react';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getProducts } from '../../redux/features/product/productSlice';
import ProductList from '../../components/product/productList/ProductList';
import ProductSummary from '../../components/product/productSummary/ProductSummary';

const Dashboard = () => {
    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch()

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const { products, isLoading, isError, message } = useSelector((state) => state.product);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getProducts()).unwrap().catch((err) => {
                console.error("Failed to fetch products:", err);
            });
        }
        if (isError) {
            console.log("Error fetching products:", message);
        }
    }, [isLoggedIn, isError, message, dispatch])

    return (
        <div>
            <ProductSummary products={ products } />
            <ProductList products={ products } isLoading={ isLoading } />
        </div>
    );
}

export default Dashboard;
