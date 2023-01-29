import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listRecipeDetails, updateRecipe } from '../actions/recipeActions';
import FormContainer from '../components/FormContainer';
import { RECIPE_UPDATE_RESET } from '../constants/recipeConstants';
import SimpleFileUpload from 'react-simple-file-upload';

const RecipeEditScreen = () => {
	const [name, setName] = useState('');
	const [type, setType] = useState('');

	const [image, setImage] = useState('');
	const [description, setDescription] = useState('');
	const [totalTime, setTotalTime] = useState(0);
	const [prepTime, setPrepTime] = useState(0);
	const [cookTime, setCookTime] = useState(0);
	const [totalCals, setTotalCals] = useState(0);
	const [fat, setFat] = useState(0);
	const [protein, setProtein] = useState(0);
	const [carbs, setCarbs] = useState(0);
	const [servings, setServings] = useState(0);
	const [directions, setDirections] = useState([]);
	const [ingredients, setIngredients] = useState([]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	let { id } = useParams();

	const recipeDetails = useSelector((state) => state.recipeDetails);
	const { loading, error, recipe } = recipeDetails;

	const recipeUpdate = useSelector((state) => state.recipeUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = recipeUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: RECIPE_UPDATE_RESET });
			navigate('/admin/recipeList');
		} else {
			if (!recipe.name || recipe._id !== id) {
				dispatch(listRecipeDetails(id));
			} else {
				setName(recipe.name);
				setType(recipe.type);
				setImage(recipe.image);
				setDescription(recipe.description);
				setTotalTime(recipe.totalTime);
				setPrepTime(recipe.prepTime);
				setCookTime(recipe.cookTime);
				setTotalCals(recipe.totalCals);
				setFat(recipe.fat);
				setProtein(recipe.protein);
				setCarbs(recipe.carbs);
				setServings(recipe.servings);
				setDirections(recipe.directions);
				setIngredients(recipe.ingredients);
			}
		}
	}, [recipe, dispatch, navigate, successUpdate, id]);

	const submitHandler = (e) => {
		console.log('FIRED!');
		e.preventDefault();
		dispatch(
			updateRecipe({
				_id: id,
				name,
				type,
				image,

				description,
				totalTime,
				cookTime,
				prepTime,
				totalCals,
				fat,
				protein,
				carbs,
				servings,
				directions,
				ingredients,
			})
		);
	};

	const updateDirections = (index) => (e) => {
		let newArr = [...directions];
		newArr[index] = e.target.value;
		setDirections(newArr);
	};

	const addDirection = () => {
		let newArr = [...directions];
		newArr.push('New direction');
		setDirections(newArr);
	};

	const updateIngredients = (index) => (e) => {
		let newArr = [...ingredients];
		newArr[index] = e.target.value;
		setIngredients(newArr);
	};

	const addIngredient = () => {
		let newArr = [...ingredients];
		newArr.push('New ingredient');
		setIngredients(newArr);
		console.log(process.env.SIMPLE_FILE_UPLOAD_KEY);
	};

	function handleFile(url) {
		setImage(url);
	}

	return (
		<>
			<Link to='/admin/recipeList' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Recipe</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='type'>
							<Form.Label>Type</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter type'
								value={type}
								onChange={(e) => setType(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								rows={4}
								placeholder='Enter description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='image'>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter image URL'
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
						</Form.Group>
						<div>
							<SimpleFileUpload
								apiKey='5af8bfef1fbeedd25af3de7ae9e6b36a'
								onSuccess={handleFile}
								preview={false}
							/>
							<p>Upload a pic</p>
							<p>Click to browse or drag and drop</p>
							<p>Max of 4 pics</p>
						</div>

						<Row>
							<Col>
								<Form.Group controlId='totalTime'>
									<Form.Label>Total Time</Form.Label>
									<Form.Control
										type='number'
										placeholder='Enter total time'
										value={totalTime}
										onChange={(e) => setTotalTime(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>

							<Col>
								<Form.Group controlId='prepTime'>
									<Form.Label>Prep Time</Form.Label>
									<Form.Control
										type='number'
										placeholder='Enter prep time'
										value={prepTime}
										onChange={(e) => setPrepTime(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>

							<Col>
								<Form.Group controlId='cookTime'>
									<Form.Label>Cook Time</Form.Label>
									<Form.Control
										type='number'
										placeholder='Enter cook time'
										value={cookTime}
										onChange={(e) => setCookTime(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId='servings'>
									<Form.Label>Servings</Form.Label>
									<Form.Control
										type='text'
										placeholder='Servings'
										value={servings}
										onChange={(e) => setServings(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col>
								<Form.Group controlId='totalCals'>
									<Form.Label>Total Cals</Form.Label>
									<Form.Control
										type='number'
										value={totalCals}
										onChange={(e) => setTotalCals(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>

							<Col>
								<Form.Group controlId='fat'>
									<Form.Label>Fat</Form.Label>
									<Form.Control
										type='number'
										value={fat}
										onChange={(e) => setFat(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>

							<Col>
								<Form.Group controlId='protein'>
									<Form.Label>Protein</Form.Label>
									<Form.Control
										type='number'
										value={protein}
										onChange={(e) => setProtein(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId='carbs'>
									<Form.Label>Carbs</Form.Label>
									<Form.Control
										type='number'
										value={carbs}
										onChange={(e) => setCarbs(e.target.value)}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>

						{directions.map((direction, index) => (
							<Form.Group controlId='directions' key={index}>
								<Form.Label>Direction {index + 1}</Form.Label>
								<Form.Control
									as='textarea'
									rows={8}
									placeholder='Ingredients'
									value={directions[index]}
									onChange={updateDirections(index)}
								></Form.Control>
							</Form.Group>
						))}
						<Button type='button' onClick={addDirection} variant='primary'>
							Add Direction
						</Button>

						{ingredients.map((ingredient, index) => (
							<Form.Group controlId='ingredients' key={index}>
								<Form.Label>Ingredient {index + 1}</Form.Label>
								<Form.Control
									as='textarea'
									rows={8}
									placeholder='Ingredients'
									value={ingredients[index]}
									onChange={updateIngredients(index)}
								></Form.Control>
							</Form.Group>
						))}
						<Button type='button' onClick={addIngredient} variant='primary'>
							Add Ingredient
						</Button>
						{/* (e) => setIngredients(e.target.value) */}

						<Row>
							<Button type='submit' variant='primary'>
								Update
							</Button>
						</Row>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default RecipeEditScreen;
