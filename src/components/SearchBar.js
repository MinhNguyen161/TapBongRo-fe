import React from "react";
import { MDBCol } from "mdbreact";
import { Container } from "react-bootstrap";

const SearchPage = () => {
    return (
        <Container md="6">
            <div className="search_bar">
                <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
            </div>
        </Container>
    );
}

export default SearchPage;