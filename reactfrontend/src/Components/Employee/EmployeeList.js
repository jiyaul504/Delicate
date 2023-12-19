
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../../actions/employeeActions';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>{employee.firstName} {employee.lastName}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
