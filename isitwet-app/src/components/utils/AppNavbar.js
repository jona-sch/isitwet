import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import { LoginButton } from "../../auth/LoginButton";
import { LogoutButton } from "../../auth/LogoutButton";
import { SignupButton } from "../../auth/SignupButton";
import { NavBarBrand } from "./navbar/NavBarBrand";
import { NavBarTabs } from "./navbar/NavBarTabs";


export const AppNavbar = () => {
    const { isAuthenticated } = useAuth0();
    console.log(isAuthenticated);

    return (
        <div className="nav-bar__container">
          <nav className="nav-bar">
            <NavBarBrand />
            <NavBarTabs />
            <div className="nav-bar__buttons">
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
          </nav>
        </div>
    );
}
