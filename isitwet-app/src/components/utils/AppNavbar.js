import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';

import ToggleButton from './ToggleButton';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            </Navbar>
        );
    }
}
