import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

const Total = ({ cartItems, checkoutHandler }) => {
  return (
    <>
      <Card>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                {/* Counts the items the cart */}
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                {/* Calculates the overall price */}
                Items) : $
                {cartItems
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid">
                <Button
                  type="button"
                  variant="primary"
                  disabled={cartItems.length === 0}
                  onClick={() => checkoutHandler()}
                >
                  Checkout
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};

export default Total;
