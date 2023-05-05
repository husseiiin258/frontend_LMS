import "../../style/ManageCourses.css";
import Table from "react-bootstrap/Table";
import { Link, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
const ManageInstructors = () => {
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
  function checkType(el) {
    return el.type == "instructor";
  }
  useEffect(() => {
    setInstructor({ ...Instructor, loading: true });
    axios

      .get(
        "https://learing-management-system.onrender.com/api/v1/admin/users",
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
          results: resp.data.data.filter(checkType),

          loading: false,
        });
      })
      .catch((resp) => {
        setInstructor({
          ...Instructor,
          loading: false,
          err: "something is wrong",
        });
      });
  }, [Instructor.reload]);

  const DeleteInstructor = (id) => {
    axios

      .delete(
        "https://learing-management-system.onrender.com/api/v1/admin/users/" +
          id,
        {
          headers: {
            Authorization: `Bearer  ${auth.token}`,
          },
        }
      )
      .then((resp) => {
        setInstructor({ ...Instructor, reload: Instructor.reload + 1 });
      })
      .catch((resp) => {});
  };
  return (
    <div className="manage-courses p-5">
      <div className="header d-flex justify-content-between mb-5">
        {" "}
        <h3 className="text-center  "> Manage Instructors </h3>{" "}
        <Link to={"add-instructor"} className="btn btn-sm  btn-success h-37 ">
          {" "}
          Add New Instructor +{" "}
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Instructor ID </th>
            <th>Name</th>
            <th>Instructor email</th>
            <th>type</th>
            <th>Instructor phone </th>

            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {Instructor.results.map((Instructor) => {
            return (
              <tr key={Instructor.id}>
                <td>{Instructor.id}</td>
                <td>{Instructor.name} </td>

                <td>{Instructor.email}</td>
                <td> {Instructor.type} </td>
                <td>{Instructor.phone}</td>

                <td>
                  <Link
                    className=" btn btn-sm  btn-danger"
                    onClick={(e) => {
                      DeleteInstructor(Instructor.id);
                    }}
                  >
                    {" "}
                    Delete{" "}
                  </Link>

                  <Link
                    to={"update/" + Instructor.id}
                    className="btn btn-sm  mx-2  btn-warning "
                  >
                    {" "}
                    Update{" "}
                  </Link>

                  <Link
                    to={"/all-courses"}
                    className="btn btn-sm  btn-primary "
                  >
                    {" "}
                    assign{" "}
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

export default ManageInstructors;
