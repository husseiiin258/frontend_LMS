import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../../style/Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../../helper/Storage";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [RegisterForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    loading: false,
    err: [],
  });

  const RegisterFun = (e) => {
    e.preventDefault();
    setRegisterForm({ ...RegisterForm, loading: true, err: [] });
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/v1/auth/register", {
        email: RegisterForm.email,
        password: RegisterForm.password,
        name: RegisterForm.name,
        phone: RegisterForm.phone,
      })
      .then((resp) => {
        console.log(resp);
        setRegisterForm({ ...RegisterForm, loading: false, err: [] });
        axios
          .post(process.env.REACT_APP_BACKEND_URL + "/api/v1/auth/login", {
            email: RegisterForm.email,
            password: RegisterForm.password,
          })
          .then((res) => {
            setAuthUser(res.data);
            navigate("/");
          });
      })
      .catch((errors) => {
        console.log(errors);
        setRegisterForm({
          ...RegisterForm,
          loading: false,
          err: [errors.response.data],
        });
      });
  };
  return (
    <div>
      {" "}
      <div className="Register-container">
        <h1 style={{ marginTop: "100px" }}> Registration Form </h1>{" "}
        {RegisterForm.err.map((error, index) => {
          return (
            <Alert key={index} variant="danger" className="p-2">
              {error.message}
            </Alert>
          );
        })}
        <Form onSubmit={RegisterFun}>
          <Form.Group className="mb-3" controlId="RegisterEmail">
            <Form.Label style={{ padding: "10px" }}>Name :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Full Name"
              value={RegisterForm.name}
              onChange={(e) =>
                setRegisterForm({ ...RegisterForm, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="RegisterEmail">
            <Form.Label style={{ padding: "10px" }}>Email :</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={RegisterForm.email}
              onChange={(e) =>
                setRegisterForm({ ...RegisterForm, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="RegisterPassword">
            <Form.Label>Password : </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={RegisterForm.password}
              onChange={(e) =>
                setRegisterForm({ ...RegisterForm, password: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="RegisterPhone">
            <Form.Label>phone : </Form.Label>
            <Form.Control
              type="text"
              placeholder="phone number"
              value={RegisterForm.phone}
              onChange={(e) =>
                setRegisterForm({ ...RegisterForm, phone: e.target.value })
              }
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="RegisterEmail">
            <Form.Label style={{ padding: "10px" }}>Gender :</Form.Label>
            <Form.Control type="text" placeholder="Enter Your Gender" />
          </Form.Group> */}

          <Button
            className="btn btn-dark w-100"
            variant="primary"
            type="submit"
            disabled={RegisterForm.loading === true}
          >
            Register
          </Button>
        </Form>
      </div>{" "}
    </div>
  );
};

export default RegisterPage;
