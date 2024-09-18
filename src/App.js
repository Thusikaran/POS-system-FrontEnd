import React from 'react';
import POSpage from './Pages/POSpage';
import Adminpage from './Pages/Adminpage';
import "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from './components/AdminComponent/AddProduct';
import NotFound from './Pages/NotFound';
import EditProduct from './components/AdminComponent/EditProduct';
import EditCategories from './components/AdminComponent/EditCategories';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<POSpage />} />
          <Route path='/admin' element={<Adminpage />} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/editproduct' element={<EditProduct />} />
          <Route path='/editcategories' element={<EditCategories />} />
          
          {/* 404 Page Not Found */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
