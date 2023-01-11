import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Message';

import {
	listRecipes,
  createRecipe
} from '../actions/recipeActions';

import { RECIPE_CREATE_RESET } from '../constants/recipeConstants';

const RecipeListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const recipeList = useSelector((state) => state.recipeList);
	const { loading, error, recipes } = recipeList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

  const recipeCreate = useSelector((state) => state.recipeCreate);
  const { loading:loadingCreate, error: errorCreate, success: successCreate, recipe: createdRecipe} = recipeCreate

	// const productDelete = useSelector((state) => state.productDelete);
	// const {
	// 	loading: loadingDelete,
	// 	error: errorDelete,
	// 	success: successDelete,
	// } = productDelete;
	

  useEffect(() => {
    dispatch({type: RECIPE_CREATE_RESET})

    if (!userInfo.isAdmin) {
			navigate('/login');
		}

    if(successCreate){
      navigate(`/admin/recipe/${createdRecipe._id}/edit`)
    }

    dispatch(listRecipes())
  },[dispatch, userInfo, successCreate, navigate, createdRecipe])

	const deleteHandler = (id) => {
		// if (window.confirm('Are you sure?')) {
		// 	dispatch(deleteProduct(id));
		// }
    console.log('TEST')
	};

	const createRecipeHandler = () => {
		dispatch(createRecipe())
	};

	return (
		<>
			<Row className='align-tems-center'>
				<Col>
					<h1>Recipes</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createRecipeHandler}>
						<i className='fas fa-plus'></i> Create Recipe
					</Button>
				</Col>
			</Row>
			{/* {loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>} */}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>TYPE</th>
							<th>USER</th>
							<th>BRAND</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{recipes.map((recipe) => (
							<tr key={recipe._id}>
								<td>{recipe._id}</td>
								<td>{recipe.name}</td>

								<td>{recipe.type}</td>

								<td>{recipe.user}</td>

								<td>{recipe.brand}</td>
								<td>
									<LinkContainer to={`/admin/recipe/${recipe._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button
										variant='red'
										className='btn-sm'
										onClick={() => deleteHandler(recipe._id)}
									>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default RecipeListScreen;