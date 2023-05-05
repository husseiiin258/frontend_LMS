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
import Courses from "../Courses/Courses";
const UpdateCourse = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [UpdateCourse, setUpdateCourse] = useState({
    id: "",
    name: "",
    code: "",
    status: "",
    loading: true,

    results: [],
    err: null,
    reload: 0,
  });
  useEffect(() => {
    setUpdateCourse({ ...UpdateCourse, loading: true });
    axios
      // hahkod el get mn el backend
      .get(
        "https://learing-management-system.onrender.com/api/v1/admin/courses/" +
          id,
        {
          headers: {
            Authorization: `Bearer  ${auth.token}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        setUpdateCourse({
          ...UpdateCourse,
          name: resp.data.data.name,
          Code: resp.data.data.code,
          Status: resp.data.data.this.status,

          results: resp.data.data,
          loading: false,
        });
      });
  }, []);
  const ChangeCourse = (e) => {
    e.preventDefault();
    axios
      // hahkod el get mn el backend
      .put(
        "https://learing-management-system.onrender.com/api/v1/admin/courses/" +
          id,
        {
          name: UpdateCourse.name,
          Code: UpdateCourse.code,
          Status: UpdateCourse.status,
        },
        {
          headers: {
            Authorization: `Bearer  ${auth.token}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        setUpdateCourse({ ...UpdateCourse, reload: UpdateCourse.reload + 1 });
      })
      .catch((resp) => {});
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
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            value={UpdateCourse.name}
            onChange={(e) =>
              setUpdateCourse({ ...UpdateCourse, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Code"
            value={UpdateCourse.code}
            onChange={(e) =>
              setUpdateCourse({ ...UpdateCourse, code: e.target.value })
            }
          />
        </Form.Group>

        <Button
          onClick={(e) => {
            ChangeCourse(e, UpdateCourse.id);
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

export default UpdateCourse;
