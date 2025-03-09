import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import { LoginButton } from "../../auth/LoginButton";
import { LogoutButton } from "../../auth/LogoutButton";
import { SignupButton } from "../../auth/SignupButton";


export const AppNavbar = () => {
    const { isAuthenticated } = useAuth0();
    console.log(isAuthenticated);

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            <div>
                {!isAuthenticated && (
                    <>
                    <SignupButton />
                    <LoginButton />
                    </>
                )}
                {isAuthenticated && (
                    <>
                    <LogoutButton />
                    </>
                )}
            </div>
        </Navbar>
    );
}
