import React from "react";
import { Navbar, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap"
import "./NavBar.css";

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <>
            <header className="App-header">
                <Navbar bg="dark" variant="dark">
                    <Link className="ms-5" onClick={() =>{
                        navigate(-1);
                    }}>Back</Link>
                    <Container className="container">
                        <LinkContainer to="/">
                            <Navbar.Brand>
                                <img src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695" width={100} alt="AMZN"/>
                            </Navbar.Brand>
                        </LinkContainer>
                        <nav to="/" className="d-flex mx-auto align-items-center">
                            <div>
                                Search
                                <input type="text"></input>
                            </div>
                        </nav>
                        <Link to="/cart" className="nav-link me-4 ms-4">Cart</Link>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}

export default NavBar;