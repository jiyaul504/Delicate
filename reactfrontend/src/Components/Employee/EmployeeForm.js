import React from 'react';
import { connect } from 'react-redux';
import { createEmployee, updateEmployee } from './employeeActions';

function EmployeeForm({ employee, createEmployee, updateEmployee }) {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName } = formData;

    if (employee) {
      // If employee is provided, update the existing employee
      updateEmployee(employee.id, { firstName, lastName });
    } else {
      // If no employee provided, create a new employee
      createEmployee({ firstName, lastName });
    }

    // Reset the form after submission
    setFormData({
      firstName: '',
      lastName: '',
    });
  };

  return (
    <div>
      <h2>{employee ? 'Edit Employee' : 'Create Employee'}</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {employee ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  // Assuming you have an employee reducer with a selectedEmployee property
  employee: state.employee.selectedEmployee,
});

const mapDispatchToProps = {
  createEmployee,
  updateEmployee,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
