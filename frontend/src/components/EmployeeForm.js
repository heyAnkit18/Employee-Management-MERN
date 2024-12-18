import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    department_id: '',
    name: '',
    dob: '',
    phone: '',
    photo: '',
    email: '',
    salary: '',
    status: '',
  });
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the POST request to the backend
      await axios.post('http://localhost:5000/api/employees', employee);
      fetchEmployees();  // Refresh the employee list after submission
      setEmployee({
        department_id: '',
        name: '',
        dob: '',
        phone: '',
        photo: '',
        email: '',
        salary: '',
        status: '',
      });  // Reset form fields
    } catch (error) {
      console.error('Error submitting employee data:', error);
      setError('Error submitting employee data');
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/employees?page=${currentPage}&limit=10`
      );
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Error fetching employees');
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();  // Initial fetch
  }, [currentPage]);

  return (
    <div>
      <h2>Add Employee</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          placeholder="Email"
          required
        />
        <input
          type="number"
          name="salary"
          value={employee.salary}
          onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
          placeholder="Salary"
          required
        />
        <button type="submit">Add Employee</button>
      </form>

      <h2>Employee List</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} - {emp.salary} - {emp.email}
          </li>
        ))}
      </ul>

      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default EmployeeForm;
