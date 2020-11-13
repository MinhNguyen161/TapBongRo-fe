
import React, { useEffect, useState } from 'react'
import NavBarRo from "../components/NavBars/NavBarRo"
import NavBarJoinUs from "../components/NavBars/NavBarJoinUs"
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Container, Jumbotron, Row, Col, Table, Button } from 'react-bootstrap'
import { cartActions } from "../redux/actions/cart.actions"
import { productActions } from "../redux/actions/product.actions"

import LoadingPage from '../components/LoadingPage';


const CheckOutPage = () => {
    const dispatch = useDispatch();

    const carts = useSelector((state) => state.cart.cartContent);
    const loading = useSelector((state) => state.cart.loading);
    const currentUser = useSelector((state) => state.auth.user);
    const isAuthorized = useSelector((state) => state.auth.isAuthorized)
    const history = useHistory();
    useEffect(() => {
        dispatch(cartActions.getCart());
    }, [dispatch, currentUser?._id]);
    let total = 0
    const getTotal = () => {
        total = carts.reduce((sum, a) => sum + a.quantity * a.itemId.price, 0)
    }
    getTotal()
    const addToFav = (product) => {
        dispatch(productActions.addRemoveFromFav(product.itemId?._id))

    }
    const removeItem = (product, index) => {
        dispatch(cartActions.addItem(product.itemId?._id, 0 - product.quantity))
    }
    const Product = ({ product, index }) => {
        return (
            <tr>
                <th scope="row" className="border-0">
                    <div className="p-2">
                        <img src="https://res.cloudinary.com/mhmd/image/upload/v1556670479/product-1_zrifhn.jpg" alt="" width="70" className="img-fluid rounded shadow-sm" />
                        <div className="ml-3 d-inline-block align-middle">
                            <h6 className="mb-0"> <span onClick={() => history.push(`/merch/${product.itemId._id}`)} className="text-dark d-inline-block align-middle">{product.itemId.name}</span></h6>
                            <span className="text-muted font-weight-normal font-italic d-block">Category: {product.itemId.clothing_type}</span>
                        </div>
                    </div>
                </th>
                <td className="border-0 align-middle"><strong>${product.itemId.price}</strong></td>
                <td className="border-0 align-middle"><strong>{product.quantity}</strong></td>
                <td className="border-0 align-middle"><Button className="remove_button" onClick={() => addToFav(product)}><img src="./images/heart.png" alt="logo" className="logo_user" /></Button></td>
                <td className="border-0 align-middle"><Button className="remove_button" onClick={() => removeItem(product, index)}><img src="./images/bin.png" alt="logo" className="logo_user" /></Button></td>
            </tr>
        )
    }
    const [ani, setAni] = useState(true)
    setTimeout(() => setAni(false), 1000)
    if (loading || ani) return (<LoadingPage />)
    return (
        <Container fluid className="no_padding">
            <NavBarRo />
            <NavBarJoinUs />

            <Jumbotron className="text-center jumbo_blog_cart">
                <h1 className="big_text_jumbo">My Cart</h1>
            </Jumbotron>
            <Row>
                <Col lg={7}>
                    <Container>
                        <div className="no_decor_italics">
                            <Link to={`/`} >Home </Link>
                            {`>>>`}
                            <Link to={`/cart`}> Cart</Link>
                        </div>
                        <h1 > Bag</h1>
                        <div className="table_content"> {isAuthorized ? (<Table hover responsive>
                            <thead>
                                <tr>
                                    <th scope="col" className="border-0 bg-light">
                                        <div className="p-2 px-3 text-uppercase">Product</div>
                                    </th>
                                    <th scope="col" className="border-0 bg-light">
                                        <div className="py-2 text-uppercase">Price</div>
                                    </th>
                                    <th scope="col" className="border-0 bg-light">
                                        <div className="py-2 text-uppercase">Quantity</div>
                                    </th>
                                    <th scope="col" className="border-0 bg-light">
                                        <div className="p-2 px-3 text-uppercase">Favorites</div>
                                    </th>
                                    <th scope="col" className="border-0 bg-light">
                                        <div className="py-2 text-uppercase">Remove</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {carts.map((product, index) => {

                                    return (
                                        <Product product={product} index={index} />
                                    )
                                })}
                            </tbody>
                        </Table>) : (
                                <div className="text-center"> To see your cart, please <Link to="/login"> Login </Link>  </div>

                            )} </div>



                    </Container>
                </Col>
                <Col lg={5}>


                    <div className="row py-5 p-4 bg-white rounded shadow-sm">
                        <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Coupon code</div>
                        <div className="p-4">
                            <p className="font-italic mb-4">If you have a coupon code, please enter it in the box below</p>
                            <div className="input-group mb-4 border rounded-pill p-2">
                                <input type="text" placeholder="Apply coupon" aria-describedby="button-addon3" className="form-control border-0" />
                                <div className="input-group-append border-0">
                                    <button id="button-addon3" type="button" className="btn btn-dark px-4 rounded-pill"><i className="fa fa-gift mr-2"></i>Apply coupon</button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Instructions for seller</div>
                        <div className="p-4">
                            <p className="font-italic mb-4">If you have some information for the seller you can leave them in the box below</p>
                            <textarea name="" cols="30" rows="2" className="form-control"></textarea>
                        </div>
                        <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                        <div className="p-4">
                            <p className="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
                            <ul className="list-unstyled mb-4">
                                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>${parseInt(total * 100) / 100}</strong></li>
                                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>$10.00</strong></li>
                                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Tax</strong><strong>$0.00</strong></li>
                                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                                    <h4 className="font-weight-bold">${parseInt((total + 10) * 100) / 100}</h4>
                                </li>
                            </ul><a href="#" className="btn btn-dark rounded-pill py-2 btn-block">Procceed to checkout</a>
                        </div>
                    </div>


                </Col>


            </Row>

        </Container >
    )
}

export default CheckOutPage

