import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";
import { json, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1>this is Dashboard list Dashboard here</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
