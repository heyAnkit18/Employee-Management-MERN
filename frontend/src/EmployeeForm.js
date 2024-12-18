import React, { useState } from 'react';
import { addEmployee, updateEmployee } from './employeeService';

const EmployeeForm = ({ employeeToEdit }) => {
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

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submit for adding or updating employee
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (employeeToEdit) {
                await updateEmployee(employeeToEdit.id, formData);
                alert('Employee updated successfully');
            } else {
                await addEmployee(formData);
                alert('Employee added successfully');
            }
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    return (
        <div>
            <h2>{employeeToEdit ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                <input type="text" name="department_id" value={formData.department_id} onChange={handleChange} placeholder="Department ID" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" required />
                <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Status" required />
                <button type="submit">{employeeToEdit ? 'Update' : 'Add'} Employee</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
