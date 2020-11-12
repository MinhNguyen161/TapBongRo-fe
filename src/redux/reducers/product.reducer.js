import * as types from "../constants/product.constants";
const initialState = {
    products: [],
    totalPageNum: 1,
    selectedProduct: null,
    loading: false,
};

const productReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        // REQUEST CASES
        //=======================================================
        //...
        //...
        case types.CREATE_PRODUCT_REQUEST:
        case types.UPDATE_PRODUCT_REQUEST:
        case types.DELETE_PRODUCT_REQUEST:
        case types.GET_PRODUCT_REQUEST:
        case types.GET_DETAIL_REQUEST:
            return { ...state, loading: true };
        // SUCCESS CASES
        //=======================================================
        case types.CREATE_PRODUCT_SUCCESS:
            return { ...state, loading: false };
        case types.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                selectedProduct: payload,
                loading: false,
            };
        case types.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedProduct: {},
            };
        case types.GET_DETAIL_SUCCESS:
            return {
                ...state,
                selectedProduct: payload,
                loading: false,
            }
        case types.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: payload.products,
                totalPageNum: payload.totalPages
            }

        // FAIL CASES
        //=======================================================

        case types.CREATE_PRODUCT_FAILURE:
        case types.UPDATE_PRODUCT_FAILURE:
        case types.DELETE_PRODUCT_FAILURE:
        case types.GET_DETAIL_FAILURE:
        case types.GET_PRODUCT_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default productReducer;