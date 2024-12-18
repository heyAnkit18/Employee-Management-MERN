import React, { useState, useEffect } from 'react';
import { addEmployee, editEmployee } from './employeeService';

const EmployeeForm = ({ employeeData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    department_id: '',
    name: '',
    dob: '',
    phone: '',
    photo: '',
    email: '',
    salary: '',
    status: ''
  });

  const [alertMessage, setAlertMessage] = useState(null); // New state for alert message

  useEffect(() => {
    if (employeeData) {
      setFormData({
        department_id: employeeData.department_id,
        name: employeeData.name,
        dob: employeeData.dob,
        phone: employeeData.phone,
        photo: employeeData.photo,
        email: employeeData.email,
        salary: employeeData.salary,
        status: employeeData.status
      });
    }
  }, [employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (employeeData) {
      // Edit employee if employeeData exists
      editEmployee(employeeData.id, formData).then((res) => {
        setAlertMessage('Employee updated successfully!'); // Success message
        onSubmit();
        onClose();
        setTimeout(() => setAlertMessage(null), 3000); // Clear the alert after 3 seconds
      }).catch((err) => {
        console.error("Error editing employee:", err);
        setAlertMessage('Error updating employee. Please try again.'); // Error message
        setTimeout(() => setAlertMessage(null), 3000); // Clear the alert after 3 seconds
      });
    } else {
      // Add new employee
      addEmployee(formData).then((res) => {
        setAlertMessage('Employee added successfully!'); // Success message
        onSubmit();
        onClose();
        setTimeout(() => setAlertMessage(null), 3000); // Clear the alert after 3 seconds
      }).catch((err) => {
        console.error("Error adding employee:", err);
        setAlertMessage('Error adding employee. Please try again.'); // Error message
        setTimeout(() => setAlertMessage(null), 3000); // Clear the alert after 3 seconds
      });
    }
  };

  return (
    <div className="employee-form">
      <h2>{employeeData ? 'Edit Employee' : 'Add Employee'}</h2>
      {alertMessage && <div className="alert">{alertMessage}</div>} {/* Alert display */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Department ID</label>
          <input 
            type="text" 
            name="department_id" 
            value={formData.department_id} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <input 
            type="date" 
            name="dob" 
            value={formData.dob} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Phone</label>
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Photo URL</label>
          <input 
            type="text" 
            name="photo" 
            value={formData.photo} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Salary</label>
          <input 
            type="number" 
            name="salary" 
            value={formData.salary} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Status</label>
          <select 
            name="status" 
            value={formData.status} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <button type="submit">{employeeData ? 'Update' : 'Add'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
