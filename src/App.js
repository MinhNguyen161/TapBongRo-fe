import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/actions/auth.actions"


function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      dispatch(authActions.getCurrentUser(accessToken));
    }
    else {
      dispatch(authActions.logout());
    }
  }, [dispatch]);
  return (
    <>
      {isAuthorized === null ? (
        <div>loading</div>
      ) : (
          <Router>
            <Routes />
          </Router>
        )}
    </>
  );
}

export default App;
