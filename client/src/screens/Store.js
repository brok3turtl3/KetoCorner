import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

import Product from '../components/Product'

const Store = () => {

  const [products, setProducts] = useState([])

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products')
    setProducts(data);
    } catch (error) {
      console.log(error.message)
    }
    
  }
  fetchProducts();
}, [])
  return (
    <>
    <h1>Latest Products</h1>
    <Row>
    {products.map((product, index) => (
      <Col key={index} sm={12} md={6} lg={4} xl={3}>
      <Product  product={product} />
      </Col>
    ))}
    </Row>
    </>
  )
}

export default Store