import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/employees?page=${page}&limit=${limit}`);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [page, limit]);

    return (
        <div>
            <h2>Employee List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.department_id}</td>
                            <td>{employee.salary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={() => setPage(page - 1)} disabled={page <= 1}>Previous</button>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default EmployeeList;
