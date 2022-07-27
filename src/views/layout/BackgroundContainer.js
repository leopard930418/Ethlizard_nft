import React from "react";
import Header from "./header";
import Footer from "./footer";
import Loader from "./Loader";

export default function BackgroundContainer({ children = null, ...props }) {
  return (
    <div
      className={[
        "w-full",
        // "bg-background",
        // "bg-gradient-to-r from-gray-800 to-gray-900",
        "bg-center bg-no-repeat bg-cover bg-fixed",
        "relative",
        "flex flex-col items-stretch ",
      ].join(" ")}
    >
      <div className="z-50 w-full left-0 top-0 fixed bg-background bg-center bg-no-repeat bg-cover bg-fixed">
        <Header />
      </div>
      <div
        className={["w-full flex-grow pt-20"].join(" ")}
      >
        {children}
        <Footer />
      </div>

    </div>
  );
}
