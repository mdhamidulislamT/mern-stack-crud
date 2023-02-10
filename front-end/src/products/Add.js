import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { ToastContainer, toast } from 'react-toastify';

function Add() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  
  const notify = (msg) => toast.success(msg, {
    theme: "colored"
  })
  const notifyEror = (msg) => toast.error(msg, {
    theme: "colored"
  })
  // Create a new user of data
  const collectData = async () => {
    let userId = JSON.parse(localStorage.getItem("user")).data._id;

    if (!name || !price || !category) {
      setError(true);
      return;
    }

    const response = await fetch("http://localhost:3003/products", {
      method: "POST",
      body: JSON.stringify({ name, price, category, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (result.data) {
      notify(result.message);
      setName("");
      setPrice("");
      setCategory("");
    } else {
      notifyEror("Error! Please try again.");
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
              { error ? !name ? <span className="text-danger"> required field </span> : '' : '' }
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label> Category </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              { error ? !category ? <span className="text-danger"> required field </span> : '' : '' }
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label> Price </Form.Label>
              <Form.Control
                type="text"
                placeholder="Price :250"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              { error ? !price ? <span className="text-danger"> required field </span> : '' : '' }

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
      <ToastContainer />

    </Container>
  );
}

export default Add;
