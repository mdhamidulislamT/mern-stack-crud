import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import Hero from "../components/Hero";
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Update = () => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const notifyError = (msg) => toast.error(msg, {
    theme: "colored"
  })
  const { id } = useParams();
  useEffect(() => {
    getProduct();
  }, []);

  // Create a new user of data
  let productData = 'nodata';
  const getProduct = async () => {

    if (id) {
      let result = await fetch(`http://localhost:3003/products/${id}`);
      productData = await result.json();
      //console.log(productData);
      formik.values.name = productData.data.name;
      formik.values.price = productData.data.price;
      formik.values.category = productData.data.category;
       setName(productData.data.name);
      setPrice(productData.data.price);
      setCategory(productData.data.category);

    }
  };

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

  // Update a new user of data
  const sendData = async (values) => {

    const { name, price, category, } = values;

    const response = await fetch(`http://localhost:3003/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      if (response.status == 200) {
        navigate('/');
      } else {
        notifyError("Error! Please try again.");
      }
    });
  };

  return (
    <Container>
      <Row>
        <Hero title="Update Product" />
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

export default Update;
