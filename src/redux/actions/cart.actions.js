import * as types from "../constants/cart.constants";
import api from "../api";
import { message } from "antd";
import { routeActions } from "./route.actions"


const addItem = (itemId, quantity) => async (dispatch) => {
    dispatch({ type: types.ADD_ITEM_REQUEST, payload: null });
    try {
        const res = await api.post("/cart", { itemId, quantity });
        dispatch({
            type: types.ADD_ITEM_SUCCESS,
            payload: res.data.data,
        })
        message.success(`Add/Remove item  successful!`);

    }
    catch (err) {
        message.error("Failure!!!  Can not modify cart")
        dispatch({ type: types.ADD_ITEM_FAILURE, payload: err })
    }
}
const getCart = () => async (dispatch) => {
    dispatch({ type: types.GET_CART_REQUEST, payload: null })
    try {
        const res = await api.get("/cart/content", {})
        dispatch({ type: types.GET_CART_SUCCESS, payload: res.data.data });
        console.log("Cart list", res.data.data);
    } catch (err) {
        dispatch({ type: types.GET_CART_FAILURE, payload: err.message });
        console.log(err.message);
    }
}
const checkOut = () => async (dispatch) => {
    dispatch({ type: types.CHECK_OUT_REQUEST, payload: null })
    try {
        const res = await api.get("/cart/checkout", {})
        dispatch({ type: types.CHECK_OUT_SUCCESS, payload: res.data.data });
    } catch (err) {
        dispatch({ type: types.CHECK_OUT_FAILURE, payload: err.message });
        console.log(err.message);
    }
}


export const cartActions = {
    addItem,
    getCart,
    checkOut,
}