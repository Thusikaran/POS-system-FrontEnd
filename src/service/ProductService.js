import axios from "axios";

const BASE_URL = "https://localhost:7232/api/";


// Product part of operation
export const addProductonly = (data) => axios.post(BASE_URL+"Product/CreateProduct", data);
export const getAllproduct = () => axios.get(BASE_URL+"Product/GetAllProducts");
export const getproductbyid = (Id) => axios.get(BASE_URL+"Product/GetProductById?id="+Id);
export const deleteProduct= (Id) => axios.delete(BASE_URL+"Product/DeleteProduct?id="+Id);
export const updateProduct= (data) => axios.put(BASE_URL+'Product/UpdateProduct',data);

// Category part of operation
export const getAllcategory = () => axios.get(BASE_URL+"Category/GetAllCategories");
export const addProduct = (data) => axios.post(BASE_URL+"Category/CreateCategory", data);
export const getCategoryById = (Id) => axios.get(BASE_URL+"Category/GetCategoryById?id="+Id);
export const deleteCategory= (Id) => axios.delete(BASE_URL+"Category/DeleteCategory?id="+Id);
export const updateCategory= (data) => axios.put(BASE_URL+'Category/UpdateCategory',data);

//pos part of operation
export const getTotel = (data) => axios.post(BASE_URL+"POS/orderProducts", data);
