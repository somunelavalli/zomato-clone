import React from "react";
import Header from "./Header";

function Layout(props) {
  return (
    <div>
      <Header />
      <div className="container mx-auto lg:px-20">{props.children}</div>
    </div>
  );
}

export default Layout;
