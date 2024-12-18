import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Fetch employees with pagination
export const fetchEmployees = async (page, limit) => {
    return axios.get(`${API_URL}/employees?page=${page}&limit=${limit}`);
};

// Add new employee
export const addEmployee = async (employee) => {
    return axios.post(`${API_URL}/employees`, employee);
};

// Update employee
export const updateEmployee = async (id, employee) => {
    return axios.put(`${API_URL}/employees/${id}`, employee);
};

// Delete employee
export const deleteEmployee = async (id) => {
    return axios.delete(`${API_URL}/employees/${id}`);
};

// Fetch salary range wise employee count
export const fetchSalaryRangeWiseCount = async () => {
    return axios.get(`${API_URL}/employees/salaryRangeWiseCount`);
};

// Fetch youngest employee by department
export const fetchYoungestEmployeeByDept = async () => {
    return axios.get(`${API_URL}/employees/youngestEmployeeByDept`);
};
