import { useContext, useEffect, useReducer } from "react";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../../Reducers/Actions";
import { Store } from "../../Context/Store";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GetError } from "../../Services/GetError";
import Loading from "../../Components/Loading/Loading";
import MsgBox from "../../Components/MsgBox/MsgBox";
import Title from "../../Components/Title/Title";
import { Card, Col, ListGroup, Row } from "react-bootstrap";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case GET_REQUEST:
      return { ...state, loading: true, error: "" };
    case GET_SUCCESS:
      return { ...state, loading: false, order: payload, error: "" };
    case GET_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

const OrderPage = () => {
  const {
    state: { userInfo },
  } = useContext(Store);
  const params = useParams();
  const { id: orderId } = params;
  const naviagte = useNavigate();

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: null,
    error: "",
  });

  useEffect(() => {
    const getOrder = async () => {
      dispatch({ type: GET_REQUEST });

      try {
        const { data } = await axios.get(`/orders/${orderId}`, {
          headers: { authorization: userInfo.token },
        });
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (error) {
        //   dispatch({ type: GET_FAIL, payload: GetError(error) });
        dispatch({ type: GET_FAIL, payload: error.message });
      }
    };
    if (!userInfo) {
      naviagte("/login");
    }
    if (!order || (order._id && orderId !== order._id)) {
      getOrder();
    }
    //getOrder();
  }, [naviagte, order, orderId, userInfo]);

  return loading ? (
    <Loading />
  ) : error ? (
    <MsgBox variant="danger">{error}</MsgBox>
  ) : (
    <div>
      <Title title="Order" />
      <h1 className="my-3">Order {order._id.substr(order._id.length - 5)}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body className="h-100">
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong> {order.shippingAddress.fullName} <br />
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city} ,{order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MsgBox variant="success">
                  Delivered at {order.deliveredAt}
                </MsgBox>
              ) : (
                <MsgBox variant="danger">Not Delivered</MsgBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MsgBox variant="success">Paid at {order.paidAt}</MsgBox>
              ) : (
                <MsgBox variant="danger">Not Paid</MsgBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body className="h-100">
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6} xs={6}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid rounded img-thumbnail" //remove img-thumbnail to remove the border
                        ></img>{" "}
                        <Link to={`/product/${item.token}`}>{item.title}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body className="h-100">
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default OrderPage;
