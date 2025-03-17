import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { LoginButton } from "../../../auth/LoginButton";
import { LogoutButton } from "../../../auth/LogoutButton";
import { SignupButton } from "../../../auth/SignupButton";

export const MobileNavBarButtons = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="mobile-nav-bar__buttons">
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
  );
};
