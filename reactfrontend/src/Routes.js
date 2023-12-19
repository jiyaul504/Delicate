

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/employees" component={EmployeeList} />
      <Route exact path="/qualifications" component={QualificationList} />
      <Route path="/employees/:id" component={EmployeePage} />
      <Route path="/qualifications/:id" component={QualificationPage} />
    </Switch>
  </Router>
);

export default Routes;
