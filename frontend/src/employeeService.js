// src/employeeService.js

const API_URL = 'http://localhost:5000/api'; // Backend API URL

export const getEmployees = (page = 1, limit = 10) => {
  return fetch(`${API_URL}/employees?page=${page}&limit=${limit}`)
    .then(response => response.json());
};

export const addEmployee = (employeeData) => {
  return fetch(`${API_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData),
  }).then(response => response.json());
};

export const editEmployee = (id, employeeData) => {
  return fetch(`${API_URL}/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData),
  }).then(response => response.json());
};

export const deleteEmployee = (id) => {
  return fetch(`${API_URL}/employees/${id}`, {
    method: 'DELETE',
  }).then(response => response.json());
};

export const getStatistics = () => {
  return fetch(`${API_URL}/statistics`)
    .then(response => response.json());
};
