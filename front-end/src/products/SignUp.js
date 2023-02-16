import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { Formik, useFormik } from 'formik';



function SignUp() {
  const navigate = useNavigate();

  const formik =useFormik({
    initialValues:{
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values, {resetForm})=>{
      console.log(values);
      collectData(values);
      resetForm({values: ""})
    }
      
  });

  /* name: string().min(2,"min 2 char").required(),
      email: string().email().required(),
      password: string().min(2,"min 6 char").required(), */

  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }

  },[])


  // Create a new user of data
   const collectData = async (values) => {

    console.log(values);
    const { name, email, password} = values;
    const response = await fetch("http://localhost:3003/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    localStorage.setItem('user', JSON.stringify(result.data.user))
    navigate('/');
  };

  return (
    <Container>
      <Row>
      <Hero title="Sign Up Now" />
        <Col md={3}></Col>
        <Col md={6}>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              size="lg"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
