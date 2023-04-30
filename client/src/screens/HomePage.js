import React from 'react';
import {
	Button,
	Container,
	Card,
	Row,
	Col,
	ListGroup,
	Image,
	ListGroupItem,
} from 'react-bootstrap';

const HomePage = () => {
	return (
		<Container>
			<Row className='section p-2 text-center mt-5 m-auto'>
				<Col lg={9} className='p-2 m-auto'>
					<h1 className='text-success '>Welcome to KetoCorner!</h1>
					<p>
						Do you ever find yourself wanting to make a meal that you have made
						before, that you know you realyy enjoyed, but cannot remember the
						exact ingredients or process? Well, that was happening to us all the
						time!
					</p>
					<p>
						The idea for this site started when my wife and I wanted to have a
						place where we could store all our recipes that we enjoyed in one
						spot. We wanted to have a place where we could see all our favorite
						meals at a glance and then pull up the recipes quickly and easily.
					</p>
					<p>
						The idea has grown a little since then and we have lots of ideas for
						improvements.
					</p>
				</Col>
			</Row>

			<Row className='mt-5'>
				<Col
					md={4}
					xl={3}
					className='d-flex align-items-center justify-content-center order-md-1 mx-auto mb-3'
				>
					<img
						src='./images/chef.jpg'
						alt='chef'
						className='img-fluid'
						style={{ maxHeight: '300px', maxWidth: '100%' }}
					/>
				</Col>
				<Col md={8} className='my-auto text-center order-md-2'>
					<h1 className='text-success'>What you WILL find here..</h1>
					<p>
						Great food! Every recipe that we put on this site has been made by
						us and tried by us. We have tried to keep most the recipes very
						simple to make with common ingredients. If we try a recipe out and
						it is not something we would make again then it does not go on the
						site. We have lot's of ideas for expanding the what the site offers
						to it's visitors but for now we are focusing on building a large
						database of recipes.
					</p>
					<p> Have something you would like us to try? Send in the recipe!</p>
				</Col>
			</Row>

			<Row className='mt-5'>
				<Col
					md={4}
					xl={3}
					className='d-flex align-items-center justify-content-center order-md-2 mx-auto mb-3'
				>
					<img
						src='./images/duck.jpg'
						alt='crazy doctor'
						className='img-fluid'
						style={{ maxHeight: '300px', maxWidth: '100%' }}
					/>
				</Col>

				<Col md={8} className='my-auto text-center order-md-1'>
					<h1 className='text-success'>What you will NOT find here..</h1>
					<p>
						Professional medical or dietary advice. We are not licenced,
						certified or in any way anything other than home cooks sharing our
						personal experience with the Keto lifestyle. Switching to this type
						of diet can be stressful and difficult. Everyone reacts differently
						and there can be side effects. We encourage everyone to do their own
						research.
					</p>
				</Col>
			</Row>

			<Row className='section p-2 text-center mt-5 m-auto'>
				<Col lg={9} className='p-2 m-auto'>
					<h1 className='text-success'>We Want To Hear From You!</h1>
					<p>
						If you try any of the recipes make sure to leave a review! Also,
						this is more or less a hobby for us and would love to hear any
						feedback you have. Whether it is about the recipes or just the
						website in general. Let us know what you think!
					</p>
				</Col>
			</Row>
		</Container>
	);
};

export default HomePage;
