import React from "react";
import "../../style/CourseInfo.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/Storage";

import { Table } from "react-bootstrap";

import { Button } from "react-bootstrap";
const CourseInfo = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [Details, SetDetails] = useState({
    loading: true,
    results: [],
    err: null,
    instructors: [],
  });
  useEffect(() => {
    SetDetails({ ...Details, loading: true });
    axios

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
        SetDetails((old) => ({ ...old, results: resp.data.data }));
        console.log(resp.data.data);
        axios

          .get(
            "https://learing-management-system.onrender.com/api/v1/admin/instructors",
            {
              headers: {
                Authorization: `Bearer  ${auth.token}`,
              },
            }
          )
          .then((resp) => {
            SetDetails((old) => ({
              ...old,
              instructors: resp.data.data,
              loading: false,
            }));
            console.log(resp.data.data);
          });
      })
      .catch((err) => {
        SetDetails({ ...Details, loading: false, err: "something is wrong" });
      });
  }, []);
  const AssignCourse = (el, id) => {
    el.preventDefault();
    console.log(Details.results);
    axios

      .post(
        "https://learing-management-system.onrender.com/api/v1/admin/courses/" +
          Details.results.id +
          "/assign",
        {
          instructorId: id,
        },
        {
          headers: {
            Authorization: `Bearer  ${auth.token}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        SetDetails({ ...Details, reload: Details.reload + 1 });
      })
      .catch((resp) => {});
  };
  return (
    <div className="course-details-container p-5">
      <div className="row">
        <div className="col-4">
          <img className="course-image" src="/science.jpg" />{" "}
        </div>
        <div className="col-8">
          <h3>{Details.results.name} </h3>
          <p> {Details.results.description} </p>{" "}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Instructor ID </th>

                <th>Instructor email</th>
                <th>type</th>
                <th>Instructor phone </th>

                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {Details.instructors.map((el) => {
                return (
                  <tr key={el.id}>
                    <td>{el.id}</td>

                    <td>{el.email}</td>
                    <td> {el.type} </td>
                    <td>{el.phone}</td>

                    <td>
                      <Button
                        onClick={(e) => {
                          AssignCourse(e, el.id);
                        }}
                        className="btn btn-dark w-100"
                        variant="primary"
                        type="submit"
                      >
                        Assign
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
