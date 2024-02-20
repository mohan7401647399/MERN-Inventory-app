const express = require("express"),
    router = express.Router(),
    { createProduct, getProducts, getProduct, deleteProduct, updateProduct } = require("../controllers/productContoller"),
    protect = require("../middleware/auth"),
    { upload } = require("../utils/fileUpload")

router.post('/', protect, upload.single("image"), createProduct);
router.patch('/:id', protect, upload.single("image"), updateProduct);
router.get('/', protect, getProducts);
router.get('/:id', protect, getProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router