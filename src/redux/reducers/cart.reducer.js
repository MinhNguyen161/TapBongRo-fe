import * as types from "../constants/cart.constants";
const initialState = {
    cartContent: [],
    productCount: 0,
    loading: true,
};

const blogReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        // REQUEST CASES
        //=======================================================
        //...
        case types.GET_CART_REQUEST:
        case types.CHECK_OUT_REQUEST:
        case types.ADD_ITEM_REQUEST:
            return { ...state, loading: true };

        // SUCCESS CASES
        //=======================================================
        case types.ADD_ITEM_SUCCESS:
            return {
                ...state,
                cartContent: payload.products,
                loading: false
            };
        case types.CHECK_OUT_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case types.GET_CART_SUCCESS:
            return {
                ...state,
                cartContent: payload.products, // fix later
                productCount: payload.productCount, // add later
                loading: false,
            }
        // FAIL CASES
        //=======================================================


        case types.GET_CART_FAILURE:
        case types.CHECK_OUT_FAILURE:
        case types.ADD_ITEM_FAILURE:

            return { ...state, loading: false };
        default:
            return state;
    }
};

export default blogReducer;