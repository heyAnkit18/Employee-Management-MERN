import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchEmployees = async (page, limit) => {
    return axios.get(`${API_URL}/employees?page=${page}&limit=${limit}`);
};

export const addEmployee = async (employee) => {
    return axios.post(`${API_URL}/employees`, employee);
};

export const updateEmployee = async (id, employee) => {
    return axios.put(`${API_URL}/employees/${id}`, employee);
};

export const deleteEmployee = async (id) => {
    return axios.delete(`${API_URL}/employees/${id}`);
};
