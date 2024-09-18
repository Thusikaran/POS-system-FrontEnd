import React, { useEffect, useState } from 'react'
import { IoArrowBackCircle } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Spinner } from 'react-bootstrap'; 
import { addProduct, deleteCategory, getAllcategory, getAllproduct, updateCategory } from '../../service/ProductService';

const EditCategories = () => {
    const navigate = useNavigate();
    const [arr, setArr] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [category, setCategory] = useState('');
    const [allCategory,setAllCategory]=useState([]);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [categoryName,setCategoryName]= useState('');
    const [categoryOldName,setCategoryOldName]= useState('');
    const [description,setDescription]=useState('')
    const [categoryId,setCategoryId]=useState(null)
    const [errors, setErrors] = useState({});

  
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
            setArr(response.data.$values);
          setLoading(false); 
        })
        .catch((error) => {
          console.log(error);
          setLoading(false); 
        });
    }

    const handleDelete = () => {
        console.log(`Deleting product with ID: ${deleteId}`);
        deleteCategory(deleteId).then((response)=>{
          window.location.reload();
       }).catch(error=>{
           console.log(error);
       })
        setShowModal(false);
      };

    const handleClickEdit=(data)=>{
        setShowCategoryForm(true)
        setCategoryId(data.categoryId);
        setCategoryName(data.categoryName);
        setDescription(data.description)
    }

    const handleShow = (id, name) => {
        setDeleteId(id);
        setCategory(name);
        setShowModal(true);
      };
    
      const handleClose = () => setShowModal(false);

      const search =(name , Arr , object)=>{
        return Arr.some((data) => data[object] === name);
    }
    const handleNavigate = (page) => {
        navigate(`/${page}`);
    };

    const validateForm = () => {
        const newErrors = {};
            if (!categoryName) newErrors.categoryName = "Category is required";
            if(categoryName === categoryOldName){
                if (search(categoryName,allCategory,"categoryName")) newErrors.categoryName = "This Category already exist";
            }   
            if (showCategoryForm && !description) newErrors.description = "Description is required";  
        return newErrors;
    };
    const handleSubmit = (e) => {
       
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            console.log('done')
            const data ={
                "categoryId":categoryId,
                "categoryName":categoryName,
                "description":description,
            }
            console.log(data);
            updateCategory(data).then((response) => {
                console.log(response.data);
                console.log("Form submitted successfully");
                window.location.reload();
             })
            .catch((error) => {
            console.error(error);
            });
        }else {
            setErrors(validationErrors);
        }

    }
  return (
    <div className='container' style={{ width: '60vw' }}>
    <div className='mt-3' style={{ position: 'relative' }}>
        <h3>Categories</h3>
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

    <form onSubmit={handleSubmit}>
                    {showCategoryForm && (
                        <div>
                            <div className="mb-3">
                                <label htmlFor="Category" className="form-label">Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Category"
                                    value={categoryName}
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
                                    value={description}
                                    placeholder="Description about category ..."
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                                
                                {errors.description && <div className="text-danger">{errors.description}</div>}
                            </div>
                            <div className="col-auto" style={{ display: 'flex', justifyContent: 'right' }}>
                                <div type="" className="btn btn-light mt-3 mb-3 ps-4 pe-4 me-3" onClick={() => setShowCategoryForm(false)}>
                                    Cancel
                                </div>
                                <button type="submit" className="btn btn-primary mt-3 mb-3 ps-4 pe-4">
                                    Submit
                                </button>
                            </div>
                        </div>
                        
                    )}
                    <hr />
                    
                </form>


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
                <th className='col-1 '>Prod.count</th>
                <th className='col-3'>Category Name</th>
                
                <th className='col-6'>Describtion</th>     
                <th className='col-1'>Operation</th>
              </tr>
            </thead>
            <tbody>
              {allCategory.length > 0 ? allCategory.map((data) => (
                <tr key={data.categoryId}>
                  <td className='col-1 ps-4'>
                  {arr.filter((product) => product.categoryId === data.categoryId).length}
                </td>
                <td className='col-4'>{data.categoryName}</td>
                <td className='col-6'>{data.description}</td>
                {()=>setCategoryOldName(data.categoryName)}
                  <td className='col-1'>
                    <button 
                      className='btn btn-primary btn-sm me-2' 
                      style={{ cursor: 'pointer' }} 
                      onClick={() => handleClickEdit(data)}
                      >
                      <FaRegEdit />
                    </button>
                    <button
                      className='btn btn-danger btn-sm'
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleShow(data.categoryId, data.categoryName)}
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
        <Modal.Body>Are you sure you want to delete {category}?</Modal.Body>
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
  )
}

export default EditCategories