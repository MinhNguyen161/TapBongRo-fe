import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ ...rest }) => {
    const isAdmin = useSelector((state) => state.auth.user.userType); //NOTE khong hieu cho nay
    if (isAdmin == "admin") return <Route {...rest} />;
    delete rest.component;
    return <Route {...rest} render={(props) => <Redirect to="/login" />} />;
};

export default AdminRoute;
