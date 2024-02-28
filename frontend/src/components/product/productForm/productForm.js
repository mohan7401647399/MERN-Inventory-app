import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from '../../card/Card';

const ProductForm = ({ product, productImage, imagePreview, description, setDescription, handleChange, handleImageChange, saveProduct }) => {
    return (
        <div className="add-product mb-20">
            <Card>
                <form onSubmit={saveProduct}>
                     <div className="card h-auto w-auto m-auto">
                        <label>Product Image</label>
                        <code className=" text-danger">
                            Supported Formats: jpg, jpeg, png
                        </code>
                        <input
                            required
                            type="file"
                            name="image"
                            onChange={(e) => handleImageChange(e)}
                            className='form-control rounded-2 p-1 m-auto mt-2'
                        />

                        {imagePreview != null ? (
                            <div className="image-preview mt-2 p-2">
                                <img src={imagePreview} alt="product" />
                            </div>
                        ) : (
                            <p className="text-warning">No image set for this poduct.</p>
                        )}
                    </div>
                    <label>Product Name:</label>
                    <input
                        required
                        type="text"
                        placeholder="Product name"
                        name="name"
                        value={product?.name}
                        onChange={handleChange}
                        className='form-control rounded-2 p-1 m-auto mt-2'
                    />

                    <label>Product Category:</label>
                    <input
                        required
                        type="text"
                        placeholder="Product Category"
                        name="category"
                        value={product?.category}
                        onChange={handleChange}
                        className='form-control rounded-2 p-1 m-auto mt-2'
                    />

                    <label>Product Price:</label>
                    <input
                        required
                        type="number"
                        placeholder="Product Price"
                        name="price"
                        value={product?.price}
                        onChange={handleChange}
                        className='form-control rounded-2 p-1 m-auto mt-2'
                    />

                    <label>Product Quantity:</label>
                    <input
                        required
                        type="number"
                        placeholder="Product Quantity"
                        name="quantity"
                        value={product?.quantity}
                        onChange={handleChange}
                        className='form-control rounded-2 p-1 m-auto mt-2'
                    />

                    <label>Product Description:</label>
                    <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        modules={ProductForm.modules}
                        formats={ProductForm.formats}
                    />

                    <div className="m-2">
                        <button onClick={saveProduct} type="submit" className="btn btn-primary hover:font-bold">
                            Save Product
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
}


ProductForm.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["clean"],
    ],
};
ProductForm.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "image",
    "code-block",
    "align",
];

export default ProductForm;
