import React, { useContext } from "react";
import { Store } from "../../Context/Store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ADD_TO_CART,
  GET_FAIL,
  REMOVE_FROM_CART,
} from "../../Reducers/Actions";
import { Col, Row } from "react-bootstrap";
import Title from "../../Components/Title/Title";
import Cart from "../../Components/Cart/Cart";
import Total from "../../Components/Total/Total";
import { toast } from "react-toastify";

const CartPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  const updateCartHandler = async (item, quantity) => {
    try {
      const { data } = await axios.get(`/products/id/${item._id}`);

      if (data.countInStock < quantity) {
        toast.error("Sorry. Product is out of stock");
        return;
      }
      ctxDispatch({
        type: ADD_TO_CART,
        payload: { ...item, quantity },
      });
    } catch (err) {
      ctxDispatch({ type: GET_FAIL, payload: err.message });
    }
  };

  const removeItemHandler = (item) => {
    ctxDispatch({
      type: REMOVE_FROM_CART,
      payload: item,
    });
  };

  return (
    <div>
      <Title title="Shopping Cart" />
      <Row>
        <Col md={8}>
          <Cart
            removeItemHandler={removeItemHandler}
            updateCartHandler={updateCartHandler}
            cartItems={cartItems}
          />
        </Col>
        <Col md={4}>
          <Total cartItems={cartItems} checkoutHandler={checkoutHandler} />
        </Col>
      </Row>
    </div>
  );
};
export default CartPage;
