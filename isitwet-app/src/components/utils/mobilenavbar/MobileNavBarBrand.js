import React from "react";
import { NavLink } from "react-router-dom";
import isItWetBrand from "../../icons/brand.svg";

export const MobileNavBarBrand = ({ handleClick }) => {
  return (
    <div onClick={handleClick} className="mobile-nav-bar__brand">
      <NavLink to="/">
          <img
            className="nav-bar__logo"
            src={isItWetBrand}
            alt="IsItWet logo"
            width="22"
            height="25"
          />
      </NavLink>
    </div>
  );
};
