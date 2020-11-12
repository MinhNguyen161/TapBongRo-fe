import * as types from "../constants/blog.constants";
import api from "../api";
import { message } from "antd";
import { routeActions } from "./route.actions"


const createNewBlog = (title, content, images, redirectTo = "__GO_BACK__") => async (dispatch) => {
    dispatch({ type: types.CREATE_BLOG_REQUEST, payload: null });
    try {
        const res = await api.post("/blogs", { title, content, images });
        dispatch({
            type: types.CREATE_BLOG_SUCCESS,
            payload: res.data.data,
        });
        dispatch(routeActions.redirect(redirectTo));
        message.success(`New blog has been created!`);
    } catch (error) {
        message.error(`Fail to create a blog`);

        console.log(error);
        dispatch({ type: types.CREATE_BLOG_FAILURE, payload: error });
    }
};

const updateBlog = (blogId, title, content, images, redirectTo = "__GO_BACK__") => async (dispatch) => {
    dispatch({ type: types.UPDATE_BLOG_REQUEST, payload: null });
    try {
        const res = await api.put(`/blogs/${blogId}`, { title, content, images });
        dispatch({
            type: types.UPDATE_BLOG_SUCCESS,
            payload: res.data.data,
        });
        dispatch(routeActions.redirect(redirectTo));
        message.success("The blog has been updated!");
    } catch (error) {
        console.log(error.message);
        dispatch({ type: types.UPDATE_BLOG_FAILURE, payload: error });
    }
};

const deleteBlog = (blogId, redirectTo = "__GO_BACK__") => async (dispatch) => {
    dispatch({ type: types.DELETE_BLOG_REQUEST, payload: null });
    try {
        const res = await api.delete(`/blogs/${blogId}`);
        dispatch({
            type: types.DELETE_BLOG_SUCCESS,
            payload: res.data,
        });
        dispatch(routeActions.redirect(redirectTo));
        message.success("The blog has been deleted!");
    } catch (error) {
        console.log(error);
        dispatch({ type: types.DELETE_BLOG_FAILURE, payload: error });
    }
};
const getDetail = (id) => async (dispatch) => {
    dispatch({ type: types.GET_DETAIL_REQUEST, payload: null });
    try {
        const res = await api.get(`/blogs/${id}`);
        dispatch({
            type: types.GET_DETAIL_SUCCESS,
            payload: res.data.data,
        });
        console.log("Get Detail Blog Successful", res.data.data)
    } catch (err) {
        dispatch({
            type: types.GET_DETAIL_FAILURE,
            payload: err.message,
        });
        console.log(err);
    }
};
const getBlogs = (activePage, limit = 5) => async (dispatch) => {
    dispatch({ type: types.GET_BLOG_REQUEST, payload: null });
    try {
        const res = await api.get(`/blogs/all?page=${activePage}&limit=${limit}`);
        dispatch({ type: types.GET_BLOG_SUCCESS, payload: res.data.data });
        console.log("Blogs List", res.data.data);
    } catch (err) {
        dispatch({ type: types.GET_BLOG_FAILURE, payload: err.message });
        console.log(err.message);
    }
};
const createReview = (blogId, reviewText) => async (dispatch) => {
    dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
    try {
        const res = await api.post(`/blogs/reviews/${blogId}`, {
            content: reviewText,
        });
        dispatch({
            type: types.CREATE_REVIEW_SUCCESS,
            payload: res.data.data,
        });
    } catch (err) {
        console.log(err.message)
        dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: err });
    }
};


export const blogActions = {
    createNewBlog,
    updateBlog,
    deleteBlog,
    getDetail,
    getBlogs,
    createReview
};


