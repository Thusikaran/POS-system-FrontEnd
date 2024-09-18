import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Modal, Button, Spinner } from 'react-bootstrap';  
import { useNavigate } from 'react-router-dom';
import { deleteProduct, getAllcategory, getAllproduct } from '../../service/ProductService';

const Admin = () => {

  const [arr, setArr] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [originalArr, setOriginalArr] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    getAllProductData();
    getCategoryData();
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

  function getAllProductData() {
    setLoading(true); 
    getAllproduct()
      .then((response) => {
        setOriginalArr(response.data.$values);
        if(category === '')
        {
          setArr(response.data.$values);
        } 
        setLoading(false); 
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); 
      });
  }


  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [product, setProduct] = useState('');
  const [allCategory,setAllCategory]=useState([]);
  const navigate = useNavigate();

  const handleShow = (id, name) => {
    setDeleteId(id);
    setProduct(name);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleDelete = () => {
    console.log(`Deleting product with ID: ${deleteId}`);
    deleteProduct(deleteId).then((response)=>{
      window.location.reload();
   }).catch(error=>{
       console.log(error);
   })
    setShowModal(false);
  };

  const handleNavigate = (page) => {
    navigate(`/${page}`); 
  };

  const handleCategory = (e) => {
    const data = e.target.value;
    setCategory(data);
    if(data === ''){
      setArr(originalArr);
    }else{
      const filteredData = originalArr.filter((product) => product.categoryId == data);
      setArr(filteredData);
    }
};

  return (
    <div className='container mt-4'>
      <h3>POS System</h3>
      <div className='' style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='' style={{ width: '30vw' }}>
        <select
            className='form-select'
            aria-label='Default select example'
            id='Categoryid'
            onChange={handleCategory}
            value={category}
            >
              <option value=''>Select Category</option>
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
        </div>
        <div className=''>
        <button className='btn btn-primary me-3' onClick={() => handleNavigate('editcategories')}>Edit Categories</button>
          <button className='btn btn-primary' onClick={() => handleNavigate('addproduct')}>Add Product</button>
        </div>
      </div>
      <hr />
      
      {loading ? (
        <div className='text-center'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className='table-container' style={{ height: '80vh', overflowY: 'auto' }}>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th className='col-1'>ID</th>
                <th className='col-5'>Product Name</th>
                <th className='col-2'>Quantity</th>
                <th className='col-3'>Price</th>
                <th className='col-1'>Operation</th>
              </tr>
            </thead>
            <tbody>
              {arr.length > 0 ? arr.map((data) => (
                <tr key={data.productId}>
                  <th className='col-1'>{data.productId}</th>
                  <td className='col-5'>{data.productName}</td>
                  <td className='col-2'>{data.quantity}</td>
                  <td className='col-3'>LKR {data.price.toLocaleString('en-US')}/-</td>
                  <td className='col-1'>
                    <button 
                      className='btn btn-primary btn-sm me-2' 
                      style={{ cursor: 'pointer' }} 
                      onClick={() => handleNavigate(`editproduct?id=${data.productId}`)}
                      >
                      <FaRegEdit />
                    </button>
                    <button
                      className='btn btn-danger btn-sm'
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleShow(data.productId, data.productName)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className='text-center'>No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {product}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
