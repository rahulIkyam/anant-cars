import React, { useRef, useState } from "react";
import { ShellBar, Avatar, Popover, List, ListItemStandard, Button } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import "@ui5/webcomponents/dist/Avatar.js";
import ikyamLogo from "../assets/ikyam-logo.png";
import { useNavigate } from "react-router-dom";

function AppBar({ toggleSidebar }) {

  const navigate = useNavigate();
  const avatarRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    setPopoverOpen(false);
    navigate("/login");
  };

  const handleProfileClick = () => {
    setPopoverOpen((prev) => !prev);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-20">
        <ShellBar
          startButton={<Button accessibleName="Menu" icon="menu2" tooltip="Menu" onClick={toggleSidebar} />}
          logo={ <img src={ikyamLogo} alt="logo" className="h-7 pl-5 cursor-pointer" />}
          onLogoClick={() => navigate("/dashboard")}
          className="!w-full pr-2 pl-2"
          profile={<Avatar ref={avatarRef} />}
          onProfileClick={handleProfileClick}
        />

        <Popover
          open={popoverOpen}
          opener={avatarRef.current}
          onAfterClose={() => setPopoverOpen(false)}
          placement="Bottom"
        >
          <List>
            <ListItemStandard
              icon="log"
              type="Active"
              onClick={handleLogout}
            >
              Logout
            </ListItemStandard>
            <ListItemStandard
              icon="settings"
              type="Active"
              onClick={() => console.log("Settings clicked")}
            >
              Settings
            </ListItemStandard>
          </List>
        </Popover>
      </div>
    </>
  );
}

export default AppBar;