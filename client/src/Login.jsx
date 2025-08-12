import {
    Button,
    Card,
    FlexBox,
    Input,
    Label,
    Title
} from '@ui5/webcomponents-react';
import React, { useRef, useState } from 'react';
import sap_logo from "./assets/SAP_Logo.svg";
import employee_icon from "./assets/UID_Icon_Employee.svg";
import ikyamLogo from "./assets/ikyam-logo.png";
import ikyamIcon from "./assets/ikyam-icon.png";
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function Login() {
    const [userEmail, setuserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [isResetView, setIsResetView] = useState(false);


    const navigate = useNavigate();

    const passwordRef = useRef(null);

    const handleLogin = async () => {
        try {
            const API_BASE = import.meta.env.VITE_API_BASE_URL;
            const res = await axios.get(`${API_BASE}/api/login`, {
                params: { userEmail, password }
            });

            if(res.data.length > 0) {
                console.log("Login success:", res.data);
                navigate("/dashboard");
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login Failed");
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f0f3f5', overflowY: 'hidden' }}>
            <FlexBox
                direction="Column"
                justifyContent="Center"
                alignItems="Center"
                style={{ minHeight: '100vh', padding: '0rem' }}
            >
                <Card
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        padding: '0',
                        border: '1px solid #ccc',
                        borderRadius: '17px',
                        overflow: 'hidden'
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#eeeeee',
                            padding: '1rem',
                            display: 'flex',
                            justifyContent: 'start',
                            borderRadius: '0'
                        }}
                    >
                        <img src={ikyamLogo} alt="Ikyam Logo" style={{ height: '40px' }} />
                    </div>

                    <div style={{ paddingTop: '2rem', paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem', borderRadius: '0' }}>
                        <FlexBox direction="Column" alignItems="Center" gap={"2rem"}>
                            <div
                                className="col"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <img
                                    src={employee_icon}
                                    alt="employee Icon"
                                    style={{
                                        height: '60px',
                                        width: '60px',
                                        marginBottom: '8px',
                                        border: '5px solid #eeeeee',
                                        borderRadius: '50%',
                                        padding: '5px',
                                        backgroundColor: '#fff',
                                    }}
                                />
                                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Sign In</span>
                            </div>

                            {!isResetView ? (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleLogin();
                                    }}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', alignItems: 'center' }}
                                >
                                    <Input
                                        placeholder="Enter Email"
                                        value={userEmail}
                                        onInput={(e) => setuserEmail(e.target.value)}
                                        style={{ width: '100%' }}
                                    />

                                    <div style={{ position: 'relative', width: '100%' }}>
                                        <Input
                                            placeholder="Enter Password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onInput={(e) => setPassword(e.target.value)}
                                            style={{ width: '100%', paddingRight: '60px' }}
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
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
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </span>
                                    </div>

                                    <Button 
                                    design="Emphasized" 
                                    style={{ width: '100%' }} 
                                    type="submit"
                                    onClick={(e) => {
                                        handleLogin();
                                    }}>
                                        Sign In
                                    </Button>

                                    <span
                                        style={{
                                            color: '#0a6ed1',
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                            fontSize: '14px',
                                            paddingBottom: '2rem',
                                            paddingTop: '1rem',
                                        }}
                                        onClick={() => setIsResetView(true)}
                                    >
                                        Forgot password?
                                    </span>
                                </form>
                            ) : (
                                <div style={{ width: '100%', position: 'relative' }}>
                                    <div style={{ textAlign: 'center', paddingTop: '1rem', paddingBottom: '1rem' }}>
                                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Reset password</span>
                                        <p style={{ marginTop: '1rem', fontSize: '14px' }}>
                                            We've sent you an e-mail to your primary e-mail<br />
                                            <b>{userEmail || "your-email@domain.com"}</b><br /><br />
                                            <br />
                                            Use the link in the e-mail to reset your password.
                                        </p>
                                        <span
                                            onClick={() => setIsResetView(false)}
                                            style={{
                                                color: '#0a6ed1',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            Cancel
                                        </span>
                                    </div>
                                </div>
                            )}

                        </FlexBox>
                    </div>
                </Card>
            </FlexBox>
        </div>
    );

}

export default Login;
