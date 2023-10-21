import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json', 
    Accept: "application/json",},
});


API.interceptors.request.use(
  (requisition) => {
    const token = localStorage.getItem('token');
    if (token && requisition.url !== '/login') {
      requisition.headers.Authorization = `Bearer ${token}`;
    }
    return requisition;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
