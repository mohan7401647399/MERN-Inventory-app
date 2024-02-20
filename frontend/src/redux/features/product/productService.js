import axios from 'axios';

// const BACKEND_URL = 'http://localhost:5000'
const BACKEND_URL = 'https://inventory-billing-app-api.onrender.com'

const API_URL = `${BACKEND_URL}/api/products/`;

//  Create a new product
const createNewProduct = async (formData) => {
    const response = await axios.post(API_URL, formData)
    return response.data
}

//  Get all product
const getProducts = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

//  Delete a product
const deleteProduct = async (id) => {
    const response = await axios.delete(API_URL + id)
    return response.data
}

//  Delete a product
const getProduct = async (id) => {
    const response = await axios.get(API_URL + id)
    return response.data
}

//  Update product
const updateProduct = async (id, formData) => {
    const response = await axios.patch(`${API_URL}${id}`, formData)
    return response.data
}

const productService = {
    createNewProduct,
    getProducts,
    deleteProduct,
    getProduct,
    updateProduct
}

export default productService