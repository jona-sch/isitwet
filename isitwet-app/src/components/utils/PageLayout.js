import React from "react";
import { AppNavbar } from "./AppNavbar";
import { PageFooter } from "./PageFooter";

export const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <AppNavbar />
      <div className="page-layout__content">{children}</div>
      <PageFooter />
    </div>
  );
};
