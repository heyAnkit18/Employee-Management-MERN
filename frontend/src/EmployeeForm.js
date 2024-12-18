import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './EmployeeForm.css'; 

const EmployeeForm = ({ employeeToEdit }) => {
    const [formData, setFormData] = useState({
        department_name: '',
        name: '',
        dob: '',
        phone: '',
        photo: '',
        email: '',
        salary: '',
        status: ''
    });

    useEffect(() => {
        if (employeeToEdit) {
            setFormData({
                ...employeeToEdit,
            });
        }
    }, [employeeToEdit]);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

   
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            photo: e.target.files[0],
        });
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('dob', formData.dob);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('salary', formData.salary);
        formDataToSend.append('status', formData.status);
        formDataToSend.append('department_name', formData.department_name);
        if (formData.photo) {
            formDataToSend.append('photo', formData.photo);
        }

        try {
            if (employeeToEdit) {
                await axios.put(`/api/employees/${employeeToEdit.id}`, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                alert('Employee updated successfully');
            } else {
                await axios.post('/api/employees', formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                alert('Employee added successfully');
            }
        } catch (error) {
            console.error('Error submitting form', error);
            alert('Error submitting form. Please try again.');
        }
    };

    return (
        <div className="employee-form-container">
            <h2>{employeeToEdit ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        id="name"
                        placeholder="Enter name"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="department_name">Department</label>
                    <input
                        type="text"
                        name="department_name"
                        value={formData.department_name}
                        onChange={handleChange}
                        id="department_name"
                        placeholder="Enter department"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        id="dob"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        id="phone"
                        placeholder="Enter phone number"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        id="email"
                        placeholder="Enter email"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="salary">Salary</label>
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        id="salary"
                        placeholder="Enter salary"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="status">Status</label>
                    <input
                        type="text"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        id="status"
                        placeholder="Enter status"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="photo">Photo</label>
                    <input
                        type="file"
                        name="photo"
                        onChange={handleFileChange}
                        id="photo"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="submit-button"
                    >
                        {employeeToEdit ? 'Update' : 'Add'} Employee
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;



