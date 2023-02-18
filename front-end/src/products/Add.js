import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Add = () => {

  const formik = useFormik({
    initialValues:{
      name: "",
      category: "",
      price: "",
    },
    validationSchema: yup.object({
      name: yup.string().min(3,"Name at least 3 chars").required(),
      category: yup.string().min(2,"Name at least 2 chars").required(),
      price: yup.number().required(),
    }),
    onSubmit: (values, {resetForm})=>{
      sendData(values);
      resetForm({values: ""});
    },
      
  });
  
  const notify = (msg) => toast.success(msg, {
    theme: "colored"
  })
  const notifyError = (msg) => toast.error(msg, {
    theme: "colored"
  })
  // Create a new user of data
  const sendData = async (values) => {

    const { name, price, category, } = values;

    let userId = JSON.parse(localStorage.getItem("user"))._id

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
    } else {
      notifyError("Error! Please try again.");
    }
  };

  return (
    <Container>
      <Row>
        <Hero title="Add A New Product" />
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

            <Form.Group className="mb-3">
              <Form.Label> Category </Form.Label>
              <Form.Control
                type="text"
                name="category"
                id="category"
                placeholder="Enter Category"
                value={formik.values.category}
                onChange={formik.handleChange}
              />
              { formik.touched.category && formik.errors.category  &&  (<span className="text-danger"> {formik.errors.category} </span>)}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> Price </Form.Label>
              <Form.Control
                type="text"
                name="price"
                id="price"
                placeholder="Price :250"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
              { formik.touched.price && formik.errors.price  &&  (<span className="text-danger"> {formik.errors.price} </span>)}

            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" size="md" type="submit">
                Save
              </Button>
            </div>

          </Form>
        </Col>
      </Row>
      <ToastContainer />

    </Container>
  );
}

export default Add;
