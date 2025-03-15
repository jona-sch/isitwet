import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { MobileNavBarTab } from "./MobileNavBarTab";

export const MobileNavBarTabs = ({ handleClick }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="mobile-nav-bar__tabs">
      <MobileNavBarTab
        path="/home"
        label="Home"
        handleClick={handleClick}
      />
      {isAuthenticated && (
        <>
          <MobileNavBarTab
            path="/locations"
            label="Locations"
            handleClick={handleClick}
          />
          <MobileNavBarTab
            path="/settings"
            label="Settings"
            handleClick={handleClick}
          />
        </>
      )}
    </div>
  );
};
