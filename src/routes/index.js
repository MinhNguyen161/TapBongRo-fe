import React from "react";
import { Route, Switch } from "react-router-dom";
import PublicRoutes from "../routes/PublicRoutes";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={PublicRoutes} />
    </Switch>
  );
};

export default Routes;


/*

<AdminRoute path="/admin" component={AdminRoutes} />


*/