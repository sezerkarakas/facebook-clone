import { Link } from "react-router-dom";
import { useState } from "react";

const routes = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/marketplace",
    name: "Marketplace",
  },
  {
    path: "/groups",
    name: "Groups",
  },
  {
    path: "/gaming",
    name: "Gaming",
  },
];

const NavbarMid = () => {
  const [active, setActive] = useState("/home");

  return (
    <div className="flex flex-row w-1/3  bg-transparent text-white gap-2">
      {routes.map((route, idx) => {
        return (
          <Link
            key={idx}
            className={`mid-navbar ${
              active === route.path ? "mid-navbar-active" : ""
            }`}
            onClick={() => setActive(route.path)}
            to={route.path}
          >
            {route.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavbarMid;
