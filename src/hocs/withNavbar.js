import React from "react";
import Navbar from "../components/Navbar/Navbar";

export default function withNavbar(Component) {
  function MyNav() {
    return (
      <>
        <div style={{ display: "flex" }}>
          <Navbar />
          <div style={componentStyle}>
            <Component />
          </div>
        </div>
      </>
    );
  }
  return MyNav;
}

const componentStyle = {
  backgroundColor: "var(--bgColor)",
  flexGrow: 1,
  padding: "20px",
};
