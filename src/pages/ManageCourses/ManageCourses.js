import "../../style/ManageCourses.css";
import Table from "react-bootstrap/Table";
import { Link, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
const ManageCourses = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [Courses, setCourses] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  useEffect(() => {
    setCourses({ ...Courses, loading: true });
    axios
      // hahkod el get mn el backend
      .get(process.env.REACT_APP_BACKEND_URL + "/api/v1/admin/courses", {
        headers: {
          Authorization: `Bearer  ${auth.token}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        setCourses({ ...Courses, results: resp.data.data, loading: false });
      })
      .catch((resp) => {
        setCourses({ ...Courses, loading: false, err: "something is wrong" });
      });
  }, [Courses.reload]);
  const SearchCourses = (e) => {
    e.preventDefault();

    setCourses({ ...Courses, reload: Courses.reload + 1 });
  };

  const DeleteCourse = (id) => {
    axios
      // hahkod el get mn el backend
      .delete(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/admin/courses/" + id,
        {
          headers: {
            Authorization: `Bearer  ${auth.token}`,
          },
        }
      )
      .then((resp) => {
        setCourses({ ...Courses, reload: Courses.reload + 1 });
      })
      .catch((resp) => {});
  };
  return (
    <div className="manage-courses p-5">
      <div className="header d-flex justify-content-between mb-5">
        {" "}
        <h3 className="text-center  "> Manage Courses </h3>{" "}
        <Link to={"add"} className="btn btn-sm  btn-success h-37 ">
          {" "}
          Add New Course +{" "}
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>course ID </th>
            <th> course image</th>
            <th>course Name</th>
            <th> Description </th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
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

                  <Link
                    to={"update"}
                    className="btn btn-sm  mx-2  btn-warning "
                  >
                    {" "}
                    Update{" "}
                  </Link>

                  <Link
                    to={"/course-details/" + Courses.id}
                    className="btn btn-sm  btn-primary "
                  >
                    {" "}
                    Show{" "}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageCourses;
