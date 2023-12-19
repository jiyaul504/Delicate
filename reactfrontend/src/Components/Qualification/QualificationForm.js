// QualificationForm.js
import React from 'react';
import { Field, reduxForm } from 'redux-form';

const QualificationForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="degree">Degree</label>
        <Field name="degree" component="input" type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="institution">Institution</label>
        <Field name="institution" component="input" type="text" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default reduxForm({ form: 'qualificationForm' })(QualificationForm);
