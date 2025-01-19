import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

if (!BACKEND_URL) {
    throw new Error("Backend URL is not defined. Check your .env file.");
}

const API_URL = `${BACKEND_URL}/api/products/`;

// Ensure cookies are sent with requests
axios.defaults.withCredentials = true;

// Utility for handling API errors
const handleApiError = (error) => {
    const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        "An unknown error occurred.";
    throw new Error(message);
};

// Generalized API request function
const apiRequest = async (method, url, data = null) => {
    try {
        const config = { method, url, data };
        const response = await axios(config);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// CRUD Operations
const createNewProduct = (formData) => apiRequest("POST", API_URL, formData);
const getProducts = () => apiRequest("GET", API_URL);
const deleteProduct = (id) => apiRequest("DELETE", `${API_URL}${id}`);
const getProduct = (id) => apiRequest("GET", `${API_URL}${id}`);
const updateProduct = (id, formData) =>
    apiRequest("PATCH", `${API_URL}${id}`, formData);

const productService = {
    createNewProduct,
    getProducts,
    deleteProduct,
    getProduct,
    updateProduct,
};

export default productService;
