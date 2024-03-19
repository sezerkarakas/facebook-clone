import NavbarLeft from "../navbarComponents/NavbarLeft/NavbarLeft";
import NavbarMid from "../navbarComponents/NavbarMid/NavbarMid";
import NavbarRight from "../navbarComponents/NavbarRight/NavbarRight";

const Navbar = () => {
  return (
    <nav>
      <div className="main-navbar">
        <NavbarLeft />
        <NavbarMid />
        <NavbarRight />
      </div>
    </nav>
  );
};

export default Navbar;
