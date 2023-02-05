import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Hero(props) {
  
  return (
      <Row>
        <Col md={12} className={"text-center bg-success"}>
          <h1> E-Dashboard </h1>
          <p>
            MERN Stack project
            <br></br>
            MongoDB + react js + express js + Node js
          </p>
        </Col>
        <Col md={12} className="text-center bg-info">
          <h3>{props.title ?? 'Do Something'}</h3>
        </Col>
      </Row>
  );
}

export default Hero;
