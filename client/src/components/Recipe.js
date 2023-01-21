import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap';
import Rating from './Rating'



const Recipe = ({ recipe }) => {

	

	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/recipes/${recipe._id}`}>
				<Card.Img src={recipe.image}  variant='top' />
			</Link>

			<Card.Body>
				<Link to={`/recipes/${recipe._id}`}>
					<Card.Title as='div' src={recipe.name}>
						<strong>{recipe.name}</strong>
					</Card.Title>
				</Link>
        <Card.Text as='div'>
          <Rating value={recipe.rating} text={`${recipe.numReviews} reviews`}/>
        </Card.Text>
        <Card.Text as='h4' className='mt-2'>
          Serves {recipe.servings} - {recipe.totalCals} Cals
        </Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Recipe;