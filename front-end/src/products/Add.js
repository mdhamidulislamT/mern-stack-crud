import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";

function Add() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  // Create a new user of data
  const collectData = async () => {
    let userId = JSON.parse(localStorage.getItem("user")).data._id;
    console.log(userId);

    const response = await fetch("http://localhost:3003/products", {
      method: "POST",
      body: JSON.stringify({ name, price, category, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (result.data) {
      setName('')
      setPrice('')
      setCategory('')
      alert(result.message)
    } else {
      alert(JSON.stringify(result))
    }
        
  };

  return (
    <Container>
      <Row>
        <Hero title="Add A New Product" />
        <Col md={3}></Col>
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Category </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label> Price </Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              size="lg"
              onClick={collectData}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Add;
