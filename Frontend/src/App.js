import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setEditingEmployee(null); // Close form after save
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1 style={{textAlign:"center"}}>Employee Management</h1>
      <EmployeeForm
        selectedEmployee={editingEmployee}
        onSave={triggerRefresh}
        onCancel={() => setEditingEmployee(null)}
      />
      <EmployeeList refresh={refreshKey} onEdit={handleEdit} />
    </div>
  );
}

export default App;
