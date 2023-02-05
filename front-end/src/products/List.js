import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Hero from "../components/Hero";

const List = () => {
    return (
      <Container>
        <Row>
        <Hero title="Product List" />

          <Col md={12}>
            <h1>this is product list goes here</h1>
          </Col>
        </Row>
      </Container>
    );
};

export default List;
