import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ ...rest }) => {
    const isAuthorized = useSelector((state) => state.auth.isAuthorized); //NOTE khong hieu cho nay
    if (isAuthorized) return <Route {...rest} />;
    delete rest.component;
    return <Route {...rest} render={(props) => <Redirect to="/login" />} />;
};

export default AdminRoute;
