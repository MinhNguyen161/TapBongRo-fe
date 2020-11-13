import * as types from "../constants/product.constants";
import api from "../api";
import { message } from "antd";
import { routeActions } from "./route.actions"


const createNewProduct = (name, price, clothing_type, quantity, color, available_size, description, measures, redirectTo = "__GO_BACK__") => async (dispatch) => {

    dispatch({ type: types.CREATE_PRODUCT_REQUEST, payload: null });
    try {
        const product_info = {
            color,
            available_size,
            description,
            measures,
        }
        const res = await api.post("/products", { name, price, clothing_type, quantity, product_info });
        dispatch({
            type: types.CREATE_PRODUCT_SUCCESS,
            payload: res.data.data,
        });
        dispatch(routeActions.redirect(redirectTo));
        message.success(`New Product has been created!`);
    } catch (error) {
        message.error(`Fail to create a Product`);

        console.log(error);
        dispatch({ type: types.CREATE_PRODUCT_FAILURE, payload: error });
    }
};

const updateProduct = (productId, name, price, clothing_type, quantity, color, available_size, description, measures, redirectTo = "__GO_BACK__") => async (dispatch) => {
    dispatch({ type: types.UPDATE_PRODUCT_REQUEST, payload: null });
    try {
        const product_info = {
            color,
            available_size,
            description,
            measures,
        }
        const res = await api.put(`/products/${productId}`, { name, price, clothing_type, quantity, product_info, });
        dispatch({
            type: types.UPDATE_PRODUCT_SUCCESS,
            payload: res.data.data,
        });
        dispatch(routeActions.redirect(redirectTo));
        message.success(`Product updated`);
    } catch (error) {
        message.error(`Fail to update a Product`);

        console.log(error);
        dispatch({ type: types.UPDATE_PRODUCT_FAILURE, payload: error });
    }
};

const deleteProduct = (productId, redirectTo = "__GO_BACK__") => async (dispatch) => {
    dispatch({ type: types.DELETE_PRODUCT_REQUEST, payload: null });
    try {
        const res = await api.delete(`/products/${productId}`);
        dispatch({
            type: types.DELETE_PRODUCT_SUCCESS,
            payload: res.data,
        });
        dispatch(routeActions.redirect(redirectTo));
        message.success("The Product has been deleted!");
    } catch (error) {
        console.log(error);
        message.error(`Fail to delete a Product`);
        dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: error });
    }
};
const getDetail = (id) => async (dispatch) => {
    dispatch({ type: types.GET_DETAIL_REQUEST, payload: null });
    try {
        const res = await api.get(`/products/${id}`);
        dispatch({
            type: types.GET_DETAIL_SUCCESS,
            payload: res.data.data,
        });
        console.log("Product details", res.data.data);
    } catch (err) {
        dispatch({
            type: types.GET_DETAIL_FAILURE,
            payload: err.message,
        });
        console.log(err.message);
    }
};
const getProducts = (activePage, limit = 10) => async (dispatch) => {
    dispatch({ type: types.GET_PRODUCT_REQUEST, payload: null });
    try {
        const res = await api.get(`/products/all?page=${activePage}&limit=${limit}`);
        dispatch({ type: types.GET_PRODUCT_SUCCESS, payload: res.data.data });
        console.log("list exp", res.data.data);
    } catch (err) {
        dispatch({ type: types.GET_PRODUCT_FAILURE, payload: err.message });
        console.log(err.message);
    }
};

const addRemoveFromFav = (id) => async (dispatch) => {
    dispatch({ type: types.ADD_FAV_REQUEST, payload: null });
    try {
        const res = await api.post(`/favs/${id}`, {});
        dispatch({
            type: types.CREATE_PRODUCT_SUCCESS,
            payload: res.data.data,
        });
        message.success(`Add/Remove Product success!`);
    } catch (err) {
        dispatch({ type: types.ADD_FAV_FAILURE, payload: err.message })
        console.log(err.message)
    }
}
const getFavs = () => async (dispatch) => {
    dispatch({ type: types.GET_FAV_REQUEST, payload: null });
    try {
        const res = await api.get("/favs/content");
        dispatch({
            type: types.GET_FAV_SUCCESS,
            payload: res.data.data,
        })
    }
    catch (err) {
        dispatch({ type: types.GET_FAV_FAILURE, payload: err.message })
    }
}
export const productActions = {
    createNewProduct,
    updateProduct,
    deleteProduct,
    getDetail,
    getProducts,
    addRemoveFromFav,
    getFavs,
};


