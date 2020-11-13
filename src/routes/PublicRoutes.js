import React from "react";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "../components/RandomPage/NotFoundPage"
import BlogPage from "../containers/BlogPage"
import HomePage from "../containers/General/HomePage";
import LoginPage from "../containers/General/LoginPage";
import RegisterPage from "../containers/General/RegisterPage";
import AdminRoute from "./PrivateRoutes";
import AboutPage from "../components/RandomPage/AboutPage"
import BlogDetailPage from "../components/DetailsPage/BlogPageDetail"
import FooterPage from "../components/Footer";
import MerchDetailPage from "../components/DetailsPage/MerchDetailPage"
import MerchPage from "../containers/MerchPage"
import CheckOutPage from "../containers/CheckOutPage";
import LoadingPage from "../components/LoadingPage";
import AddEditBlogPage from "../components/addEditPage/AddEditBlogs";
import FavPage from "../containers/FavPage";
import CategoryPage from "../components/RandomPage/CategoryPage";
import AddEditProductPage from "../components/addEditPage/AddEditProducts"


const PublicRoutes = () => {
    return (
        <Container fluid className="page" >
            {/* <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> */}
            <Switch>
                <AdminRoute exact path="/blogs/add" component={AddEditBlogPage} />
                <AdminRoute
                    exact
                    path="/blogs/edit/:id"
                    component={AddEditBlogPage}
                />
                <AdminRoute exact path="/merch/add" component={AddEditProductPage} />
                <AdminRoute
                    exact
                    path="/merch/edit/:id"
                    component={AddEditBlogPage}
                />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/blogs/:id" component={BlogDetailPage} />
                <Route exact path="/blogs" component={BlogPage} />
                <Route exact path="/favorites" component={FavPage} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/merch/:id" component={MerchDetailPage} />
                <Route exact path="/merch" component={MerchPage} />
                <Route exact path="/cart" component={CheckOutPage} />
                <Route exact path="/category" component={CategoryPage} />
                <Route exact path="/category/:id" component={BlogPage} />
                <Route exact path="/loading" component={LoadingPage} />



                <Route exact path="/" component={HomePage} />
                {/* <Route exact path="/blogs/:id" component={BlogDetailPage} />
                    <PrivateRoute exact path="/blog/add" component={AddEditBlogPage} />
                    <PrivateRoute
                        exact
                        path="/blog/edit/:id"
                        component={AddEditBlogPage}
                    /> */}
                <Route component={NotFoundPage} />

            </Switch>
            <FooterPage />

        </Container>
    );
};

export default PublicRoutes;