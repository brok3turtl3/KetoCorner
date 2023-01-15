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
import { listRecipeDetails, createRecipeReview } from '../actions/recipeActions';
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
								{ recipe.reviews.length === 0 ?(<Message>No reviews yet</Message>) : (
								<ListGroup.Item>
									<Rating
										value={recipe.rating}
										text={` ${recipe.reviews.length} ratings`}
									></Rating>
								</ListGroup.Item>) }

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

					{recipe.reviews.length > 0 ?(
					<ListGroup className='mt-4'>
						<ListGroup.Item>
							<h2>Reviews</h2>
						</ListGroup.Item>
						{ recipe.reviews.map((review, index) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating}></Rating>
										<p>{review.createdAt.substring(0,10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
							  ))}
					</ListGroup>) : (<Message>No reviews yet</Message>)}
				</>
			)}
		</>
	);
};

export default RecipeDetailsScreen;
