import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleAddEmployee = () => {
    setIsFormOpen(true);
    setSelectedEmployee(null);
  };

  const handleEditEmployee = (employee) => {
    setIsFormOpen(true);
    setSelectedEmployee(employee);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = () => {
    // Refresh employee list after adding or editing
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <button onClick={handleAddEmployee}>Add Employee</button>
      
      {isFormOpen && (
        <EmployeeForm
          employeeData={selectedEmployee}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
        />
      )}
      
      <EmployeeList onEdit={handleEditEmployee} />
    </div>
  );
};

export default App;
