import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FooterPage = () => {
    return (
        <Container fluid className="footer">
            {/* <Row>
                <Col>
                    info2
                </Col>
                <Col>
                    info1
                </Col>
            </Row> */}

            <div className="copyright">
                COPYRIGHT © 2020 TAP BONG RO - ALL RIGHTS RESERVED.
            </div>
        </Container>
    );
}

export default FooterPage;