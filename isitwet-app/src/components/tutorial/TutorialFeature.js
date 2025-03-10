import React from "react";


import addUserSymbol from "../icons/add-symbol.svg"
import locationSymbol from "../icons/location-symbol.svg"
import weatherSymbol from "../icons/weather-symbol.svg"
import climbSymbol from "../map/icons/climber-icon.svg"


export const TutorialFeature = ({ title, description, icon }) => {

  let iconSvg = addUserSymbol;
  if (icon === "add-symbol") {
    iconSvg = addUserSymbol;
  } else if (icon === "location-symbol") {
    iconSvg = locationSymbol;
  } else if (icon === "weather-symbol") {
    iconSvg = weatherSymbol;
  } else if (icon === "climb-symbol") {
    iconSvg = climbSymbol;
  }

  return (
    <div
      className="isitwet-feature"
    >
      <h3 className="isitwet-feature__headline">
        <img
          className="isitwet-feature__icon"
          src={iconSvg}
          alt="external link icon"
          width="50rem"
          height="50rem"
        />
        {title}
      </h3>
      <p className="isitwet-feature__description">{description}</p>
    </div>
  );
};
