import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown, NavItem } from 'react-bootstrap';

const Header = () => {

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo} = userLogin

	const logoutHandler= () => {
		console.log('Logout!')
	}
	return (
		<header>
			<Navbar bg='dark' variant='dark' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>KetoCorner</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
						<LinkContainer to='/store'>
								<Nav.Link>
									<i className='fas fa-shopping-cart'></i> Store
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/cart'>
								<Nav.Link>
									<i className='fas fa-shopping-cart'></i> Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (<NavDropdown title={userInfo.name} id='username'>
								<LinkContainer to='/profile'>
									<NavItem>Profile</NavItem>
								</LinkContainer>
								<NavItem onClick={logoutHandler} className=''>Logout</NavItem>
							</NavDropdown>) : <LinkContainer to='/login'>
								<Nav.Link>
									<i className='fas fa-user'></i> Sign In
								</Nav.Link>
							</LinkContainer> }
							
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
