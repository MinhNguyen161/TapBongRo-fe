import * as types from "../constants/user.constants"
const initialState = {
    users: [],
    totalPageNum: 1,
    selectedUser: {},
    loading: false,
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.REGISTER_REQUEST:
            return { ...state, loading: true };
        case types.REGISTER_SUCCESS:
            return { ...state, loading: false };
        case types.REGISTER_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default userReducer;