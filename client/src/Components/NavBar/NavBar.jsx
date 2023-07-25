import React, { useContext } from "react";
import { Navbar, Container, Badge, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./NavBar.css";
import { Store } from "../../Context/Store";
import { USER_SIGNOUT } from "../../Reducers/Actions";

const NavBar = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  //   const {
  //     cart: { cartItems },
  //     userInfo,
  //   } = state;
  const { cartItems } = cart;

  const signoutHandler = () => {
    ctxDispatch({ type: USER_SIGNOUT });
    // localStorage.removeItem("userInfo");
    // localStorage.removeItem("shippingAddress");
    // localStorage.removeItem("paymentMethod");
  };

  return (
    <>
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Link
            className="ms-5"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Link>
          <Container className="container">
            <LinkContainer to="/">
              <Navbar.Brand>
                <img
                  src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                  width={100}
                  alt="AMZN"
                />
              </Navbar.Brand>
            </LinkContainer>
            <nav to="/" className="d-flex mx-auto align-items-center">
              <div>
                Search
                <input type="text"></input>
              </div>
            </nav>
            {/* <Link to="/cart" className="nav-link me-4 ms-4">
              <i className="fas fa-shopping-cart text-white"></i>
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {" "}
                  {cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </Badge>
              )}
            </Link> */}
            <Link to="/cart" className="nav-link me-4 ms-4">
              <i className="fas fa-shopping-cart text-white"></i>
              {cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {" "}
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
              <NavDropdown
                className="text-white me-5"
                title={userInfo.name}
                id="basic-nav-dropdown"
              >
                {/* <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider /> */}
                <Link
                  onClick={signoutHandler}
                  to="#signout"
                  className="dropdown-item"
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <>
                <Link className="nav-link text-white" to="/signin">
                  Sign In
                </Link>
                <span className="nav-link text-white ms-1 me-1">or </span>
                <Link className="nav-link text-white" to="/signup">
                  Sign Up
                </Link>
              </>
            )}
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default NavBar;
