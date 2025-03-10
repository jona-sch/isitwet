import React from "react";

import loadingSymbol from "./icons/loader-symbol.svg";

export const PageLoader = () => {
  return (
    <div className="loader">
      <img src={loadingSymbol} alt="Loading..." width="20rem" height="20rem" />
    </div>
  );
};
