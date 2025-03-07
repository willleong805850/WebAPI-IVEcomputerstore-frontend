import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    .navbar{
        background-color: #ADD8E6;
    }

    .navbar-brand, .navbar-nav .nav-link
{
    color: #000000;

    &:hover {
        color: white;
    }
}
`;

export const NavigationBar = () => (
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand href="/">IVE Computer Store</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/About">About us</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/Items">Items</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/Login">Login</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/Admin">Product Management</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/User">Account Management</Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    </Styles>
)