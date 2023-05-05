import "../style/Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import image from "../assets/images/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { removeAuthUser, getAuthUser } from "../helper/Storage";
const Header = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  console.log("auth===>", auth);
  const logOut = () => {
    const check = window.confirm("Are you sure you want to Log Out");
    if (check) {
      removeAuthUser();
      navigate("/login");
    }
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link className="nav-link" to={""}>
            {" "}
            Learning Management System
          </Link>
        </Navbar.Brand>

        <Nav className="ms-auto">
          {" "}
          {auth && auth.data[0].type === "student" && (
            <>
              {" "}
              <Nav className="me-auto">
                <Link className="nav-link" to={"/my-courses"}>
                  My courses
                </Link>
                <Link className="nav-link" to={"/available-courses"}>
                  Available Courses
                </Link>
              </Nav>
              <Nav.Link onClick={logOut}>Log Out </Nav.Link>{" "}
            </>
          )}
          {auth && auth.data[0].type === "instructor" && (
            <>
              {" "}
              <Nav className="me-auto">
                <Link className="nav-link" to={"/courses-grade"}>
                  Enrolled students
                </Link>
              </Nav>
              <Nav.Link onClick={logOut}>Log Out </Nav.Link>{" "}
            </>
          )}
          {auth && auth.data[0].type === "admin" && (
            <>
              {" "}
              <Nav className="me-auto">
                <Link className="nav-link" to={"/all-courses"}>
                  All Courses
                </Link>

                <Link className="nav-link" to={"/manage-courses"}>
                  Manage Courses
                </Link>
                <Link className="nav-link" to={"/manage-instructors"}>
                  Manage instructors
                </Link>
              </Nav>
              <Nav.Link onClick={logOut}>Log Out </Nav.Link>{" "}
            </>
          )}
          {!auth && (
            <Link className="nav-link" to={"/login"}>
              Login
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
    // <header className="main-header">
    //   {/* <div className="logo">
    //     <img src={image} alt="logo" />
    //   </div> */}
    //   <div>
    //     {" "}
    //     <h1 style={{ color: "white", fontSize: "80px" }}> LMS </h1>
    //   </div>

    //   <nav>
    //     <ul>
    //       <li>
    //         {" "}
    //         <Link to={"/"}> Home</Link>
    //       </li>
    //       <li>
    //         {" "}
    //         <Link to={"/login"}> login</Link>
    //       </li>
    //       <li>
    //         {" "}
    //         <Link to={"/about"}> About</Link>
    //       </li>
    //       <li>
    //         {" "}
    //         <Link to={"/contact"}> Contact</Link>
    //       </li>
    //     </ul>
    //   </nav>
    // </header>
  );
};
export default Header;
