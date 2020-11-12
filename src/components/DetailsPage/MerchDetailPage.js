import React, { useEffect } from "react";
import { Button, Container, Row, Col, Image, Card, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { Form, Input, Divider, InputNumber, Select } from "antd";
import { ClipLoader } from "react-spinners";
import Moment from "react-moment";
import { productActions } from "../../redux/actions/product.actions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBarJoinUs from "../NavBars/NavBarJoinUs";
import NavBarO from "../NavBars/NavBarRo";
import { cartActions } from "../../redux/actions/cart.actions"
const MerchDetailPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.selectedProduct);
    const loading = useSelector((state) => state.product.loading);
    const currentUser = useSelector((state) => state.auth.user);
    const history = useHistory();
    useEffect(() => {
        if (params?.id) {
            dispatch(productActions.getDetail(params.id));
        }
    }, [dispatch, params]);
    const addToFavorites = (e) => {
        console.log("meo", "adding favorites")
    }

    const handleGoBackClick = (e) => {
        history.goBack();
    };
    const [form] = Form.useForm();
    const onFinish = (values) => {
        const { quantity, size } = values; //add sizes
        dispatch(
            cartActions.addItem(product._id, quantity)
        );
    };
    if (product === null) return (<div> Loading</div>)
    return (
        <>

            <NavBarO />
            <NavBarJoinUs />

            <Button onClick={handleGoBackClick}>  Back </Button>
            <Container>
                <Row>
                    <Col lg={7}>
                        <Image src={product.pictureUrl} fluid />                    </Col>
                    <Col lg={5} classname="product_content">
                        <p> Home {`>>`} Merch{`>>`} {product.name} </p>
                        <h1> {product.name}</h1>
                        <h2> $ {product.price}</h2>
                        <Form form={form} name="control-hooks" onFinish={onFinish}>
                            {/* Cant make this required */}
                            <Form.Item
                                label="Quantity"
                                rules={[{ required: true, },]}
                            >
                                <Form.Item label="quantity" name="quantity" noStyle>
                                    <InputNumber min={1} max={100} />
                                </Form.Item>
                            </Form.Item>
                            <span></span>
                            <Form.Item label="Size"
                                rules={[{ required: true, },]}
                            >
                                <Form.Item label="size" name="size" noStyle>
                                    <InputNumber min={1} max={1000} />
                                </Form.Item>
                                <span>&nbsp; </span>

                            </Form.Item>
                            <span></span>
                            <Row className="">
                                <Button type="primary" htmlType="submit">
                                    Add item to Cart
                                    </Button>
                                {/* ANCHOR sua onClick */}
                                <Button htmlType="button" onClick={() => addToFavorites}>
                                    Add item to favorites
                                    </Button>
                            </Row>
                            <Divider dashed />
                        </Form>
                        <p> {product.product_info.description}</p>
                        <p> Measures: {product.product_info.measures}</p>

                        <Accordion defaultActiveKey="0">
                            <Card border="light">
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    <h2> Size & Fit</h2>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <ol>
                                            <li> For easier entry, we recommend unlacing the top 4 eyelets and slightly loosening the laces farther down </li>
                                            <li>  <a href="https://www.nike.com/size-fit/unisex-footwear-mens-based"> Size Guide</a></li>
                                        </ol>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card border="light">
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                    <h2> Shipping & Return Policy</h2>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>Free standard shipping and free 60-day returns for Nike Members. Learn more.</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default MerchDetailPage
