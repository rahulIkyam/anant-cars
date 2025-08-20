import React, { useEffect, useRef } from 'react';
import { SideNavigation, SideNavigationItem, SideNavigationSubItem } from '@ui5/webcomponents-react';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/employee.js';
import '@ui5/webcomponents-icons/dist/shipping-status.js';
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/documents.js";
import "@ui5/webcomponents-icons/dist/sales-document.js";
import "@ui5/webcomponents-icons/dist/money-bills.js";
import "@ui5/webcomponents-icons/dist/supplier.js";
import { useNavigate, useLocation } from 'react-router-dom';
import { useMaster } from '../pages/master/MasterContext';
import { useAccReceipt } from '../pages/account-receipt/AccountReceiptContext';

function Sidebar({ collapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);
  const { resetMasterState } = useMaster();
  const { resetAccountReceiptState } = useAccReceipt();

  const pathToIdMap = {
    "/dashboard": "dashboard",
    "/master": "main-master",
    "/edit-master": "main-master",
    "/account-receipts": "account-receipts",
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
        resetMasterState();
        resetAccountReceiptState();
        navigate("/dashboard",);
        break;
      case "sales-register":
        resetMasterState();
        resetAccountReceiptState();
        navigate("/sales-register");
        break;
      case "account-receipts":
        resetMasterState();
        resetAccountReceiptState();
        navigate("/account-receipts");
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
        <SideNavigationItem icon="documents" text="Application" id="main-application" >
          <SideNavigationSubItem icon='sales-document' text='Sales Register' id='sales-register' />
          <SideNavigationSubItem icon='money-bills' text='Account Receipts' id='account-receipts' />
        </SideNavigationItem>
      </SideNavigation>
    </div>
  );
}

export default Sidebar;
