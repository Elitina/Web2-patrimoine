import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './../css/navigation.css';

function NavigationBar() {
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Navbar.Brand as={Link} to="/patrimoine">Patrimoine-Economique</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navbar-nav">
          <Nav.Link as={Link} to="/patrimoine">Sum of Possessions</Nav.Link>
          <Nav.Link as={Link} to="/possession">Possessions list</Nav.Link>
          <Nav.Link as={Link} to="/possession/valuesByDateRange">Patrimony Graph</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
