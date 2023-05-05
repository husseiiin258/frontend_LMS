import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import "../../style/Login.css";
import axios from "axios";
import { setAuthUser } from "../../helper/Storage";

const LoginPage = () => {
  const navigate = useNavigate();
  const [LoginForm, setLoginForm] = useState({
    email: "",
    password: "",
    loading: false,
    err: [],
  });

  const LoginFun = (e) => {
    e.preventDefault();
    setLoginForm({ ...LoginForm, loading: true, err: [] });
    axios
      .post(
        "https://learing-management-system.onrender.com/api/v1/auth/login",
        {
          email: LoginForm.email,
          password: LoginForm.password,
        }
      )
      .then((resp) => {
        console.log(resp);
        setLoginForm({ ...LoginForm, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/");
      })
      .catch((errors) => {
        console.log(errors);
        setLoginForm({
          ...LoginForm,
          loading: false,
          err: [errors.response.data],
        });
      });
  };
  return (
    // <div style={{ textAlign: "center", padding: "10px" }}>
    //   <h1> LoginPage </h1>{" "}
    //   <form onSubmit={(e) => contactUs(e)}>
    //     {" "}
    //     <label htmlFor="email"> email </label>
    //     <input
    //       id="email"
    //       type="email"
    //       value={LoginForm.email}
    //       onChange={(event) =>
    //         setLoginForm({ ...LoginForm, email: event.target.value })
    //       }
    //       required
    //     />{" "}
    //     <br />
    //     <br />
    //     <label htmlFor="password"> password </label>
    //     <input
    //       id="password"
    //       type="password"
    //       placeholder="Enter your password"
    //       value={LoginForm.password}
    //       onChange={(event) =>
    //         setLoginForm({ ...LoginForm, password: event.target.value })
    //       }
    //       required
    //     />
    //     <br />
    //     <button> submit </button>
    //   </form>
    // </div>
    <div className="login-container">
      <h1 style={{ marginTop: "100px" }}> Login Form </h1>{" "}
      {LoginForm.err.map((error, index) => {
        return (
          <Alert key={index} variant="danger" className="p-2">
            {error.message}
          </Alert>
        );
      })}
      <Form onSubmit={LoginFun}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ padding: "10px" }}>Email :</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={LoginForm.email}
            onChange={(e) =>
              setLoginForm({ ...LoginForm, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password : </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={LoginForm.password}
            onChange={(e) =>
              setLoginForm({ ...LoginForm, password: e.target.value })
            }
          />
        </Form.Group>

        <Button
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
          disabled={LoginForm.loading === true}
        >
          Login
        </Button>
        <br />
        <Link
          to={"/register"}
          className="btn btn-dark w-100 my-2"
          variant="primary"
          type="submit"
        >
          Register Form
        </Link>
      </Form>
    </div>
  );
};

export default LoginPage;
