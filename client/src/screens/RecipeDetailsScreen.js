import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { listRecipeDetails } from '../actions/recipeActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const RecipeDetailsScreen = () => {
	const navigate = useNavigate();

	const recipeDetails = useSelector((state) => state.recipeDetails);

	const { loading, error, recipe } = recipeDetails;

	const dispatch = useDispatch();

	let { id } = useParams();
	useEffect(() => {
		dispatch(listRecipeDetails(id));
	}, [dispatch, id]);

	return (
		<>
			<Link className='btn btn-light my-3' to='/recipes'>
				Go Back
			</Link>

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row className='justify-content-center'>
						<Col md={6} className='mb-4'>
							<Image src={recipe.image} alt={recipe.name} fluid rounded></Image>
						</Col>
						<Col md={6}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{recipe.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={recipe.rating}
										text={` ${recipe.numReviews} ratings`}
									></Rating>
								</ListGroup.Item>

								<ListGroup.Item>
									Description: {recipe.description}
								</ListGroup.Item>
								<ListGroup.Item>
									Total Cals / Serv: {recipe.totalCals} Fat: {recipe.fat} Protein: {recipe.protein} Net Carbs: {recipe.carbs} 
								</ListGroup.Item>
                <ListGroup.Item>
                  Prep Time: {recipe.prepTime} Cook Time: {recipe.cookTime}
                </ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>

          <ListGroup className='mt-4'>
						<ListGroup.Item>
							<h2>Ingredients</h2>
						</ListGroup.Item>
						{recipe.ingredients
							? recipe.ingredients.map((ingredient, index) => (
									<ListGroup.Item key={index}>
										{index + 1}. {ingredient}
									</ListGroup.Item>
							  ))
							: null}
					</ListGroup>

					<ListGroup className='mt-4'>
						<ListGroup.Item>
							<h2>Directions</h2>
						</ListGroup.Item>
						{recipe.directions
							? recipe.directions.map((direction, index) => (
									<ListGroup.Item key={index}>
										{index + 1}. {direction}
									</ListGroup.Item>
							  ))
							: null}
					</ListGroup>
				</>
			)}
		</>
	);
};

export default RecipeDetailsScreen;
