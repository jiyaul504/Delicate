// EmployeePage.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployee, createEmployee, updateEmployee, deleteEmployee } from '../../actions/employeeActions';
import EmployeeForm from './EmployeeForm';

const EmployeePage = ({ match, history }) => {
  const dispatch = useDispatch();
  const employee = useSelector(state => state.employees.find(e => e.id === parseInt(match.params.id)));

  React.useEffect(() => {
    if (match.params.id) {
      dispatch(fetchEmployee(match.params.id));
    }
  }, [dispatch, match.params.id]);

  const handleSubmit = (values) => {
    if (employee) {
      dispatch(updateEmployee(employee.id, values));
    } else {
      dispatch(createEmployee(values));
    }
    history.push('/employees');
  };

  const handleDelete = () => {
    dispatch(deleteEmployee(employee.id));
    history.push('/employees');
  };

  return (
    <div>
      <h2>{employee ? 'Edit Employee' : 'Create Employee'}</h2>
      <EmployeeForm onSubmit={handleSubmit} initialValues={employee} />
      {employee && (
        <div>
          <button className="btn btn-danger" onClick={handleDelete}>Delete Employee</button>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;
