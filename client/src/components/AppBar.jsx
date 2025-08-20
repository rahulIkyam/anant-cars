import React, { useRef, useState } from "react";
import {
  ShellBar,
  Avatar,
  Popover,
  List,
  ListItemStandard,
  Button,
  Dialog,
  Bar,
  Title,
  Input,
  Icon,
  Label
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/menu2.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import "@ui5/webcomponents/dist/Avatar.js";
import ikyamLogo from "../assets/ikyam-logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';
import { useMaster } from "../pages/master/MasterContext";

function AppBar({ toggleSidebar }) {

  const { resetMasterState } = useMaster();

  const navigate = useNavigate();
  const avatarRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordErrors, setPasswordErrors] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false
  });
  const [userUUID, setUserUUID] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const dialogRef = useRef(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserUUID(parsedData.SAP_UUID);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    resetMasterState();
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('authToken');
    window.history.replaceState(null, '', '/login');
    setPopoverOpen(false);
    navigate("/login", { replace: true });
  };

  const handleProfileClick = () => {
    setPopoverOpen((prev) => !prev);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));

    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validatePasswords = () => {
    let isValid = true;
    const newErrors = {
      newPassword: "",
      confirmPassword: ""
    };

    if (!passwords.newPassword) {
      newErrors.newPassword = "Please enter a new password";
      isValid = false;
    } else if (passwords.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!passwords.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setPasswordErrors(newErrors);
    return isValid;
  };


  const handlePasswordUpdate = async () => {
    if (!validatePasswords()) return;
    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL;

      const response = await axios.patch(
        `${API_BASE}/api/login/reset-password`,
        { uuid: userUUID, newPassword: passwords.newPassword },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Password update response:", response.data);
      setDialogContent("Password updated successfully!");
      setDialogOpen(true);
      setShowPasswordDialog(false);
      setPasswords({ newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Password update error:", error.response?.data || error.message);
      setDialogContent(error.response?.data?.error || "Password update failed");
      setDialogOpen(true);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-20">
        <ShellBar
          startButton={<Button accessibleName="Menu" icon="menu2" tooltip="Menu" onClick={toggleSidebar} />}
          logo={<img src={ikyamLogo} alt="logo" className="h-7 pl-5 cursor-pointer" />}
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
              icon="key"
              type="Active"
              onClick={() => {
                setPopoverOpen(false);
                setShowPasswordDialog(true);
              }}
            >
              Update Password
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



        <Dialog
          open={showPasswordDialog}
          onAfterClose={() => {
            setShowPasswordDialog(false);
            setPasswords({ newPassword: "", confirmPassword: "" });
            setPasswordErrors({ newPassword: "", confirmPassword: "" });
          }}
          header={
            <Bar>
              <Title>Update Password</Title>
            </Bar>
          }
          footer={
            <Bar
              design="Footer"
              endContent={
                <>
                  <Button
                    design="Emphasized"
                    onClick={handlePasswordUpdate}
                  >
                    Update
                  </Button>
                  <Button design="Transparent" onClick={() => setShowPasswordDialog(false)}>
                    Cancel
                  </Button>
                </>
              }
            />
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <Label required>New Password</Label>
              <div style={{ position: 'relative', width: '100%' }}>
                <Input
                  name="newPassword"
                  type={showPasswords.newPassword ? "text" : "password"}
                  value={passwords.newPassword}
                  placeholder="Enter new password"
                  onInput={handlePasswordChange}
                  style={{ width: "100%" }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0a6ed1',
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                  }}
                  onClick={() => togglePasswordVisibility("newPassword")}
                >

                  <Icon name={showPasswords.newPassword ? "hide" : "show"} />
                </span>
              </div>
              {passwordErrors.newPassword && (
                <div style={{ color: 'red', fontSize: '0.875rem' }}>
                  {passwordErrors.newPassword}
                </div>
              )}
            </div>

            <div>
              <Label required>Confirm Password</Label>
              <div style={{ position: 'relative', width: '100%' }}>
                <Input
                  name="confirmPassword"
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  value={passwords.confirmPassword}
                  placeholder="Confirm new password"
                  onInput={handlePasswordChange}
                  style={{ width: "100%" }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0a6ed1',
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                  }}
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  <Icon name={showPasswords.confirmPassword ? "hide" : "show"} />
                </span>
              </div>
              {passwordErrors.confirmPassword && (
                <div style={{ color: 'red', fontSize: '0.875rem' }}>
                  {passwordErrors.confirmPassword}
                </div>
              )}
            </div>
          </div>


        </Dialog>

        <Dialog
          open={dialogOpen}
          headerText='Password Update'
          onAfterClose={() => setDialogOpen(false)}
        >
          {dialogContent}
          <Button
            onClick={() => setDialogOpen(false)}
            design='Emphasized'
            slot='footer'
          >
            OK
          </Button>
        </Dialog>
      </div>
    </>
  );
}

export default AppBar;