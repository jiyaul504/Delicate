// src/redux/reducers.js
const initialState = {
    employees: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_EMPLOYEES':
        return { ...state, employees: action.payload };
  
      case 'ADD_EMPLOYEE':
        return { ...state, employees: [...state.employees, action.payload] };
  
      default:
        return state;
    }
  };
  
  export default rootReducer;
  