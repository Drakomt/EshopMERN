import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Title from "../../Components/Title/Title";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../../Context/Store";
import { USER_SIGNIN } from "../../Reducers/Actions";
import axios from "axios";

export const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

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

    if (password !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await axios.post("/users/signup", {
        name,
        email,
        password,
      });
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
        <Title>SignUp</Title>
        <h1 className="my-3">SignUp</h1>
        <Form onSubmit={submit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="confirm-password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setConfirmPass(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <div className="mb-3">
            <Button type="submit">Sign Up</Button>
          </div>
          <div className="mb-3">
            Already Have an Account?{" "}
            <Link to={`/signIn?redirect=${redirect}`}>Sign in Here</Link>
          </div>
        </Form>
      </Container>
    </>
  );
};
