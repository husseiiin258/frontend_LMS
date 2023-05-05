import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
import { Table } from "react-bootstrap";
const CoursesGrade = () => {
  const auth = getAuthUser();
  const [Grades, setGrades] = useState({
    instructorId: "",
    Grade: "",
    StudentId: "",
    CourseId: "",
    results: [],
    reload: 0,
  });
  useEffect(() => {
    setGrades({ ...Grades, loading: true });
    axios
      .get(
        `https://learing-management-system.onrender.com/api/v1/instructor/courses`,
        {
          headers: {
            Authorization: `Bearer  ${auth.token}`,
          },
        }
      )
      .then((res) => {
        res.data.data.map((el) => {
          axios
            // hahkod el get mn el backend
            .get(
              "https://learing-management-system.onrender.com/api/v1/instructor/courses/" +
                el.course_id +
                "/students",
              {
                headers: {
                  Authorization: `Bearer  ${auth.token}`,
                },
              }
            )
            .then((resp) => {
              console.log(resp.data.data);
              setGrades((old) => ({
                ...old,
                results: [...old.results, ...resp.data.data],
                loading: false,
              }));
            })
            .catch((resp) => {
              setGrades({
                ...Grades,
                loading: false,
                err: "something is wrong",
              });
            });
        });
      })
      .catch((err) => {
        setGrades({ ...Grades, loading: false, err: "something is wrong" });
      });
  }, [Grades.reload]);
  useEffect(() => {
    console.log(Grades);
  }, [Grades]);

  const image = useRef(null);
  const CreateGrade = (e, el) => {
    e.preventDefault();
    setGrades({ ...Grades, loading: true });

    axios
      // hahkod el get mn el backend
      .post(
        "https://learing-management-system.onrender.com/api/v1/instructor/courses/" +
          el.course_id +
          "/students/" +
          el.id +
          "/grads",
        {
          grade: el.grade,
        },
        {
          headers: {
            Authorization: `Bearer  ${auth.token}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        setGrades({
          ...Grades,
          reload: 1,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   const [Grades, setGrades] = useState({
  //     Grade: "",
  //   });

  return (
    <>
      {" "}
      <h1 style={{ textAlign: "center" }}> My Students </h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course ID </th>
            <th>Student ID</th>
            <th> Grade </th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {Grades.results.map((el) => {
            return (
              <tr>
                <td> {el.course_id} </td>
                <td> {el.id} </td>
                <td>
                  <input
                    type="number"
                    placeholder="Grade"
                    value={el.grade}
                    onChange={(e) =>
                      setGrades((old) => {
                        const indexOfE = old.results.findIndex(
                          (en) => en.id == el.id
                        );
                        const updatedResults = old.results;
                        updatedResults[indexOfE].grade = e.target.value;
                        return {
                          ...old,
                          results: [...updatedResults],
                        };
                      })
                    }
                  />
                </td>
                <td>
                  <Button
                    onClick={(e) => {
                      CreateGrade(e, el);
                    }}
                  >
                    Set Grade
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        {/* <tbody>
      {Courses.results.map((Courses) => {
        return (
          <tr key={Courses.id}>
            <td>{Courses.id}</td>
            <td>
              <img className="image-avatar" src="/science.jpg" />
            </td>
            <td>{Courses.name}</td>
            <td> studying physics and chemistry </td>
            <td>
              <Link
                className=" btn btn-sm  btn-danger"
                onClick={(e) => {
                  DeleteCourse(Courses.id);
                }}
              >
                {" "}
                Delete{" "}
              </Link>

              <Link to={"update"} className="btn btn-sm  mx-2  btn-warning ">
                {" "}
                Update{" "}
              </Link>

              <Link
                to={"/" + Courses.id}
                className="btn btn-sm  btn-primary "
              >
                {" "}
                Show{" "}
              </Link>
            </td>
          </tr>
        );
      })}
    </tbody> */}
      </Table>{" "}
    </>
  );
};

export default CoursesGrade;
