import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
const AddCourse = () => {
  const auth = getAuthUser();
  const [Courses, setCourses] = useState({
    name: "",
    Code: "",
    err: [],
    loading: false,
    status: "",
  });

  const image = useRef(null);
  const CreateCourse = (e) => {
    e.preventDefault();
    setCourses({ ...Courses, loading: true });

    axios
      // hahkod el get mn el backend
      .post(
        "https://learing-management-system.onrender.com/api/v1/admin/courses",
        {
          name: Courses.name,
          code: Courses.Code,
          status: "active",
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
      <h1 style={{ marginTop: "100px" }}> Add New Course </h1>{" "}
      {/* <Alert variant="danger" className="p-2">
        This is a simple alert{" "}
      </Alert>
      <Alert variant="success" className="p-2">
        This is a simple alert{" "}
      </Alert> */}
      <Form onSubmit={CreateCourse}>
        <Form.Group className="mb-3">
          <Form.Control
            value={Courses.name}
            onChange={(e) => setCourses({ ...Courses, name: e.target.value })}
            required
            type="text"
            placeholder="Course Name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            value={Courses.description}
            onChange={(e) => setCourses({ ...Courses, Code: e.target.value })}
            required
            className="form-control"
            placeholder=" Course code"
          ></textarea>
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            value={Courses.status}
            onChange={(e) => setCourses({ ...Courses, status: e.target.value })}
            required
            className="form-control"
            placeholder=" Course status"
          ></textarea>
        </Form.Group>

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddCourse;
