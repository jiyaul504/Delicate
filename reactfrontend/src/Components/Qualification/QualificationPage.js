
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQualification, createQualification, updateQualification, deleteQualification } from '../../actions/qualificationActions';
import QualificationForm from './QualificationForm';

const QualificationPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const qualification = useSelector(state => state.qualifications.find(q => q.id === parseInt(match.params.id)));

  React.useEffect(() => {
    if (match.params.id) {
      dispatch(fetchQualification(match.params.id));
    }
  }, [dispatch, match.params.id]);

  const handleSubmit = (values) => {
    if (qualification) {
      dispatch(updateQualification(qualification.id, values));
    } else {
      dispatch(createQualification(values));
    }
    history.push('/qualifications');
  };

  const handleDelete = () => {
    dispatch(deleteQualification(qualification.id));
    history.push('/qualifications');
  };

  return (
    <div>
      <h2>{qualification ? 'Edit Qualification' : 'Create Qualification'}</h2>
      <QualificationForm onSubmit={handleSubmit} initialValues={qualification} />
      {qualification && (
        <div>
          <button className="btn btn-danger" onClick={handleDelete}>Delete Qualification</button>
        </div>
      )}
    </div>
  );
};

export default QualificationPage;
