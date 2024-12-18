import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Stats from './components/Stats';

function App() {
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    const handleEmployeeAddedOrUpdated = () => {
        setSelectedEmployeeId(null); // Clear the form after add/edit
    };

    return (
        <div>
            
            <Stats />
            <EmployeeList />
            <EmployeeForm
                employeeId={selectedEmployeeId}
                onEmployeeAddedOrUpdated={handleEmployeeAddedOrUpdated}
            />
        </div>
    );
}

export default App;
