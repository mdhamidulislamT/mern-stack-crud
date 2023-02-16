import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { useFormik } from 'formik';
import * as yup from 'yup';



 const SignUp = () => {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues:{
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup.string().min(3,"Name at least 3 chars").required(),
      email: yup.string().email().required(),
      password: yup.string().min(6,"Password at least 6 chars").required(),
    }),
    onSubmit: (values, {resetForm})=>{
      sendData(values);
      resetForm({values: ""});
    },
      
  });

  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }

  },[])


  // Create a new user of data
   const sendData = async (values) => {

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
              { formik.touched.name && formik.errors.name  &&  (<span className="text-danger"> {formik.errors.name} </span>)}
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
              <br />
              { formik.touched.email && formik.errors.email  &&  (<span className="text-danger"> {formik.errors.email} </span>)}
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
              { formik.touched.password && formik.errors.password  &&  (<span className="text-danger"> {formik.errors.password} </span>)}
              </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" size="md" type="submit">
                    Save
                  </Button>
                </div>
                
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
