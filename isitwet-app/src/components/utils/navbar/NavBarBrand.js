import React from "react";
import { NavLink } from "react-router-dom";

import isItWetBrand from "../../icons/brand.svg";

export const NavBarBrand = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/" exact>
        <img
          className="nav-bar__logo"
          src={isItWetBrand}
          alt="IsItWet logo"
          width="45"
          height="50"
        />
      </NavLink>
    </div>
  );
};
