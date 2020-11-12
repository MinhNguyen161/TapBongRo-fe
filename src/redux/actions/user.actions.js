import * as types from "../constants/user.constants";
import api from "../api";
import { routeActions } from "../actions/route.actions"; //REVIEW 
import { message } from "antd";

// REGISTER
const register = (
    name,
    email,
    password,
    age,
    height,
    weight,
    reasons,

) => async (dispatch) => {
    dispatch({ type: types.REGISTER_REQUEST, payload: null })
    try {
        const res = await api.post("/users", {
            name,
            email,
            password,
            info: {
                age,
                height,
                weight,
            },
            reasons,
        });
        dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data })
        //REVIEW dispatch(routeActions.redirect("/login"));
        dispatch(routeActions.redirect("/login"));
        message.success(`Thank you for your registration, ${name}!`);
    }
    catch (err) {
        dispatch({ type: types.REGISTER_SUCCESS, payload: err.message });
        message.error(`Fail to register, please check your information again!`);

    }
}
export const userActions = {
    register,
};



