import NavbarLeft from "../navbarComponents/NavbarLeft/NavbarLeft";
import NavbarMid from "../navbarComponents/NavbarMid/NavbarMid";
import NavbarRight from "../navbarComponents/NavbarRight/NavbarRight";

const Navbar = () => {
  return (
    <nav className="main-navbar">
        <NavbarLeft />
        <NavbarMid />
        <NavbarRight />
    </nav>
  );
};

export default Navbar;
