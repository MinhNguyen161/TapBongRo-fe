import * as types from "../constants/auth.constants";
import api from "../api";
import { toast } from "react-toastify";
import { message } from "antd";
import { routeActions } from "./route.actions"

const login = (email, password) => async (dispatch) => {
    dispatch({ type: types.LOGIN_REQUEST, payload: null })
    try {
        const res = await api.post("/auth/login", { email, password });
        dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data })
        dispatch(routeActions.redirect("/"));
        message.success(`Welcome back ${res.data.data.user.name}`);
        // toast.success(`Login success!`);

    }
    catch (err) {
        dispatch({ type: types.LOGIN_FAILURE, payload: err.message });
        message.error(`The password or email that you've entered is incorrect`);

    }
}
const getCurrentUser = (accessToken) => async (dispatch) => {
    dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
    if (accessToken) {
        const bearerToken = "Bearer " + accessToken;
        api.defaults.headers.common["authorization"] = bearerToken;
    }
    try {
        const res = await api.get("/users/me");
        dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
        message.success(`Welcome back ${res.data.data.name}`);

    } catch (error) {
        dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
    }
};
const logout = () => (dispatch) => {
    console.log("logging out")
    delete api.defaults.headers.common["authorization"];
    dispatch({ type: types.LOGOUT, payload: null });
};

export const authActions = {
    login,
    getCurrentUser,
    logout,
};