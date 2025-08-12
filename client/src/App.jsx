import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import AppBar from './components/AppBar'
import Sidebar from './components/Sidebar'
import Master from './master/Master'
import CustomerMaster from './CustomerMaster'
import VendorMaster from './VendorMaster'
import EditMaster from './master/EditMaster'

const MainLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppBar toggleSidebar={toggleSidebar} />
      <Sidebar collapsed={sidebarCollapsed} />
      <div className={`flex-1 pt-0 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'pl-2' : 'pl-50'}`}>
        <div className="mx-auto p-0">
          {children}
        </div>
      </div>
    </div>
  );
};

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path='/master' element={<MainLayout><Master /></MainLayout>} />
        <Route path='/edit-master' element={<MainLayout><EditMaster /></MainLayout>} />
        <Route path='/customer-master' element={<MainLayout><CustomerMaster /></MainLayout>} />
        <Route path='/vendor-master' element={<MainLayout><VendorMaster /></MainLayout>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
