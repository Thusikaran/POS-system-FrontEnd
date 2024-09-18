import React, { useEffect, useState } from 'react';
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';  
import { addProduct, addProductonly, getAllcategory, getAllproduct } from '../../service/ProductService';

const AddProduct = () => {
    const [category, setCategory] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [allCategory,setAllCategory]=useState({});
    const [allProduct,setAllProduct]=useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); 

    const [categoryOldName,setCategoryOldName]=useState('')

    useEffect(() => {
        getCategoryData();
        getProductData();
    }, []);

    const getCategoryData = () => {
        setLoading(true); 
        getAllcategory() 
            .then((response) => {
                setAllCategory(response.data.$values); 
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false); 
            });
    };
    const getProductData = () => {
        setLoading(true); 
        getAllproduct() 
            .then((response) => {
                setAllProduct(response.data.$values); 
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false); 
            });
    };

    console.log(allProduct);



    const handleCategory = (e) => {
        const data = e.target.value;
        setCategory(data);
        console.log(data);
        if (data === 'Add Category') {
            setShowCategoryForm(true);
        } else {
            setShowCategoryForm(false);
        }
    };

    const search =(name , Arr , object)=>{
        return Arr.some((data) => data[object] === name);
    }

    const validateForm = () => {
        const newErrors = {};
        if(category === 'Add Category')
        {
            if (!categoryName) newErrors.categoryName = "Category is required";
            if (search(categoryName,allCategory,"categoryName")) newErrors.categoryName = "This Category already exist";
            if (showCategoryForm && !description) newErrors.description = "Description is required";
        }else{
            if (!category) newErrors.category = "Category is required";
        }
        
        if (!productName) newErrors.productName = "Product name is required";
        if (search(productName,allProduct,"productName")) newErrors.productName = "This Product already exist";
        if (!quantity) newErrors.quantity = "Quantity is required";
        if (quantity<=0) newErrors.quantity = "Quantity not Valid";
        if (!price) newErrors.price = "Price is required";
        if (price<=0) newErrors.price = "Price not Valid";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            console.log("Form submitted successfully");
           
            if(category === "Add Category"){
                const data ={
                    "categoryName":categoryName,
                    "description":description,
                    "products":[
                        {
                            "productName":productName,
                           "price":price,
                            "quantity":quantity
                        }
                    ]
                }
                console.log(data);
                addProduct(data).then((response) => {
                    console.log(response.data);
                    handleNavigate('admin')
                 })
                .catch((error) => {
                console.error(error);
                });


            }else{
                const data ={
                            "productName":productName,
                            "price":price,
                            "quantity":quantity,
                            "categoryId":category,
                         }
                         console.log(data);
                         addProductonly(data).then((response) => {
                            console.log(response.data);
                            handleNavigate('admin')
                         })
                        .catch((error) => {
                        console.error(error);
                        });
        
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const handleNavigate = (page) => {
        navigate(`/${page}`);
    };

    if (loading) { return(
        <div className='text-center'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) }
      return (
        <div className='container' style={{ width: '60vw' }}>
            <div className='mt-3' style={{ position: 'relative' }}>
                <h3>Add Product</h3>
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
                        <select
                            className='form-select'
                            aria-label='Default select example'
                            id='Categoryid'
                            onChange={handleCategory}
                        >
                            <option value=''>Select Category</option>
                            <option value='Add Category'>Add Category</option>
                            {loading ? (
                                <option disabled>Loading categories...</option>
                            ) : (
                                allCategory.map((data, index) => (
                                <option key={index} value={data.categoryId}>
                                    {data.categoryName}
                                </option>
                                ))
                            )}
                        </select>
                        {errors.category && <div className="text-danger">{errors.category}</div>}
                    </div>

                    {showCategoryForm && (
                        <div>
                            <div className="mb-3">
                                <label htmlFor="Category" className="form-label">Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Category"
                                    placeholder="Enter category name ..."
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                                {errors.categoryName && <div className="text-danger">{errors.categoryName}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="Description" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    id="Description"
                                    rows="3"
                                    placeholder="Description about category ..."
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                                {errors.description && <div className="text-danger">{errors.description}</div>}
                            </div>
                        </div>
                    )}

                    <hr />

                    <div className="mb-3">
                        <label htmlFor="productname" className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productname"
                            placeholder="Enter product name ..."
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

export default AddProduct;
