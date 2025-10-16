import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

//  Get all products
export const getAllProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

//  Get products by category
export const getProductsByCategory = async (category) => {
  const res = await axios.get(`${API_URL}/category/${category}`);
  return res.data;
};

//  Get single product by ID
export const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

//  Update product
export const updateProduct = async (id, formData) => {
  const res = await axios.put(`${API_URL}/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
