import React from 'react'
import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { useSelector } from 'react-redux';


const NavBarO = () => {
    const history = useHistory()
    const isAuthorized = useSelector((state) => state.auth.isAuthorized);

    return (
        <Container fluid className="nav_bar spacing">
            <Row className="nav_content">
                <Col lg={4} md={4} className="left_content">
                    <Link to="/">
                        <img src="/images/logo.png" alt="logo" className="logo" />
                    </Link>

                </Col>
                <Col lg={8} md={8} className="right_content">
                    <ul className="nav_bar_links">
                        <li> <span onClick={() => history.push("/about")} > About</span></li>
                        <li> <span onClick={() => history.push("/blogs")} > Hoopstudy </span></li>
                        <li> <span onClick={() => history.push("/merch")} > Merch </span></li>

                        <li> <span  > Training & Drills </span></li>
                        {isAuthorized ? (<span></span>) : (<li> <span onClick={() => history.push("/login")} > Login </span></li>
                        )}
                    </ul>
                </Col>

            </Row>

        </Container>

        // <Container fluid>
        //#f1a052
        // </Container>
        // <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        //     <Navbar.Brand>
        //         <Link to="/">
        //             <img src="./images/logo.png" alt="logo" className="logo" />
        //         </Link>
        //     </Navbar.Brand>
        //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        //     <Navbar.Collapse id="responsive-navbar-nav">
        //         <Nav className="mr-auto">
        //             <Nav.Link href="#features">Features</Nav.Link>
        //             <Nav.Link href="#pricing">Pricing</Nav.Link>
        //             <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        //                 <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        //                 <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        //                 <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        //                 <NavDropdown.Divider />
        //                 <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        //             </NavDropdown>
        //         </Nav>
        //         <Nav>
        //             <Col lg={3} className="right_content">
        //                 <ul className="nav_bar_links">
        //                     <li> <span onClick={() => history.push("/favorites")} ><img src="./images/heart.png" alt="logo" className="logo_user" /></span></li>
        //                     <li> <span onClick={() => history.push("/")}><img src="./images/cart.png" alt="logo" className="logo_cart" /></span></li>
        //                 </ul>
        //             </Col>
        //         </Nav>
        //     </Navbar.Collapse>
        // </Navbar>
    )
}

export default NavBarO
