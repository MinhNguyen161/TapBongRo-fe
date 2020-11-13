import BlogCard from "../components/Cards/BlogCard";
import PaginationBar from "../components/PaginationBar";
import React, { useEffect, useState } from "react";
import { CardColumns, Container, Jumbotron, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { blogActions } from "../redux/actions";
import NavBarRo from "../components/NavBars/NavBarRo"
import NavBarJoinUs from "../components/NavBars/NavBarJoinUs"
import LoadingPage from "../components/LoadingPage";

const BlogPage = () => {
    const params = useParams();
    const user = useSelector(state => state.auth.user)
    const [isLoading, setLoading] = useState(false)
    const [pageNum, setPageNum] = useState(1);
    const loading = useSelector((state) => state.blog.loading);
    const blogs = useSelector((state) => state.blog.blogs);
    const totalPageNum = useSelector((state) => state.blog.totalPageNum);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(blogActions.getBlogs(pageNum, params.id));
    }, [dispatch, pageNum])
    const onClickBlogs = (id) => {
        history.push(`/blogs/${id}`);
    }
    const upVote = (id) => {
        dispatch(blogActions.upVote(id))
        dispatch(blogActions.getBlogs(pageNum));

    }

    const downVote = (id) => {
        dispatch(blogActions.downVote(id))
        dispatch(blogActions.getBlogs(pageNum));

    }
    const [ani, setAni] = useState(true)
    setTimeout(() => setAni(false), 1000)
    if (ani) return (<LoadingPage />)
    return (
        <Container fluid className="no_padding">
            <NavBarRo />
            <NavBarJoinUs />
            <Jumbotron className="text-center jumbo_blog_blog">

                <h1 className="big_text_jumbo">{params.id}</h1>
            </Jumbotron>
            <Container>
                <div className="no_decor_italics">
                    <Link to={`/`} >Home </Link>
                    {`>>>`}
                    <Link to={`/category`}> Category</Link>
                    {`>>`}
                    <Link to={`/category/${params.id}`}> {params.id}</Link>
                </div>
            </Container>
            <Container className="blog_container">

                <PaginationBar
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    totalPageNum={totalPageNum}
                    loading={loading}
                />
                {loading ? (<div> Please wait... </div>) :
                    (<CardColumns>
                        {blogs.map((blog) => (
                            <>
                                <BlogCard
                                    blog={blog}
                                    key={blog._id}
                                    handleClick={onClickBlogs}
                                    upVote={upVote}
                                    downVote={downVote}
                                />

                            </>
                        ))}
                    </CardColumns>)}

            </Container>
        </Container>
    )
}

export default BlogPage
