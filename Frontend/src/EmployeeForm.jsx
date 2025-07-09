import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeForm({ selectedEmployee, onSave, onCancel }) {
  const [form, setForm] = useState({ id: '', name: '', email: '', password: '' });

 
  useEffect(() => {
    if (selectedEmployee) {
      setForm(selectedEmployee);
    } else {
      setForm({ id: '', name: '', email: '', password: '' });
    }
  }, [selectedEmployee]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveEmployee = () => {
    axios.post('http://localhost:8080/api/Employee/insert', form).then(() => {
      onSave();
      setForm({ id: '', name: '', email: '', password: '' });
    });
  };

  const updateEmployee = () => {
    axios.put(`http://localhost:8080/api/Employee/update/${form.id}`, form).then(() => {
      onSave();
      setForm({ id: '', name: '', email: '', password: '' });
    });
  };

  return (
  <div style={{ marginBottom: '30px' }}>
    <h3>{form.id ? 'Update Employee' : 'Add New Employee'}</h3>

    {form.id && (
      <>
        <input
          name="id"
          placeholder="ID"
          value={form.id}
          readOnly
          style={{ margin: "10px", padding: "10px" }}
        /><br />
      </>
    )}

  
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        style={{ margin: "10px", padding: "10px", width: "250px" }}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={{ margin: "10px", padding: "10px", width: "250px" }}
      />
      <input
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        style={{ margin: "10px", padding: "10px", width: "250px" }}
      />
      {form.id ? (
        <>
          <button onClick={updateEmployee} style={{ margin: "5px" }}>Update</button>
          <button onClick={onCancel} style={{ margin: "5px" }}>Cancel</button>
        </>
      ) : (
        <button
          onClick={saveEmployee}
          style={{
            margin: "10px",
            padding: "10px",
            backgroundColor: "green",
            width: "180px",
            border: "none",
            borderRadius: "5px",
            color: "white"
          }}
        >
          Insert
        </button>
      )}
    </div>
  </div>
);

}

export default EmployeeForm;
