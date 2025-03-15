import React from "react";
import { AppNavbar } from "./AppNavbar";
import { PageFooter } from "./PageFooter";
import { MobileNavBar } from "./mobilenavbar/MobileNavbar";

export const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <AppNavbar />
      <MobileNavBar />
      <div className="page-layout__content">{children}</div>
      <PageFooter />
    </div>
  );
};
