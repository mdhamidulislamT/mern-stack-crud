import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import Hero from "../components/Hero";

function Update() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    getProduct();
  }, []);

  // Create a new user of data
  const getProduct = async () => {
    let userId = JSON.parse(localStorage.getItem("user")).data._id;

    if (id) {
      let result = await fetch(`http://localhost:3003/products/${id}`);
      result = await result.json();

      setName(result.data.name);
      setPrice(result.data.price);
      setCategory(result.data.category);
    }
  };

  // Update a new user of data
  const collectData = async () => {
    let userId = JSON.parse(localStorage.getItem("user")).data._id;

    if (!name || !price || !category) {
      setError(true);
      return;
    }

    const response = await fetch(`http://localhost:3003/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      console.log("status code", response.status);
      if (response.status == 200) {
        navigate('/');
      } else {
        alert("Error! Please try again.");
      }
    });
  };

  return (
    <Container>
      <Row>
        <Hero title="Update Product" />
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
              {error ? (
                !name ? (
                  <span className="text-danger"> required field </span>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label> Category </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              {error ? (
                !category ? (
                  <span className="text-danger"> required field </span>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label> Price </Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {error ? (
                !price ? (
                  <span className="text-danger"> required field </span>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
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

export default Update;
