import React, { useState, useEffect } from 'react';
import { fetchEmployees, fetchSalaryRangeWiseCount, fetchYoungestEmployeeByDept } from './employeeService'; // Import the service functions
import './EmployeeList.css'; 

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [salaryRange, setSalaryRange] = useState({});
    const [youngestEmployees, setYoungestEmployees] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
              
                const employeesData = await fetchEmployees(page, limit);
                setEmployees(employeesData.data?.employees || []);
                setTotalPages(employeesData.data?.totalPages || 1);

                // Fetch salary range-wise employee count
                const salaryData = await fetchSalaryRangeWiseCount();
                setSalaryRange(salaryData.data?.salaryRangeCount || {});

                // Fetch youngest employees by department
                const youngestData = await fetchYoungestEmployeeByDept();
                setYoungestEmployees(youngestData.data?.youngestEmployeeByDept || []);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, limit]);

   
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

   
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    
    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="employee-list-container">
            <h1>Employee Portal</h1>

            {/* Salary Range Section */}
            <div className="salary-range">
                <h2 className="section-title">Salary Range Wise Employee Count</h2>
                <p>0 - 50,000: {salaryRange['0-50000'] || 0}</p>
                <p>50,001 - 100,000: {salaryRange['50001-100000'] || 0}</p>
                <p>100,000+: {salaryRange['100000+'] || 0}</p>
            </div>

            {/* Youngest Employee by Department Section */}
            <div className="youngest-employee">
                <h2 className="section-title">Youngest Employee by Department</h2>
                {youngestEmployees.length > 0 ? (
                    youngestEmployees.map((dept) => (
                        <div key={dept.department_name} className="department">
                            <p>
                                <strong>Department:</strong> {dept.department_name || 'N/A'}
                            </p>
                            <p>
                                <strong>Youngest Employee:</strong> {dept.youngest_employee || 'N/A'}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No data available.</p>
                )}
            </div>

            {/* Employee List Section */}
            <div className="employee-list">
                <h2 className="section-title">Employees</h2>
                {employees.length > 0 ? (
                    <ul>
                        {employees.map((employee) => (
                            <li key={employee.id}>
                                <strong>Name:</strong> {employee.name} - <strong>Salary:</strong> {employee.salary}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No employees found.</p>
                )}
            </div>

            {/* Pagination Section */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default EmployeeList;

