import React, { useEffect, useState } from 'react';
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { getproductbyid, updateProduct } from '../../service/ProductService';
import { useLocation } from 'react-router-dom';

const EditProduct = () => {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get('id');  // Get the product ID from the query parameters
    const [arr, setArr] = useState({});
   
    useEffect(() => {
        getproductData();
    }, []);

    const getproductData = () => {
        getproductbyid(productId)  // Pass the productId to fetch the correct product
            .then((response) => {
                const product = response.data;
                setProductName(product.productName);  // Set the product name
                setQuantity(product.quantity);        // Set the product quantity
                setPrice(product.price);              // Set the product price
                setArr(product);   
                console.log(response.data)                   // Store other product details
            })
            .catch((error) => {
                console.log('hi')
                console.log(error);
            });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!productName) newErrors.productName = "Product name is required";
        if (!quantity) newErrors.quantity = "Quantity is required";
        if (!price) newErrors.price = "Price is required";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            const data = {
                "productId": productId,
                "productName": productName,
                "price": price,
                "quantity": quantity,
                "categoryId": arr.categoryId
            };
            console.log(data);
            updateProduct(data).then((response) => {
                console.log(response.data);
                console.log("Form submitted successfully");
                handleNavigate('admin');
            })
            .catch((error) => {
                console.error(error);
            });
        } else {
            setErrors(validationErrors);
        }
    };

    const handleNavigate = (page) => {
        navigate(`/${page}`);
    };

    return (
        <div className='container' style={{ width: '60vw' }}>
            <div className='mt-3' style={{ position: 'relative' }}>
                <h3>Edit Product</h3>
                <IoArrowBackCircle
                    style={{
                        position: 'absolute',
                        left: '-5vh',
                        top: '0.6vh',
                        fontSize: '4vh',
                        cursor: 'pointer'
                    }}
                    onClick={() => handleNavigate('admin')}
                />
            </div>
            <hr />
            <div className='border p-4 pb-2'>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="productname" className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productname"
                            placeholder="Enter product name ..."
                            value={productName}  // Pre-fill with the existing product name
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        {errors.productName && <div className="text-danger">{errors.productName}</div>}
                    </div>

                    <div className='row'>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="Quantity" className="form-label">Product Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="Quantity"
                                placeholder="Enter product quantity ..."
                                value={quantity}  // Pre-fill with the existing quantity
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                        </div>
                        <div className="mb-3 col-md-6">
                            <label htmlFor="Price" className="form-label">Product Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="Price"
                                placeholder="Enter product price ..."
                                value={price}  // Pre-fill with the existing price
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            {errors.price && <div className="text-danger">{errors.price}</div>}
                        </div>
                    </div>

                    <div className="col-auto" style={{ display: 'flex', justifyContent: 'center' }}>
                        <button type="submit" className="btn btn-primary mt-3 mb-3 ps-4 pe-4">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
