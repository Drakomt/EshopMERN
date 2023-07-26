import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../../Context/Store";
import { SAVE_SHIPPING_ADDRESS } from "../../Reducers/Actions";
import Title from "../../Components/Title/Title";
import CheckoutSteps from "../../Components/CheckoutSteps/CheckoutSteps";
import { Button, Form } from "react-bootstrap";
const ShippingAddressPage = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: SAVE_SHIPPING_ADDRESS,
      payload: { fullName, address, city, postalCode, country },
    });
    navigate("/payment");
  };

  return (
    <div>
      <Title title="Shipping Address" />
      <CheckoutSteps step1 step2 />
      <div className="container small-container">
        <h1>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShippingAddressPage;
