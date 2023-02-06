import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Hero from "../components/Hero";
import ProductTable from "./ProductTable";

const ProductList = () => {
      const [products, setProducts] = useState([]);

      useEffect(()=>{
        getProducts();

      },[]);

      const getProducts = async () => {
        let result = await fetch("http://localhost:3003/products");
    
        result = await result.json();
        setProducts(result.data.products);
      };


    return (
      <Container>
        <Row>
        <Hero title="Product List" />

          <Col md={12}>
            <ProductTable  products={products} />
          </Col>
        </Row>
      </Container>
    );
};

export default ProductList;
