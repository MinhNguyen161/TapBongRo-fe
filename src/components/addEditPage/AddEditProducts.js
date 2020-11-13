import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    ButtonGroup,
} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { productActions, routeActions } from "../../redux/actions";
import NavBarO from "../NavBars/NavBarRo";
import NavBarJoinUs from "../NavBars/NavBarJoinUs";

const AddEditProductPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        pictureUrl: ["http://placeimg.com/400/300", "http://placeimg.com/400/300"],
        clothing_type: "",
        quantity: null,
        color: "",
        available_size: [],
        description: "",
        measures: ""

    });
    const loading = useSelector((state) => state.product.loading);
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const selectedProduct = useSelector((state) => state.product.selectedProduct);
    const redirectTo = useSelector((state) => state.route.redirectTo);
    const addOrEdit = params.id ? "Edit" : "Add";
    const productId = params.id;

    useEffect(() => {
        if (productId) {
            if (!selectedProduct) {
                dispatch(productActions.getDetail(productId));
            }
            setFormData((formData) => ({
                ...formData,
                name: selectedProduct.name,
                price: selectedProduct.price,
                pictureUrl: selectedProduct.pictureUrl,
                clothing_type: selectedProduct.clothing_type,
                quantity: selectedProduct.quantity,
                product_info: selectedProduct.product_info,
            }));
        }
    }, [productId, selectedProduct, dispatch]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        console.log(formData)
        e.preventDefault();
        const { name, price, clothing_type, quantity, color, available_size, description, measures, pictureUrl } = formData;
        if (addOrEdit === "Add") {
            dispatch(productActions.createNewProduct(name, price, clothing_type, quantity, color, available_size, description, measures, pictureUrl));
        } else if (addOrEdit === "Edit") {
            dispatch(
                productActions.updateProduct(selectedProduct._id, name, price, clothing_type, quantity, color, available_size, description, measures, pictureUrl)
            );
        }
    };

    const handleCancel = () => {
        history.goBack();
    };

    const handleDelete = () => {
        dispatch(productActions.deleteProduct(selectedProduct._id, '/'));


    };

    useEffect(() => {
        if (redirectTo) {
            if (redirectTo === "__GO_BACK__") {
                history.goBack();
                dispatch(routeActions.removeRedirectTo());
            } else {
                history.push(redirectTo);
                dispatch(routeActions.removeRedirectTo());
            }
        }
    }, [redirectTo, dispatch, history]);
    return (
        <Container fluid className="no_padding">
            <NavBarO />
            <NavBarJoinUs />
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>
                        <div className="text-center mb-3">
                            <h1 className="text-primary">{addOrEdit} Product</h1>
                            <p className="lead">
                                <i className="fas fa-user" />
                            </p>
                        </div>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Product Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Product something"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="number"
                                rows="10"
                                placeholder="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="pictureUrl"
                                name="pictureUrl"
                                value={formData.pictureUrl}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                required placeholder="clothing_type"
                                name="clothing_type"
                                value={formData.clothing_type}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                required
                                placeholder="quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                required
                                placeholder="color"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                required
                                placeholder="measures"
                                name="measures"
                                value={formData.measures}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                required
                                placeholder="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Control
                                as="select"
                                type="text"
                                required
                                placeholder="available_size"
                                name="available_size"
                                value={formData.available_size}
                                onChange={handleChange}
                            >
                                <option value="xs">xs</option>
                                <option value="s">s</option>
                                <option value="m">m</option>
                                <option value="l">l</option>
                                <option value="xl">xl</option>
                            </Form.Control>
                        </Form.Group>

                        <ButtonGroup className="d-flex mb-3">
                            {loading ? (
                                <Button
                                    className="mr-3"
                                    variant="primary"
                                    type="button"
                                    disabled
                                >
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                  Submitting...
                                </Button>
                            ) : (
                                    <Button className="mr-3" type="submit" variant="primary">
                                        Submit
                                    </Button>
                                )}
                            <Button variant="light" onClick={handleCancel} disabled={loading}>
                                Cancel
              </Button>
                        </ButtonGroup>
                        {addOrEdit === "Edit" && (
                            <ButtonGroup className="d-flex">
                                <Button
                                    variant="danger"
                                    onClick={handleDelete}
                                    disabled={loading}
                                >
                                    Delete Blog
                </Button>
                            </ButtonGroup>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddEditProductPage;