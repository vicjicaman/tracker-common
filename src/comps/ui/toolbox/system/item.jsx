import React from "react";

export const Header = (props) => {
  const {route, label, link, children} = props;

//ml-2
  return (<div className="">

    {
      route
        ? link
        : label
    }

    {children}
  </div>);
}
