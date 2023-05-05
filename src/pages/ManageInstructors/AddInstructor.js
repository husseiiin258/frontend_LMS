import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
const AddInstructor = () => {
  const auth = getAuthUser();
  const [Instructors, setInstructor] = useState({
    email: "",
    password: "",
    type: "",
  });

  const image = useRef(null);
  const CreateInstructor = (e) => {
    e.preventDefault();
    setInstructor({ ...Instructors, loading: true });

    axios
      // hahkod el get mn el backend
      .post(
        "https://learing-management-system.onrender.com/api/v1/admin/users",
        {
          email: Instructors.email,
          password: Instructors.password,
          type: Instructors.type,
        },
        {
          headers: {
            Authorization: `Bearer  ${auth.token}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <h1 style={{ marginTop: "100px" }}> Add New Instructor </h1>{" "}
      <Alert variant="danger" className="p-2">
        This is a simple alert{" "}
      </Alert>
      <Alert variant="success" className="p-2">
        This is a simple alert{" "}
      </Alert>
      <Form onSubmit={CreateInstructor}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder=" instructor email"
            value={Instructors.email}
            onChange={(e) =>
              setInstructor({ ...Instructors, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="password"
            value={Instructors.password}
            onChange={(e) =>
              setInstructor({ ...Instructors, password: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="type"
            value={Instructors.type}
            onChange={(e) =>
              setInstructor({ ...Instructors, type: e.target.value })
            }
          />
        </Form.Group>

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddInstructor;
