import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

function Header2() {

  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout=()=>{
      localStorage.clear();
      navigate('/signup');
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to="/"> Products </Nav.Link>
            <Nav.Link href="/add"> Add Product </Nav.Link>
          </Nav>
          <Nav>
            { auth ? <Nav.Link onClick={logout} href="/signup"> Logout </Nav.Link> :
            <Nav.Link href="/signup"> Signup </Nav.Link> }
            <Nav.Link href="/profile"> Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header2;
