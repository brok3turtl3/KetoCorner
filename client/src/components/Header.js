import React, {Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {

	const dispatch = useDispatch()

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo} = userLogin

	const logoutHandler= () => {
		dispatch(logout())
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
						<LinkContainer to='/recipes'>
								<Nav.Link>
									<i className='fas fa-shopping-cart'></i> Recipes
								</Nav.Link>
							</LinkContainer>
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
									<Nav.Link>Profile</Nav.Link>
								</LinkContainer>
								<Nav.Link onClick={logoutHandler} className=''>Logout</Nav.Link>
							</NavDropdown>) : <Fragment><LinkContainer to='/login'>
								<Nav.Link>
									<i className='fas fa-user'></i> Sign In
								</Nav.Link>
								
							</LinkContainer>
							<LinkContainer to='/register'>
							<Nav.Link>
								<i className='fas fa-user'></i> Register
							</Nav.Link>
							
						</LinkContainer></Fragment>
							 }
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
		</header>
	);
};

export default Header;
