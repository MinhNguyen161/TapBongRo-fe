import React from "react";
import { Card } from "react-bootstrap";
import Moment from "react-moment";

const BlogCard = ({ blog, handleClick, width }) => {
    return (
        <Card border="light" style={{ width: `${width}` }} onClick={() => handleClick(blog._id)}>
            <Card.Img
                variant="top"
                src={
                    blog?.pictureUrl?.length
                        ? blog.pictureUrl[0]
                        : "https://via.placeholder.com/160x100"
                }
            />
            <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <small className="text-muted">
                    <span className="text-muted">
                        <Moment fromNow>{blog.createdAt}</Moment>
                    </span>
                </small>
                <Card.Text>
                    {blog.content.length <= 99
                        ? blog.content
                        : blog.content.slice(0, 99) + "..."}
                </Card.Text>
            </Card.Body>

        </Card>
    );
};

export default BlogCard;