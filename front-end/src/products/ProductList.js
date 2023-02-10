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

const ProductList = () => {
  const [products, setProducts] = useState([]);
    const notify = (msg) => toast.success(msg, {
      theme: "colored"
    })
    const notifyEror = (msg) => toast.error(msg, {
      theme: "colored"
    })
    

    

  useEffect(() => {
    getProducts();
  }, []);

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

  

  return (
    <Container>
      <Row>
        <Hero title="Product List" />

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
