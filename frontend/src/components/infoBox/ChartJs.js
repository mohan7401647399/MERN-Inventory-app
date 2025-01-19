import React, { useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { CALC_STORE_VALUE, selectTotalStoreValue, CALC_OUT_OF_STOCK, selectOutOfStock, CALC_CATEGORY, selectCategory } from '../../redux/features/product/productSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Inventory matrix',
            padding: {
                top: 10,
                bottom: 20
            },
            font: {
                size: 30
            }
        },
    },
};

export const labels = [];

// export const data = {
//     labels,
//     datasets: [
//         {
//             label: 'Total Products',
//             data: [1, 2, 3],
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         },
//         {
//             label: 'Total Store Value',
//             data: [4, 5, 6],
//             backgroundColor: 'rgba(53, 162, 235, 0.5)',
//         },
//     ],
// };

export function ChartJs({ products }) {

    const dispatch = useDispatch();
    const totalStoreValue = useSelector(selectTotalStoreValue);
    const outOfStock = useSelector(selectOutOfStock)
    const category = useSelector(selectCategory)

    useEffect(() => {
        dispatch(CALC_STORE_VALUE(products))
        dispatch(CALC_OUT_OF_STOCK(products))
        dispatch(CALC_CATEGORY(products))

    }, [dispatch, products])

    const data = {
        labels,
        datasets: [
            {
                label: 'Total Store Value',
                data: { totalStoreValue },
                backgroundColor: 'green',
            },
            {
                label: 'Category',
                data: { category },
                backgroundColor: 'blue',
            },
            {
                label: 'Out Of Stock',
                data: { outOfStock },
                backgroundColor: 'yellow',
            }
        ],
    };

    return <Bar style={ { width: 120, height: 150 } } options={ options } data={ data } />;
}