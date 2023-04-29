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
				<Container className='d-flex flex-wrap'>
					<div>
					<LinkContainer to='/' className='fs-1 col-lg-6 '>
						<Navbar.Brand className='fs-1 text-success'>KetoCorner</Navbar.Brand>
						
					</LinkContainer>
					<p className='ps-5 text-success'>Don't blame the bacon for what the bread did!</p>
					</div>

					
					<Navbar.Collapse id='basic-navbar-nav' className='col-lg-6 d-flex flex-wrap justify-content-evenly'>
						<Nav className='d-flex flex-wrap'>
						<LinkContainer to='/recipes'>
								<Nav.Link className='px-3'>
									<i className='fas fa-shopping-cart'></i> Recipes
								</Nav.Link>
							</LinkContainer>
						<LinkContainer to='/store'>
								<Nav.Link className='px-3'>
									<i className='fas fa-shopping-cart'></i> Store
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/cart'>
								<Nav.Link className='px-3'>
									<i className='fas fa-shopping-cart'></i> Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (<NavDropdown title={userInfo.name} id='username'>
								<LinkContainer to='/profile'>
									<Nav.Link className='px-3'>Profile</Nav.Link>
								</LinkContainer>
								<Nav.Link onClick={logoutHandler} className='px-3'>Logout</Nav.Link>
							</NavDropdown>) : <Fragment><LinkContainer to='/login'>
								<Nav.Link className='px-3'>
									<i className='fas fa-user'></i> Sign In
								</Nav.Link>
								
							</LinkContainer>
							<LinkContainer to='/register'>
							<Nav.Link className='px-3'>
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