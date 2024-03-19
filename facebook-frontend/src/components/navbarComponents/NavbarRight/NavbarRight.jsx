import Menu from "../LittleComps/Menu/Menu";
import Notifications from "../LittleComps/Notifications/Notifications";
import Messenger from "../LittleComps/Messenger/Messenger";
import Account from "../LittleComps/Account/Account";

const NavbarRight = () => {
  return (
    <div className="right-main-navbar">
      <Menu />
      <Messenger />
      <Notifications />
      <Account />
    </div>
  );
};

export default NavbarRight;
