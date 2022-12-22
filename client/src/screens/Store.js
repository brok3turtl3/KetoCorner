import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader.js';
import Message from '../components/Message.js'

const Store = () => {
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);
	return (
		<>
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					{products.map((product, index) => (
						<Col key={index} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default Store;
