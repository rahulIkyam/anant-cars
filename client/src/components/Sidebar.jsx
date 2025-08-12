import React, { useEffect, useRef } from 'react';
import { SideNavigation, SideNavigationItem } from '@ui5/webcomponents-react';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/employee.js';
import '@ui5/webcomponents-icons/dist/shipping-status.js';
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/business-card.js";
import "@ui5/webcomponents-icons/dist/supplier.js";
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar({ collapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);

  const pathToIdMap = {
    "/dashboard": "dashboard",
    "/master": "main-master",
    "/edit-master": "main-master",
    "/customer-master": "customer",
    "/vendor-master": "vendor",
  };

  useEffect(() => {
    const currentId = pathToIdMap[location.pathname];
    if (navRef.current) {
      const items = navRef.current.querySelectorAll('ui5-side-navigation-item');
      items.forEach(item => {
        item.selected = (item.id === currentId);
      });
    }
  }, [location.pathname]);

  const handleSelect = (e) => {
    const selectedId = e.detail.item.id;

    switch (selectedId) {
      case "dashboard":
        navigate("/dashboard");
        break;
      case "main-master":
        navigate("/master");
        break;
      case "customer":
        navigate("/customer-master");
        break;
      case "vendor":
        navigate("/vendor-master");
        break;
      default:
        break;
    }
  };

  return (
    <div className={`fixed top-0 left-0 h-screen ${collapsed ? 'w-16' : 'w-64'} bg-white z-40 shadow transition-all duration-300`}>
      <SideNavigation
        ref={navRef}
        onSelectionChange={handleSelect}
        className="h-full"
        collapsed={collapsed}
      >
        <SideNavigationItem icon="" text="" id="" />
        <SideNavigationItem icon="home" text="Dashboard" id="dashboard" />
        <SideNavigationItem icon="business-card" text="Master" id="main-master" />
        <SideNavigationItem icon="group" text="Customer Master" id="customer" />
        <SideNavigationItem icon="supplier" text="Vendor Master" id="vendor" />
      </SideNavigation>
    </div>
  );
}

export default Sidebar;
