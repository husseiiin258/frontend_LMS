import React, { useLayoutEffect } from "react";
import "../../style/ManageCourses.css";
import Table from "react-bootstrap/Table";
import { Link, useFetcher, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
const UpdateInstructor = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [Instructor, setInstructor] = useState({
    id: "",

    email: "",
    name: "",
    type: "",
    phone: "",
    loading: true,

    results: [],
    err: null,
    reload: 0,
  });
  useEffect(() => {
    setInstructor({ ...Instructor, loading: true });
    axios

      .get(
        "https://learing-management-system.onrender.com/api/v1/admin/users/" +
          id,
        {
          headers: {
            Authorization: `Bearer  ${auth.token}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        setInstructor({
          ...Instructor,
          email: resp.data.data.email,
          type: resp.data.data.type,
          phone: resp.data.data.phone,

          results: resp.data.data,
          loading: false,
        });
      });
  }, []);
  const ChangeInstructor = (e) => {
    e.preventDefault();
    axios

      .put(
        "https://learing-management-system.onrender.com/api/v1/admin/users/" +
          id,
        { email: Instructor.email, phone: Instructor.phone },
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
      <h1 style={{ marginTop: "100px" }}> Update Instructor </h1>{" "}
      <Alert variant="danger" className="p-2">
        This is a simple alert{" "}
      </Alert>
      <Alert variant="success" className="p-2">
        This is a simple alert{" "}
      </Alert>
      <Form onSubmit={ChangeInstructor}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="phone"
            value={Instructor.phone}
            onChange={(e) =>
              setInstructor({ ...Instructor, phone: e.target.value })
            }
          />
        </Form.Group>

        <Button
          onClick={(e) => {
            ChangeInstructor(e, Instructor.id);
          }}
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
        >
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateInstructor;
