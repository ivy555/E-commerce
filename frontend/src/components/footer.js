import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CookieConsent, { Cookies } from "react-cookie-consent";


const Footer = () => {
    return (
        <footer className="bg-light">
            <Container className="p-2">
                <Row className="d-flex justify-content-center text-primary">
                    <Col md="auto">
                        <h6>Use of cookies</h6>
                        <CookieConsent
                            location="bottom"
                            buttonText="Accept All!!"
                           cookieName="myAwesomeCookieName2"
                          style={{ background: "#2B373B" }}
                           buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                          expires={150}
                          >
                          We use cookies to improve your experience and for marketing. Read our cookie policy or manage cookies..{" "}
                          <span style={{ fontSize: "10px" }}> :O</span>
                         </CookieConsent>
                    </Col>
                    <Col md="auto">
                        <h6>Terms and Condition</h6>
                    </Col>
                    <Col md="auto">
                        <h6>Contact</h6>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
