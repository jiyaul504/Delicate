import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    qualifications: []
  });

  useEffect(() => {
    // Fetch employees from the API
    axios.get('http://localhost:5185/api/Employees')
      .then(response => {
        console.log('Employees data:', response.data);
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleQualificationChange = (e, index) => {
    const qualificationsCopy = [...newEmployee.qualifications];
    qualificationsCopy[index] = { ...qualificationsCopy[index], [e.target.name]: e.target.value };
    setNewEmployee({ ...newEmployee, qualifications: qualificationsCopy });
  };

  const handleAddQualification = () => {
    setNewEmployee({
      ...newEmployee,
      qualifications: [...newEmployee.qualifications, { degree: '', institution: '' }]
    });
  };

  const handleCreateEmployee = () => {
    // Make a POST request to create a new employee
    axios.post('http://localhost:5185/api/Employees', newEmployee)
      .then(response => {
        console.log('Employee created successfully:', response.data);
        // Fetch updated list of employees after creating a new one
        axios.get('http://localhost:5185/api/Employees')
          .then(response => {
            setEmployees(response.data);
          })
          .catch(error => {
            console.error('Error fetching employees:', error);
          });
      })
      .catch(error => {
        console.error('Error creating employee:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Employee Management</h2>

      <div className="mb-4">
        
        <form>
          <div className="form-row">
            <div className="col">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" className="form-control" id="firstName" name="firstName" value={newEmployee.firstName} onChange={handleInputChange} />
            </div>
            <div className="col">
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" className="form-control" id="lastName" name="lastName" value={newEmployee.lastName} onChange={handleInputChange} />
            </div>
          </div>

          <div className="mt-3">
            <h5>Qualifications:</h5>
            {newEmployee.qualifications.map((qualification, index) => (
              <div key={index} className="form-row mb-2">
                <div className="col">
                  <label htmlFor={`degree-${index}`}>Degree:</label>
                  <input type="text" className="form-control" id={`degree-${index}`} name="degree" value={qualification.degree} onChange={(e) => handleQualificationChange(e, index)} />
                </div>
                <div className="col">
                  <label htmlFor={`institution-${index}`}>Institution:</label>
                  <input type="text" className="form-control" id={`institution-${index}`} name="institution" value={qualification.institution} onChange={(e) => handleQualificationChange(e, index)} />
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-success" onClick={handleAddQualification}>Add Qualification</button>
          </div>

          <div className="mt-3">
            <button type="button" className="btn btn-primary" onClick={handleCreateEmployee}>Create Employee</button>
          </div>
        </form>
      </div>

      <hr />

      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Qualifications</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>
                <ul>
                  {employee.qualifications.map((qualification, index) => (
                    <li key={index}>
                      {qualification.degree} - {qualification.institution}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
