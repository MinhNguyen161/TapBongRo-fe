import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import blogReducer from "./blog.reducer";
import productReducer from "./product.reducer";
import routeReducer from "./route.reducer";
import userReducer from "./user.reducer";
import cartReducer from "./cart.reducer"


export default combineReducers({
    auth: authReducer,
    route: routeReducer,
    user: userReducer,
    product: productReducer,
    blog: blogReducer,
    cart: cartReducer,
});