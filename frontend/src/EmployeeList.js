// src/EmployeeList.js

import React, { useEffect, useState } from 'react';
import { getEmployees } from './employeeService';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getEmployees(currentPage).then(data => {
      setEmployees(data.employees);
      setTotalPages(data.totalPages);
    });
  }, [currentPage]);

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name} - {emp.salary}
          </li>
        ))}
      </ul>
      <div>
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
