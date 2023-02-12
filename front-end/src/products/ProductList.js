import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Hero from "../components/Hero";
import ProductTable from "./ProductTable";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Pagination from 'react-bootstrap/Pagination';

const ProductList = () => {
  const [totalProduct, setTotalProduct] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const notify = (msg) =>
    toast.success(msg, {
      theme: "colored",
    });
  const notifyEror = (msg) =>
    toast.error(msg, {
      theme: "colored",
    });

  useEffect(() => {
    getProducts();
  }, [activePage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Send fetch request for Search
      searchProducts(searchTerm);
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Calculate total pages
  const totalPageCalculator = (total, limit) => {
    const pages = [];
    for (let x = 1; x <= parseInt(total) / limit; x++) {
      pages.push(x);
    }
    return pages;
  };

  const LIMIT = 5;
  const getProducts = async () => {
    
    let result = await fetch(`http://localhost:3003/products?page=${activePage}&size=${LIMIT}`);

    result = await result.json();
    setProducts(result.data.products);
    setTotalProduct(result.total.total);
  };

  // Delete a Product
  const deleteProduct = async (id = -999) => {
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
  const searchProducts = async (searchTerm) => {
    //let key = event.target.value;
    let key = searchTerm;

    if (key) {
      let result = await fetch(`http://localhost:3003/search/${key}`);
      result = await result.json();

      if (result) {
        setProducts(result.data);
      } else {
        notifyEror("Error! Please try again.");
      }
    } else {
      getProducts();
    }
  };

  return (
    <Container>
      <Row>
        <Hero title="Product List" />

        <Col md={6} className="mt-3">
          <Form.Group className="mb-3" controlId="searchProduct">
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Search Your Products..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={{ span: 2, offset: 4 }} className="mt-3">
          <Button variant="success" onClick={getProducts}>
            Refresh
          </Button>
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
                <th>Action {totalProduct}</th>
              </tr>
            </thead>
            <tbody>
              {products ? (
                Object.entries(products).map(([key, prodduct]) => (
                  <tr key={key}>
                    <td>{ activePage>1 ? (((activePage-1)*LIMIT)+parseInt(key)+1) : activePage+parseInt(key) }</td>
                    <td>{prodduct.name}</td>
                    <td>{prodduct.category}</td>
                    <td>{prodduct.price}</td>
                    <td>
                      <Link to={"/edit/" + prodduct._id}> Edit </Link>
                      <Button
                        variant="danger"
                        onClick={() => deleteProduct(prodduct._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <h1> Data Loading... </h1>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
        <Col md={12}>
          <Pagination>
            <Pagination.Item onClick={()=>setActivePage( activePage==1 ? 1 : (activePage-1) )}>Previous</Pagination.Item>
            {
                totalPageCalculator(totalProduct, LIMIT).map(pageNo =>
                  <Pagination.Item key={pageNo} onClick={()=>setActivePage(pageNo)}> {pageNo} </Pagination.Item>
                  )
              }
            <Pagination.Item  key="df" onClick={()=>setActivePage( activePage>=(totalProduct/LIMIT) ? activePage : (activePage+1))}>Next</Pagination.Item>
          </Pagination>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default ProductList;
