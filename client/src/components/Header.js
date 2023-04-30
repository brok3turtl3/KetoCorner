import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
	const dispatch = useDispatch();

	const [expanded, setExpanded] = useState(false);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	const toggleExpanded = () => {
		setExpanded(!expanded);
	};

	return (
		<Navbar bg='dark' variant='dark' expand="lg">
			<Container>
				<LinkContainer to='/' >
					<Navbar.Brand className='text-success'>
						<h1>KetoCorner</h1>
						<p className="d-none d-sm-block">Don't blame the bacon for what the bread did!</p>
					</Navbar.Brand>
				</LinkContainer>

				<Navbar.Toggle aria-controls='navbar' onClick={toggleExpanded} />
				<Navbar.Collapse id='navbar' expanded={expanded} >
					<Nav className='ml-auto'>
						<LinkContainer to='/recipes' >
							<Nav.Link className='px-3' >
								<i className='fas fa-shopping-cart'></i> Recipes
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/store'>
							<Nav.Link className='px-3' >
								<i className='fas fa-shopping-cart'></i> Store
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/cart'>
							<Nav.Link className='px-3'>
								<i className='fas fa-shopping-cart'></i> Cart
							</Nav.Link>
						</LinkContainer>
						{userInfo ? (
							<NavDropdown title={userInfo.name} id='username'>
								<LinkContainer to='/profile'>
									<Nav.Link className='px-3'>Profile</Nav.Link>
								</LinkContainer>
								<Nav.Link onClick={logoutHandler} className='px-3'>
									Logout
								</Nav.Link>
							</NavDropdown>
						) : (
							<Fragment>
								<LinkContainer to='/login'>
									<Nav.Link className='px-3'>
										<i className='fas fa-user'></i> Sign In
									</Nav.Link>
								</LinkContainer>
								<LinkContainer to='/register'>
									<Nav.Link className='px-3'>
										<i className='fas fa-user'></i> Register
									</Nav.Link>
								</LinkContainer>
							</Fragment>
						)}
						{userInfo && userInfo.isAdmin && (
							<NavDropdown title='Admin' id='adminmenu'>
								<LinkContainer to='/admin/userList'>
									<NavDropdown.Item>Users</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/admin/productList'>
									<NavDropdown.Item>Products</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/admin/orderList'>
									<NavDropdown.Item>Orders</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/admin/recipeList'>
									<NavDropdown.Item>Recipes</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
