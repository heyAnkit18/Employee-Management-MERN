import React, { useState, useEffect } from 'react';
import { fetchEmployees, fetchSalaryRangeWiseCount, fetchYoungestEmployeeByDept } from './employeeService'; // Import the new functions

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [salaryRange, setSalaryRange] = useState({});
    const [youngestEmployees, setYoungestEmployees] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // Fetch employees data
        const fetchData = async () => {
            try {
                const employeesData = await fetchEmployees(page, limit);
                setEmployees(employeesData.data.employees);
                setTotalPages(employeesData.data.totalPages);

                const salaryData = await fetchSalaryRangeWiseCount();
                setSalaryRange(salaryData.data.salaryRangeCount);

                const youngestData = await fetchYoungestEmployeeByDept();
                setYoungestEmployees(youngestData.data.youngestEmployeeByDept);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [page, limit]);

    // Handle pagination change
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <h1>Employee List</h1>

            <div>
                <h2>Salary Range Wise Employee Count</h2>
                <p>0 - 50,000: {salaryRange['0-50000']}</p>
                <p>50,001 - 100,000: {salaryRange['50001-100000']}</p>
                <p>100,000+: {salaryRange['100000+']}</p>
            </div>

            <div>
                <h2>Youngest Employee by Department</h2>
                {youngestEmployees.map((dept) => (
                    <div key={dept.department_name}>
                        <p>Department: {dept.department_name}</p>
                        <p>Youngest Employee: {dept.youngest_employee}</p>
                    </div>
                ))}
            </div>

            <div>
                <h2>Employees</h2>
                <ul>
                    {employees.map((employee) => (
                        <li key={employee.id}>
                            {employee.name} - {employee.department_id} - {employee.salary}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <span> Page {page} of {totalPages} </span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default EmployeeList;

