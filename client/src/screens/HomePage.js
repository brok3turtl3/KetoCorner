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
		<Container >

			<Row className='section p-2 text-center mt-5 m-auto'>
        <Col lg={8} className='p-2 m-auto'>
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
				<p>The idea has grown a little since then</p>
        </Col>
			</Row>

			<Row className='section mt-5 col-lg-7 text-center align-self-end'>
        <Col>
				<h1 className='text-success'>What you WILL find here..</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
					viverra nisl lacus, eget mollis lectus ultricies et. Sed blandit dolor
					velit, in ultrices leo maximus eget. Quisque semper mauris nunc,
					fermentum commodo arcu tristique et. Suspendisse id tellus nec tellus
					molestie malesuada. Nunc in laoreet nisi, vitae viverra mauris.
					Phasellus sit amet volutpat eros. Suspendisse non bibendum ante. Nam
					rutrum eleifend viverra. Nullam dictum sodales quam id posuere.
				</p>
        </Col>
			</Row>

			
      <Row className='mt-5'>


        <Col md={4} xl={3} className='d-flex align-items-center justify-content-center order-md-2 mx-auto'>
					<img src='./images/duck.jpg' alt='crazy doctor' className='img-fluid' style={{maxHeight: '300px', maxWidth: '100%'}}/>
				</Col>

				<Col md={8} className='my-auto text-center order-md-1'>
					<h1 className='text-success'>What you will NOT find here..</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
						viverra nisl lacus, eget mollis lectus ultricies et. Sed blandit
						dolor velit, in ultrices leo maximus eget. Quisque semper mauris
						nunc, fermentum commodo arcu tristique et. Suspendisse id tellus nec
						tellus molestie malesuada. Nunc in laoreet nisi, vitae viverra
						mauris. Phasellus sit amet volutpat eros. Suspendisse non bibendum
						ante. Nam rutrum eleifend viverra. Nullam dictum sodales quam id
						posuere.
					</p>
				</Col>
				
			</Row>
      

			<div className='section mt-5 text-center'>
				<h1 className='text-success'>We Want To Hear From You!</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
					viverra nisl lacus, eget mollis lectus ultricies et. Sed blandit dolor
					velit, in ultrices leo maximus eget. Quisque semper mauris nunc,
					fermentum commodo arcu tristique et. Suspendisse id tellus nec tellus
					molestie malesuada. Nunc in laoreet nisi, vitae viverra mauris.
					Phasellus sit amet volutpat eros. Suspendisse non bibendum ante. Nam
					rutrum eleifend viverra. Nullam dictum sodales quam id posuere.
				</p>
			</div>
		</Container>
	);
};

export default HomePage;
