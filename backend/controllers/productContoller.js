const asyncHandler = require("express-async-handler"),
    Product = require("../models/product"),
    { fileSizeFormatter } = require("../utils/fileUpload"),
    cloudinary = require("cloudinary").v2;

//  create product
const createProduct = asyncHandler(async (req, res) => {
    const { name, sku, category, price, quantity, description } = req.body;

    //  Validation
    if (!name || !sku || !category || !price || !quantity || !description) {
        res.status(400)
        throw new Error("Please fill all fields")
    }

    //  Image upload
    let fileData = {}
    if (req.file) {
        //  Image save to cloudinary
        let uploadedfile;
        try {
            uploadedfile = await cloudinary.uploader.upload(req.file.path, {
                folder: "Inventory app",
                resource_type: "image"
            })
        } catch (error) {
            res.status(500);
            console.log(error);
            throw new Error("Image could not be uploaded")
        }
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedfile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size)
        }
    }

    //  product create
    const productCreate = await Product.create({
        user: req.user.id,
        name,
        sku,
        category,
        price,
        quantity,
        description,
        image: fileData
    })
    res.status(201).json(productCreate)
})

//  get all products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user.id }).sort("-createdAt")
    res.status(200).json(products)
})

//  get single product
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    //  product doesn't exist
    if (!product) {
        res.status(404)
        throw new Error("Product not found")
    }
    //  user not matched
    if (product.user.toString() !== req.user.id) {
        res.status(404)
        throw new Error("User not authorized")
    }
    //  user matched
    res.status(200).json(product)
})

//  delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    //  product doesn't exist
    if (!product) {
        res.status(404)
        throw new Error("Product not found")
    }
    //  user not matched
    if (product.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }
    // if user matched
    await product.deleteOne();
    res.status(200).json({
        product,
        message: "Product deleted"
    })
})

//  Update product
const updateProduct = asyncHandler(async (req, res) => {
    const { name, category, quantity, price, description } = req.body;
    const { id } = req.params;

    const product = await Product.findById(id);

    // if product doesn't exist
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    // Match product to it's user
    if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    //  Image upload
    let fileData = {}
    if (req.file) {
        //  Image save to cloudinary
        let uploadedfile;
        try {
            uploadedfile = await cloudinary.uploader.upload(req.file.path, {
                folder: "Inventory app",
                resource_type: "image"
            })
        } catch (error) {
            res.status(500);
            console.log(error);
            throw new Error("Image could not be uploaded")
        }
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedfile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size)
        }
    }

    // Update Product
    const updatedProduct = await Product.findByIdAndUpdate(
        { _id: id }, {
        name,
        category,
        quantity,
        price,
        description,
        image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    }, { new: true, runValidators: true }
    );
    res.status(200).json(updatedProduct);
});

module.exports = { createProduct, getProducts, getProduct, deleteProduct, updateProduct }