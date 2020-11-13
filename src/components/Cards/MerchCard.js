import React from "react";
import { Card, Badge } from "react-bootstrap";
import Moment from "react-moment";

const MerchCard = ({ merch, handleClick }) => {
    return (
        <Card border="light" onClick={() => handleClick(merch._id)}>
            <Card.Img
                variant="top"
                src={
                    merch?.pictureUrl?.length
                        ? merch.pictureUrl[0]
                        : "https://static.nike.com/a/images/f_auto/q_auto:eco/t_PDP_864_v1/b541fd41-7304-46bc-8b52-0fdd3a2ce739/air-vapormax-2020-flyknit-shoe-5xSzzZ.jpg"
                }
                className="product-img"
            />
            <Card.Body>
                <Card.Title>{merch.name}</Card.Title>
                <Card.Text>
                    $ {merch.price}
                </Card.Text>
                <Card.Text className="sizes_contain">
                    {merch.product_info.available_size.map((item) => {
                        return (
                            <Badge className="sizes" variant="info"> {item}</Badge>
                        )
                    })}
                </Card.Text>
            </Card.Body>

            <Card.Footer>
                <small className="text-muted">
                    <span className="text-muted">
                        @{merch?.seller?.name} wrote{" "}
                        <Moment fromNow>{merch.createdAt}</Moment>
                    </span>
                </small>
            </Card.Footer>
        </Card>
    );
};

export default MerchCard;