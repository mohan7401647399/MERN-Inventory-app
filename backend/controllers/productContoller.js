const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

//  create product
const createProduct = asyncHandler(async (req, res) => {
    const { name, sku, category, price, quantity, description } = req.body;

    //  Validation
    if (!name || !sku || !category || !price || !quantity || !description) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    //  Price and Quantity Validation
    if (isNaN(price) || isNaN(quantity)) {
        res.status(400);
        throw new Error("Price and quantity must be valid numbers");
    }

    //  Image upload
    let fileData = {};
    if (req.file) {
        let uploadedfile;
        try {
            uploadedfile = await cloudinary.uploader.upload(req.file.path, {
                folder: "Inventory app",
                resource_type: "image"
            });
        } catch (error) {
            res.status(500);
            console.log(error);
            throw new Error("Image could not be uploaded");
        }
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedfile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size)
        };
    }

    //  Create product
    const productCreate = await Product.create({
        user: req.user.id,
        name,
        sku,
        category,
        price,
        quantity,
        description,
        image: fileData
    });
    res.status(201).json(productCreate);
});

//  get all products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user.id }).sort("-createdAt");
    res.status(200).json(products);
});

//  get single product
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    if (product.user.toString() !== req.user.id) {
        res.status(404);
        throw new Error("User not authorized");
    }
    res.status(200).json(product);
});

//  delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    await product.deleteOne();
    res.status(200).json({
        product,
        message: "Product deleted"
    });
});

//  Update product
const updateProduct = asyncHandler(async (req, res) => {
    const { name, category, quantity, price, description } = req.body;
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    //  Image upload
    let fileData = {};
    if (req.file) {
        let uploadedfile;
        try {
            uploadedfile = await cloudinary.uploader.upload(req.file.path, {
                folder: "Inventory app",
                resource_type: "image"
            });
        } catch (error) {
            res.status(500);
            console.log(error);
            throw new Error("Image could not be uploaded");
        }
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedfile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size)
        };
    }

    //  Update Product
    const updatedProduct = await Product.findByIdAndUpdate(
        { _id: id },
        {
            name,
            category,
            quantity,
            price,
            description,
            image: Object.keys(fileData).length === 0 ? product.image : fileData
        },
        { new: true, runValidators: true }
    );
    res.status(200).json(updatedProduct);
});

module.exports = { createProduct, getProducts, getProduct, deleteProduct, updateProduct };
