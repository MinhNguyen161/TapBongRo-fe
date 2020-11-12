import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, CardColumns } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Moment from "react-moment";
import { blogActions } from "../../redux/actions/blog.actions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBarJoinUs from "../NavBars/NavBarJoinUs";
import NavBarO from "../NavBars/NavBarRo";
import ReviewList from "../ReviewList";
import LoadingPage from "../LoadingPage";
import ReviewForm from "../ReviewForm";
import SearchPage from "../SearchBar";
import BlogCard from "../Cards/BlogCard";



const BlogDetailPage = () => {
    const [pageNum, setPageNum] = useState(1);
    const params = useParams();
    const isAuthorized = useSelector((state) => state.auth.isAuthorized)
    const dispatch = useDispatch();
    const blog = useSelector((state) => state.blog.selectedBlog);
    const blogs = useSelector((state) => state.blog.blogs);
    const loading = useSelector((state) => state.blog.loading);
    const currentUser = useSelector((state) => state.auth.user);
    const history = useHistory();
    const [reviewText, setReviewText] = useState("");
    const handleInputChange = (e) => {
        setReviewText(e.target.value);
    };
    const onClickBlogs = (id) => {
        history.push(`/blogs/${id}`);
    }
    const handleSubmitReview = (e) => {
        e.preventDefault();
        dispatch(blogActions.createReview(params.id, reviewText));
        setReviewText("");
    }

    useEffect(() => {
        if (params?.id) {
            dispatch(blogActions.getDetail(params.id));
        }
    }, [dispatch, params]);

    const handleGoBackClick = (e) => {
        history.goBack();
    };


    return (
        <>
            <NavBarJoinUs />
            <NavBarO />

            <div className="d-flex justify-content-between">
                <Button onClick={handleGoBackClick}>
                    Back
                </Button>
                {blog?._id && currentUser?._id === blog?.author ? (
                    <Link to={`/blogs/edit/${blog._id}`}>
                        <Button variant="primary">
                            Edit
                        </Button>
                    </Link>
                ) : (
                        <> You can not edit</>
                    )}
            </div>
            {loading ? (
                <LoadingPage />
            ) : (
                    <>
                        {blog && (
                            <Container>
                                <Row>
                                    <Col lg={9}>
                                        <div className="mb-5">
                                            <h4>{blog.title}</h4>
                                            <span className="text-muted">
                                                <Moment fromNow>{blog.createdAt}</Moment>
                                            </span>

                                            <hr />
                                            <span>{blog.content}</span>
                                            <hr />
                                            <ReviewList reviews={blog.reviews} />
                                        </div>
                                        {isAuthorized && (
                                            <ReviewForm
                                                reviewText={reviewText}
                                                handleInputChange={handleInputChange}
                                                handleSubmitReview={handleSubmitReview}
                                                loading={loading}
                                            />
                                        )}
                                    </Col>

                                    <Col lg={3}>

                                        <SearchPage />
                                        <h2> Recent Posts: </h2>
                                        <Row>
                                            <Container className="recent_post">
                                                {blogs.map((blog) => (
                                                    <BlogCard
                                                        blog={blog}
                                                        key={blog._id}
                                                        handleClick={onClickBlogs}
                                                        width="15rem"
                                                    />
                                                ))}
                                            </Container>

                                        </Row>
                                    </Col>
                                </Row>

                            </Container>
                        )}

                    </>
                )}
        </>
    );
};

export default BlogDetailPage;