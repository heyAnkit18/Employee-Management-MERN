import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Fetch employees with pagination
export const fetchEmployees = async (page, limit) => {
    try {
        const response = await axios.get(`${API_URL}/employees?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

// Add new employee
export const addEmployee = async (employee) => {
    try {
        const response = await axios.post(`${API_URL}/employees`, employee, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
    }
};

// Update employee
export const updateEmployee = async (id, employee) => {
    try {
        const response = await axios.put(`${API_URL}/employees/${id}`, employee, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};

// Delete employee
export const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/employees/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};

// Fetch salary range wise employee count
export const fetchSalaryRangeWiseCount = async () => {
    try {
        const response = await axios.get(`${API_URL}/employees/salaryRangeWiseCount`);
        return response.data;
    } catch (error) {
        console.error('Error fetching salary range wise count:', error);
        throw error;
    }
};

// Fetch youngest employee by department
export const fetchYoungestEmployeeByDept = async () => {
    try {
        const response = await axios.get(`${API_URL}/employees/youngestEmployeeByDept`);
        return response.data;
    } catch (error) {
        console.error('Error fetching youngest employee by department:', error);
        throw error;
    }
};
