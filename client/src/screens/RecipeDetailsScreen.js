import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Form, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import {
	listRecipeDetails,
	createRecipeReview,
} from '../actions/recipeActions';
import { RECIPE_CREATE_REVIEW_RESET } from '../constants/recipeConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';

const RecipeDetailsScreen = () => {
	

	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const recipeDetails = useSelector((state) => state.recipeDetails);
	const { loading, error, recipe } = recipeDetails;
	const recipeCreateReview = useSelector((state) => state.recipeCreateReview);
	const { success: successCreateReview, error: errorCreateReview } =
		recipeCreateReview;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const dispatch = useDispatch();

	let { id } = useParams();
	useEffect(() => {

		if(successCreateReview){
			alert('Review Submitted.')
			setRating(0)
			setComment('')
			dispatch({type: RECIPE_CREATE_REVIEW_RESET})
		}
		dispatch(listRecipeDetails(id));
	}, [dispatch, id, successCreateReview]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createRecipeReview(id, { rating, comment }));
	};

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
								{recipe.reviews.length === 0 ? (
									<Message>No reviews yet</Message>
								) : (
									<ListGroup.Item>
										<Rating
											value={recipe.rating}
											text={` ${recipe.reviews.length} ratings`}
										></Rating>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									Description: {recipe.description}
								</ListGroup.Item>
								<ListGroup.Item>
									Total Cals / Serv: {recipe.totalCals} Fat: {recipe.fat}{' '}
									Protein: {recipe.protein} Net Carbs: {recipe.carbs}
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

					<ListGroup className='mt-4' id='reviewForm'>
						<ListGroup.Item>
							<h2>Leave A Review!</h2>
							{errorCreateReview && (
								<Message variant='danger'>{errorCreateReview}</Message>
							)}
						</ListGroup.Item>
						{userInfo ? (
							<Form onSubmit={submitHandler}>
								<Form.Group controlId='rating'>
									<Form.Label>Rating</Form.Label>
									<Form.Control
										as='select'
										value={rating}
										onChange={(e) => setRating(e.target.value)}
									>
										<option value=''>Select...</option>
										<option value='1'>1 - Poor</option>
										<option value='2'>2 - Fair</option>
										<option value='3'>3 - Good</option>
										<option value='4'>4 - Very Good</option>
										<option value='5'>5 - Excellent</option>
									</Form.Control>
								</Form.Group>
								<Form.Group controlId='comment'>
									<Form.Label>Review</Form.Label>
									<Form.Control
										as='textarea'
										row='3'
										value={comment}
										onChange={(e) => setComment(e.target.value)}
									></Form.Control>
								</Form.Group>
								<Button type='submit' variant='primary'>
									Submit
								</Button>
							</Form>
						) : (
							<Message>
								{' '}
								Please <Link to='/login'>sign in</Link> to write a review{' '}
							</Message>
						)}
					</ListGroup>

					{recipe.reviews.length > 0 ? (
						<ListGroup className='mt-4'>
							<ListGroup.Item>
								<h2>Reviews</h2>
							</ListGroup.Item>
							{recipe.reviews.map((review, index) => (
								<ListGroup.Item key={review._id}>
									<strong>{review.name}</strong>
									<Rating value={review.rating}></Rating>
									<p>{review.createdAt.substring(0, 10)}</p>
									<p>{review.comment}</p>
								</ListGroup.Item>
							))}
						</ListGroup>
					) : (
						<Message>No reviews yet</Message>
					)}
				</>
			)}
		</>
	);
};

export default RecipeDetailsScreen;
