import React from "react";
import { Card, Button } from "react-bootstrap";
import Moment from "react-moment";

const BlogCard = ({ blog, handleClick, width, downVote, upVote }) => {
    return (
        <Card border="light" style={{ width: `${width}` }} >
            <Card.Img
                variant="top"
                src={
                    blog?.pictureUrl?.length
                        ? blog.pictureUrl[0]
                        : "https://via.placeholder.com/188x106"
                }
                onClick={() => handleClick(blog._id)}
            />
            <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>
                    {blog.content.length <= 99
                        ? blog.content
                        : blog.content.slice(0, 99) + "..."}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">
                    <span className="text-muted">

                        <Moment fromNow>{blog.createdAt}</Moment>
                    </span>
                </small>
            </Card.Footer>
            <div className="voting">
                <Button
                    variant="warning"
                    size="sm"
                    onClick={() => upVote(blog._id)}
                >UPVOTE</Button>
                {blog?.likeCount}
                <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => downVote(blog._id)}
                >DOWNVOTE</Button>
            </div>
        </Card>
    );
};

export default BlogCard;