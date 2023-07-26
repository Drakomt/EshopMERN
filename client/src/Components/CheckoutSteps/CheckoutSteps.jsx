import { Col, Row } from "react-bootstrap";
import "./CheckoutSteps.css";
import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = (props) => {
  return (
    <>
      <Row className="checkout-steps">
        <Col className={props.step1 ? "active" : ""}>
          {/* <Link to={"/signin"}>Sign In</Link> */}
          Sign In
        </Col>
        <Col className={props.step2 ? "active" : ""}>
          <Link to={"/shipping"}>Shipping</Link>
        </Col>
        <Col className={props.step3 ? "active" : ""}>
          <Link to={"/payment"}>Payment</Link>
        </Col>
        <Col className={props.step4 ? "active" : ""}>
          <Link to={"/placeorder"}>PlaceOrder</Link>
        </Col>
      </Row>
    </>
  );
};

export default CheckoutSteps;
