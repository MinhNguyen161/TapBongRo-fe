import * as types from "../constants/auth.constants";

let initialState = {
    isAuthorized: false,
    user: {},
    accessToken: "",
    loading: false, // Should be set to true
    message: "",
};

// useEffect  => action (API calls) => reducer (here) 

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.LOGIN_REQUEST && types.GET_CURRENT_USER_REQUEST:
            return { ...state, loading: true };
        case types.LOGIN_SUCCESS:
            localStorage.setItem("accessToken", payload.accessToken);
            return {
                ...state,
                loading: false,
                user: payload.user,
                accessToken: payload.accessToken,
                isAuthorized: true,
            };
        case types.GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                user: payload,
                isAuthorized: true,
                loading: false,
            };
        case types.GET_CURRENT_USER_FAILURE:
            return { ...state, loading: false, isAuthorized: false };
        case types.LOGIN_FAILURE:
            return { ...state, loading: false };
        case types.LOGOUT:
            localStorage.setItem("accessToken", null);
            return {
                ...state,
                user: null,
                accessToken: null,
                isAuthorized: false,
                loading: false,
            };
        default:
            return { ...state };
    }
};

export default authReducer;
