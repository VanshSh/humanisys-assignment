import React, { memo } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { useQuery } from '../context/QueryContext'

const Header = memo(() => {
  const { isAuthenticated, logout } = useQuery()
  const location = useLocation()

  return (
    <Navbar
      bg='dark'
      variant='dark'
      expand='lg'
      className='sticky-top w-100 mb-3'
    >
      <Navbar.Brand as={Link} to='/'>
        Humanisys Labs
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link as={Link} to='/' active={location.pathname === '/'}>
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            to='/dashboard'
            active={location.pathname === '/dashboard'}
          >
            Dashboard
          </Nav.Link>
        </Nav>
        <Nav>
          {isAuthenticated ? (
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          ) : (
            <Nav.Link as={Link} to='/dashboard'>
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
})

export default Header
