import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Navbar, Button, Dropdown, DropdownButton, Badge } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { authActions, routeActions } from "../../redux/actions"


const NavBarJoinUs = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);
    const carts = useSelector((state) => state.cart.cartContent);

    const user = useSelector((state) => state.auth.user);
    const logOut = () => {
        dispatch(authActions.logout())
        history.push("/")
    }
    let total = 0;
    if (isAuthorized) {
        total = carts.reduce((sum, a) => sum + a.quantity, 0)
    }

    return (
        <Navbar sticky="top" bg="dark" expand="lg" className="join_us_nav">
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="">
                <Navbar.Text>
                    <Container fluid className="sign_in_as">
                        {isAuthorized ?
                            (<DropdownButton varitant="light" id="user-button" className="sign_in_button" title={`Signed in as: ${user.name}`}>
                                {user?.userType == "admin" ? (
                                    <div>
                                        <Dropdown.Item onClick={() => history.push("/merch/add")}>Add product</Dropdown.Item>
                                        <Dropdown.Item onClick={() => history.push("/blogs/add")} > Add blog </Dropdown.Item>
                                    </div>
                                ) : (<div></div>)}
                                <Dropdown.Item >Edit user</Dropdown.Item>
                                <Dropdown.Item >History</Dropdown.Item>
                                <Dropdown.Item onClick={() => logOut()}>Log Out</Dropdown.Item>
                            </DropdownButton>) :
                            (<div className="join_us_content">Help |<span onClick={() => history.push("/register")}> Join Us </span> </div>)
                        }
                    </Container>
                </Navbar.Text>
                <Navbar.Text>
                    <div>
                        <span onClick={() => history.push("/favorites")} ><img src="/images/heart.png" alt="logo" className="logo_user" /></span>
                    </div>
                </Navbar.Text>
                <Navbar.Text className="carts">
                    <div>
                        <div variant="outline-light">
                            <div>
                                <span onClick={() => history.push("/cart")}><img src="/images/cart.png" alt="logo" className="logo_cart" /></span>
                                <Badge variant="light">{total}</Badge>
                            </div>
                            <span className="sr-only">unread messages</span>
                        </div>
                    </div>
                </Navbar.Text>

            </Navbar.Collapse >
        </Navbar >
    )
}




export default NavBarJoinUs
