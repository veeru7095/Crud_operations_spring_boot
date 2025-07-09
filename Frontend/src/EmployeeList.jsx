import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeList({ refresh, onEdit }) {
  const [list, setList] = useState([]);

  const fetchAll = () => {
    axios.get('http://localhost:8080/api/Employee/getAll')
      .then(res => setList(res.data));
  };

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:8080/api/Employee/delete/${id}`).then(() => {
      fetchAll();
    });
  };

  useEffect(() => {
    fetchAll();
  }, [refresh]);

  return (
    <div>
      <h2 style={{textAlign:"center"}}>All Employees</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Password</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.password}</td>
              <td>
                <button onClick={() => deleteEmployee(emp.id)} 
                style={{backgroundColor:"red",height:"30px",width:"80px",
                 margin:"20px",borderRadius:"5px",border:"none"
                }}>Delete</button>
                <button onClick={() => onEdit(emp)}
                   style={{backgroundColor:"orange",height:"30px",width:"80px",
                 margin:"20px",borderRadius:"5px",border:"none"}}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
