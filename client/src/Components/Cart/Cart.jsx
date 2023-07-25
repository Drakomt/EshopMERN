import { Row, Col, ListGroup, Button } from "react-bootstrap";
import MsgBox from "../MsgBox/MsgBox";
import { Link } from "react-router-dom";

const Cart = ({ cartItems, updateCartHandler, removeItemHandler }) => {
  return (
    <>
      {cartItems.length === 0 ? (
        <MsgBox>
          Your cart is empty. <Link to="/">Go back to Home Page</Link>
        </MsgBox>
      ) : (
        <ListGroup>
          {cartItems.map((item, i) => (
            <ListGroup.Item key={i}>
              <Row className="align-items-center">
                <Col md={4}>
                  <img
                    className="img-fluid rounded img-thumbnail card-image-page"
                    src={item.image}
                    alt={item.name}
                  />{" "}
                  <Link to={`/product/${item.token}`}>{item.title}</Link>
                </Col>
                <Col md={3}>
                  <Button
                    onClick={() => {
                      updateCartHandler(item, item.quantity - 1);
                    }}
                    variant="light"
                    disabled={item.quantity === 1}
                  >
                    <i className="fas fa-minus-circle"></i>
                  </Button>{" "}
                  <span>{item.quantity}</span>{" "}
                  <Button
                    variant="light"
                    disabled={item.quantity === item.countInStock}
                    onClick={() => {
                      updateCartHandler(item, item.quantity + 1);
                    }}
                  >
                    <i className="fas fa-plus-circle"></i>
                  </Button>
                </Col>
                <Col md={3}>{item.price}$</Col>
                <Col md={2}>
                  <Button
                    variant="light"
                    onClick={() => {
                      removeItemHandler(item);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default Cart;
