import React from "react";
import { Table } from "react-bootstrap";
import { useState } from "react";
import { getAuthUser } from "../../helper/Storage";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const MyCourses = () => {
  // let { id } = useParams();
  const auth = getAuthUser();
  const [MyCourses, setMyCourses] = useState({
    id: "",
    name: "",
    grade: "",
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  useEffect(() => {
    setMyCourses({ ...MyCourses, loading: true });
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/v1/student/grades", {
        headers: {
          Authorization: `Bearer  ${auth.token}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setMyCourses({ ...MyCourses, results: resp.data, loading: false });
      })
      .catch((resp) => {
        setMyCourses({
          ...MyCourses,
          loading: false,
          err: "something is wrong",
        });
      });
  }, [MyCourses.reload]);
  return (
    <div>
      {" "}
      <h1 style={{ textAlign: "center" }}> My Courses</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>course ID </th>

            <th>course Name</th>
            <th> Grade </th>
          </tr>
        </thead>
        <tbody>
          {MyCourses.results.map((MyCourses) => {
            return (
              <tr key={MyCourses.id}>
                <td>{MyCourses.id}</td>
                <td>{MyCourses.name}</td>
                <td>{MyCourses.grade ? MyCourses.grade : 0}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default MyCourses;
