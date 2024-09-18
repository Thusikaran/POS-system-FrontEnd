import React from 'react'
import './Paginator.css'


const Paginator = ({currentPage,totalPages,onPageChange}) => {
    const pageNumbers = Array.from({length:totalPages},(_,i)=>i+1)
  return (
    <nav>
        <ul className="pagination justify-content-center mt-4">
           {pageNumbers.map((pageNumber)=>(
            <li key={pageNumber}
                className={`page-item ${currentPage === pageNumber?"active" : ""}`}
            >
                <button className="page-link pt-2 pb-2 ps-3 pe-3" onClick={()=>onPageChange(pageNumber)}>
                    {pageNumber}
                </button>
            </li>
           ))}
        </ul>
    </nav>
  )
}

export default Paginator