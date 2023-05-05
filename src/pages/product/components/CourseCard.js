import React from "react";

import { Link, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthUser } from "../../../helper/Storage";

const CourseCard = (props) => {
  // let { id } = useParams();
  const auth = getAuthUser();
  const [RegisterCourses, setRegisterCourses] = useState({
    name: "",
    description: "",
    err: [],
    id: "",
    loading: false,
  });
  const RegisterCourse = (e, id) => {
    // e.preventDefault();
    setRegisterCourses({ ...RegisterCourses, loading: true });
    console.log("heeeeeeeeeeeeeeeer");

    axios
      // hahkod el get mn el backend
      .post(
        process.env.REACT_APP_BACKEND_URL +
          "/api/v1/student/courses/" +
          id +
          "/register",
        {
          studentId: auth.data[0].id,
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
    <div>
      {" "}
      <Card style={{ width: "18rem" }}>
        <Card.Img className="card-image" variant="top" src={props.image} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <button
            className="btn btn-dark w-100"
            onClick={(e) => RegisterCourse(e, props.id)}
          >
            {" "}
            Register{" "}
          </button>
        </Card.Body>
      </Card>{" "}
    </div>
  );
};

export default CourseCard;
