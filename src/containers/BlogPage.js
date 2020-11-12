import BlogCard from "../components/Cards/BlogCard";
import PaginationBar from "../components/PaginationBar";
import React, { useEffect, useState } from "react";
import { CardColumns, Container, Jumbotron } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { blogActions } from "../redux/actions";
import NavBarRo from "../components/NavBars/NavBarRo"
import NavBarJoinUs from "../components/NavBars/NavBarJoinUs"
import LoadingPage from "../components/LoadingPage";

const BlogPage = () => {
    const user = useSelector(state => state.auth.user)
    const [pageNum, setPageNum] = useState(1);
    const loading = useSelector((state) => state.blog.loading);
    const blogs = useSelector((state) => state.blog.blogs);
    const totalPageNum = useSelector((state) => state.blog.totalPageNum);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(blogActions.getBlogs(pageNum));
    }, [dispatch, pageNum])
    const onClickBlogs = (id) => {
        history.push(`/blogs/${id}`);
    }
    const [ani, setAni] = useState(true)
    setTimeout(() => setAni(false), 1000)
    if (ani) return (<LoadingPage />)
    return (
        <Container fluid className="no_padding">
            <NavBarRo />
            <NavBarJoinUs />
            <Jumbotron className="text-center jumbo_blog_blog">
                <div className="no_decor_italics">
                    <Link to={`/`} >Home </Link>
                    {`>>>`}
                    <Link to={`/blogs`}> Hoopstudy</Link>
                </div>
                <h1 className="big_text_jumbo">Hoopstudy</h1>
            </Jumbotron>
            <Container className="blog_container">
                <PaginationBar
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    totalPageNum={totalPageNum}
                    loading={loading}
                />
                <CardColumns>
                    {blogs.map((blog) => (
                        <BlogCard
                            blog={blog}
                            key={blog._id}
                            handleClick={onClickBlogs}
                        />
                    ))}
                </CardColumns>
            </Container>
        </Container>
    )
}

export default BlogPage
