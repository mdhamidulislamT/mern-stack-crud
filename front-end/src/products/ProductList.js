import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Hero from "../components/Hero";
import ProductTable from "./ProductTable";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import Form from "react-bootstrap/Form";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')


    const notify = (msg) => toast.success(msg, {
      theme: "colored"
    })
    const notifyEror = (msg) => toast.error(msg, {
      theme: "colored"
    })

    
  useEffect(() => {
      getProducts();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Send fetch request here
      searchProducts(searchTerm)
    }, 2000)

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm])


  const getProducts = async () => {
    let result = await fetch("http://localhost:3003/products");

    result = await result.json();
    setProducts(result.data.products);
  };

  // Delete a Product
  const deleteProduct = async (id = 99) => {

    const response = await fetch(`http://localhost:3003/products/${id}`, {
      method: "DELETE",

    }).then(async (response) => {
      if (response.status == 200) {
        getProducts();
        notify("Success! Product deleted");
      } else {
        notifyEror("Error! Please try again.");
      }
    });
  };

  // Search Products
  const searchProducts = async (searchTerm)=>{
    //let key = event.target.value;
    let key = searchTerm;

    if (key) {
      let result = await fetch(`http://localhost:3003/search/${key}`);
      result = await result.json();
      
      if (result) {
        setProducts(result.data);
      }else{
        notifyEror("Error! Please try again.");
      }

    }else{
      getProducts();
    }

  }

  return (
    <Container>
      <Row>
        <Hero title="Product List" />

        <Col md={6} className="mt-3">
            <Form.Group className="mb-3" controlId="searchProduct">
            <Form.Control type="text" placeholder="Search Your Products..." onChange={(e) => setSearchTerm(e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={{ span: 2, offset: 4 }} className="mt-3">
        <Button variant="success" onClick={getProducts}>Refresh</Button>
        </Col>

        <Col md={12}>
          {/* <ProductTable products={products} /> */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

                  {
                      products ?
                      
                      Object.entries(products).map(([key, prodduct])=>(
                      
                          <tr key={key}>
                              <td>{(parseInt(key)+1)}</td>
                              <td>{prodduct.name}</td>
                              <td>{prodduct.category}</td>
                              <td>{prodduct.price}</td>
                              <td>
                                  <Link  to={"/edit/"+prodduct._id}>  Edit </Link>
                                <Button variant="danger"  onClick={() => deleteProduct(prodduct._id)}>
                                  Delete
                                </Button>
                              </td>
                          </tr>
                      
                      ))
                      : 
                      <tr>
                          <td colSpan={4}><h1> Data Loading... </h1></td>
                      </tr>
                  }
                      

            </tbody>
          </Table>
        </Col>
      </Row>
      <ToastContainer />

    </Container>
  );
};

export default ProductList;
