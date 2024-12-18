import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stats = () => {
    const [highestSalary, setHighestSalary] = useState([]);
    const [salaryRange, setSalaryRange] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/stats/highest-salary')
            .then(response => setHighestSalary(response.data))
            .catch(error => console.error('Error fetching highest salary:', error));

        axios.get('http://localhost:5000/api/stats/salary-range')
            .then(response => setSalaryRange(response.data))
            .catch(error => console.error('Error fetching salary range stats:', error));
    }, []);

    return (
        <div>
            <h2>Statistics</h2>
            <h3>Department-wise Highest Salary</h3>
            <ul>
                {highestSalary.map((stat, index) => (
                    <li key={index}>{stat.department}: {stat.highest_salary}</li>
                ))}
            </ul>
            <h3>Salary Range-wise Employee Count</h3>
            <ul>
                {salaryRange.map((range, index) => (
                    <li key={index}>{range.salary_range}: {range.employee_count}</li>
                ))}
            </ul>
        </div>
    );
};

export default Stats;
