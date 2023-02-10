import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

function Header2() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">E-Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {auth ? (
            <Nav className="me-auto">
              <Nav.Link href="/"> Products </Nav.Link>
              <Nav.Link href="/add"> Add Product </Nav.Link>
            </Nav>
          ) : (
            <Nav className="me-auto"> </Nav>
          )}
          
          <Nav.Link className="text-info" href="/profile"> {auth? JSON.parse(auth).data.name : ''} </Nav.Link>
            {auth ? "" : <Nav.Link href="/signup"> Signup </Nav.Link>}
          <Nav>
            {auth ? (
              <Nav.Link onClick={logout} href="/login">
                {" "}
                Logout{" "}
              </Nav.Link>
            ) : (
              <Nav.Link href="/login"> Login </Nav.Link>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header2;
