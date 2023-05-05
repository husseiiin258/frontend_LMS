import React, { useEffect, useState } from "react";
import CourseCard from "../product/components/CourseCard";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { getAuthUser } from "../../helper/Storage";
const auth = getAuthUser();
const AvailableCourses = () => {
  const [Courses, setCourses] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCourses({ ...Courses, loading: true });
    axios
      // hahkod el get mn el backend
      .get(
        "https://learing-management-system.onrender.com/api/v1/student/courses",
        {
          headers: {
            Authorization: `Bearer  ${auth.token}`,
          },
          params: {
            search: search,
          },
        }
      )
      .then((resp) => {
        setCourses({ ...Courses, results: resp.data.data, loading: false });
        console.log(resp.data.data);
      })
      .catch((resp) => {
        setCourses({ ...Courses, loading: false, err: "something is wrong" });
      });
  }, [Courses.reload]);
  const SearchCourses = (e) => {
    e.preventDefault();
    console.log(search);
    setCourses({ ...Courses, reload: Courses.reload + 1 });
  };
  return (
    <div style={{ padding: "20px" }}>
      {Courses.loading == true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {Courses.loading === false && (
        <>
          {" "}
          <Form onSubmit={SearchCourses}>
            <Form.Group className="mb-3 d-flex " controlId="formBasicEmail">
              <Form.Control
                type="text"
                required
                placeholder="Search For Course "
                className="rounded-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-dark rounded-0 "> search </button>
            </Form.Group>
          </Form>
          <div className="row">
            {Courses.results.map((Course) => {
              return (
                <div className="col-3 course-card-container" key={Course.id}>
                  <CourseCard
                    name={Course.name}
                    description={Course.description}
                    image={Course.image}
                    id={Course.id}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default AvailableCourses;
