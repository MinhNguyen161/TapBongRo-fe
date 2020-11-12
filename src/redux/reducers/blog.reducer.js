import * as types from "../constants/blog.constants"
const initialState = {
    blogs: [],
    totalPageNum: 1,
    selectedBlog: null,
    loading: false,
};

const blogReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        // REQUEST CASES
        //=======================================================
        //...
        case types.CREATE_REVIEW_REQUEST:
        case types.CREATE_BLOG_REQUEST:
        case types.UPDATE_BLOG_REQUEST:
        case types.DELETE_BLOG_REQUEST:
        case types.GET_BLOG_REQUEST:
        case types.GET_DETAIL_REQUEST:
            return { ...state, loading: true };

        // SUCCESS CASES
        //=======================================================

        case types.CREATE_BLOG_SUCCESS:
            return { ...state, loading: false };
        case types.UPDATE_BLOG_SUCCESS:
            return {
                ...state,
                selectedBlog: payload,
                loading: false,
            };
        case types.GET_DETAIL_SUCCESS:
            return {
                ...state,
                selectedBlog: payload,
                loading: false,
            }
        case types.DELETE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedBlog: {},
            };
        case types.GET_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: payload.blogs,
                totalPageNum: payload.totalPages
            }
        case types.CREATE_REVIEW_SUCCESS:
            return {
                ...state,
                selectedBlog: {
                    ...state.selectedBlog,
                    reviews: [...state, state.selectedBlog.reviews, payload]
                }
            }

        // FAIL CASES
        //=======================================================
        case types.CREATE_REVIEW_FAILURE:
        case types.CREATE_BLOG_FAILURE:
        case types.UPDATE_BLOG_FAILURE:
        case types.DELETE_BLOG_FAILURE:
        case types.GET_DETAIL_FAILURE:
        case types.GET_BLOG_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default blogReducer;