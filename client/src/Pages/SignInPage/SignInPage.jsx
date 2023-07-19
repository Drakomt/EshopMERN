import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Title from "../../Components/Title/Title";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../../Context/Store";
import { USER_SIGNIN } from "../../Reducers/Actions";
import axios from "axios";

export const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();

  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    userInfo && navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/signin", { password, email });
      ctxDispatch({ type: USER_SIGNIN, payload: data });
      navigate(redirect);
    } catch (error) {
      toast.error(error.message);
      // toast.error(error.message, {
      //     theme: "colored",
      //     hideProgressBar: true,
      //     autoClose: 3000,
      //     closeOnClick: true,
      //     pauseOnHover: false,
      //     draggable: true,
      //     progress: undefined,
      //   });
    }
  };

  return (
    <>
      <Container className="small-container">
        <Title>SignIn</Title>
        <h1 className="my-3">SignIn</h1>
        <Form onSubmit={submit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Sign In</Button>
          </div>
          <div className="mb-3">
            New Customer?{" "}
            <Link to={`/signUp?redirect=${redirect}`}>Create New Account</Link>
          </div>
        </Form>
      </Container>
    </>
  );
};
