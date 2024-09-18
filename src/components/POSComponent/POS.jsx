import React, {  useEffect, useState } from 'react';
import Paginator from '../common/Paginator';
import './POS.css'
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import {  Spinner ,Modal,Button} from 'react-bootstrap';  
import { getAllcategory, getAllproduct, getTotel } from '../../service/ProductService';

const POS = () => {

    const [arr, setArr] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [originalArr, setOriginalArr] = useState([]);
    const [category, setCategory] = useState('');
    const [filteredCards, setFilteredCards] = useState(arr);
    const [currentPage, setCurrentPage] = useState(1);
    const [CardsPerPage] = useState(9);
    const [Cards, setCards] = useState([]);
    const [productCounts, setProductCounts] = useState({});
    const [allCategory,setAllCategory]=useState([]);
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      getAllProductData();
      getCategoryData();
      if(category !== ''){
        const filteredData = originalArr.filter((product) => product.categoryId == category);
        setArr(filteredData);
      }
    }, [arr,category]); 
  
    // get category data
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
  
  //get product data
    function getAllProductData() {
      setLoading(true); 
      getAllproduct()
        .then((response) => {
          setOriginalArr(response.data.$values);
          if(category === '')
          {
            setArr(response.data.$values);
          } 
          // console.log(response.data.$values)
        
          setLoading(false);
          
        })
        .catch((error) => {
          console.log(error);
          setLoading(false); 
        });
        // console.log(arr)
        setFilteredCards(arr) 
    }

    //select bar to handle category
    const handleCategory = (e) => {
      const data = e.target.value;
      setCategory(data);
      if(data === ''){
        setArr(originalArr);
      }else{
        const filteredData = originalArr.filter((product) => product.categoryId == data);
        setArr(filteredData);
      }
      // console.log(arr)
  };

  //open model
  const handleShow = () => {
    if(totalCash===0){
      setShowModal(false);
    }else{
      const data = updatedArrWithCounts.map(({ productId, count }) => ({
        productId,
        Quantity: count 
    }));
    
    getTotel(data).then((response) => {
      console.log(response.data);
           setShowModal(true);
        })
        .catch((error) => {
        console.error(error);
        });

    }
    
  };

  //close model
  const handleClose = () => {
    setShowModal(false);
    setProductCounts({})
  }
    
// -------------------------------------------------------------
//pagination part
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
 
  const calculateTotalPages = (filteredCards, CardsPerPage, Cards) => {
    const totalCards = filteredCards.length > 0 ? filteredCards.length : Cards.length;
    return Math.ceil(totalCards / CardsPerPage);
  };

  const indexOfLastCard = currentPage * CardsPerPage;
  const indexOfFirstCard = indexOfLastCard - CardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  // add product quantity
  const handleAddClick = (data) => {
    setProductCounts((prevCounts) => {
        const currentCount = prevCounts[data.productId] || 0;
        if (currentCount < data.quantity) {
            const newCount = currentCount + 1;
            return {
                ...prevCounts,
                [data.productId]: newCount, 
            };
           

        }
        return prevCounts;  
    });
};

//remove quantity product
const handleRemove = (data) => {
    setProductCounts((prevCounts) => {
        const currentCount = prevCounts[data.productId] || 0;
        if (currentCount > 0) {
            const newCount = currentCount - 1;
            return {
                ...prevCounts,
                [data.productId]: newCount, 
            };
        }
        return prevCounts;  
    });
};

// add count dataset
const updatedArrWithCounts = originalArr.map((item) => {
    const count = productCounts[item.productId] || 0; 
    return {
      ...item,
      count
    };
  });

      

//calculate total
  function totalPayment() {
    const total = updatedArrWithCounts.reduce((accumulator, data) => {
        return accumulator + (data.count * data.price);
    }, 0);  // Start the sum at 0
    return total;
}

const totalCash = totalPayment();

  return (
    <div className='container'>
      <div className='mt-4 mb-3'>
        <h2>POS System</h2>
      </div>
      <div className='row'>
        <div className='col-md-6'>
        <select
            className='form-select'
            aria-label='Default select example'
            id='Categoryid'
            onChange={handleCategory}
            value={category}
            >
              <option value=''>Select Category</option>
               {
                    allCategory.map((data, index) => (
                        <option key={index} value={data.categoryId}>
                            {data.categoryName}
                        </option>
                     ))
                  }
            </select>
        </div>
        <div className='col-md-2'></div>
        <div className='col-md-4'>
        </div>
      </div>
      <hr />
      <div className='row '>
        <div className='col-md-9'>
            <div className='row mt-4'>
            {currentCards.map((data, index) => (
                <div key={index} className=' col-md-4 ms-3 me-3 mb-3 mt-2 pt-3 ps-4 pe-4 ' style={{ width: '18rem',border:'solid 2px',borderRadius:'10px'}}>
                <div className='card-body' >
                    <h5 className='card-title'>{data.productName}</h5>
                    <h6 className='card-subtitle mt-2 mb-3 text-muted'>
                    {data.quantity} stocks available
                    </h6>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <p className='card-text mt-1 border  ps-2 pe-2' style={{display:'flex',alignItems:'center',borderRadius:"5px",cursor:'pointer'}}> 
                            <MdDelete className='me-2' onClick={()=>handleRemove(data)}/> 
                            <b>{productCounts[data.productId] || 0}</b>
                            <FaPlus className='ms-2' onClick={()=>handleAddClick(data)} /> 
                        </p>
                        <p className='card-text mt-2'>{data.price}.00/- </p>     
                    </div>

                   
                </div>
                </div>
            ))}
            </div>
            <div className='row pagination-div'>
                <Paginator
                    currentPage={currentPage}
                    totalPages={calculateTotalPages(filteredCards, CardsPerPage, Cards)}
                    onPageChange={handlePaginationClick}
                />
            </div>
        </div>
        <div className='col-md-3 border right-container mt-4 p-3' style={{position:'relative'}}>
           <h5><center>Add card</center></h5> 
           <hr />
           <div className='row pt-2' style={{backgroundColor:'', height:'42vh',overflow:'auto'}}>
            <div>   
               { updatedArrWithCounts.map((data,index)=>(
                <span>
                  {data.count > 0 &&(
                     <div className='row ps-2 pe-4 mb-1 pt-1 ' style={{backgroundColor:'#e3fcf4', height:'4vh',fontSize:'1.8vh'}} key={index} >
                        <div className='col-md-1'>{data.count}</div>
                        <div className='col-md-7'>{data.productName}</div>
                        
                        <div className='col-md-4'>{data.count*data.price}.00</div>
                     </div>
                     )}
                     </span>
               ))}
               </div>
               
           </div>
           <hr />
           <div style={{display:'flex',justifyContent:'space-between'
           }}> 
              <p>Totel </p>
              <p>{totalCash}.00/-</p>     
             </div>
           <button className='btn btn-primary ps-4 pe-4 mt-1'  onClick={() => handleShow()} style={{float:'right'}} >Pay</button>
        </div>
       
      </div>

      {/* model content */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your payment has been processed successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default POS;
