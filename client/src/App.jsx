import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import AppBar from './components/AppBar'
import Sidebar from './components/Sidebar'
import CustomerMaster from './CustomerMaster'
import VendorMaster from './VendorMaster'
import { AppProviders } from './providers/AppProviders'
import AuthWrapper from './components/AuthWrapper'
import Master from './pages/master/Master'
import EditMaster from './pages/master/EditMaster'
import AccountReceipt from './pages/account-receipt/accountReceipt'
import CounterReceipt from './pages/counter-receipt/CounterReceipt'

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
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/login" replace />} />
          <Route path='/login' element={<Login />} />

          <Route element={<AuthWrapper><MainLayout><Outlet /></MainLayout></AuthWrapper>}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/sales-register'>
              <Route index element={<Master />} />
              <Route path='edit' element={<EditMaster />} />
            </Route>
            <Route path='/account-receipts' element={<AccountReceipt/>}/>
            <Route path='/counter-receipts' element={<CounterReceipt/>}/>
            <Route path='/customer-master' element={<CustomerMaster />} />
            <Route path='/vendor-master' element={<VendorMaster />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>

  )
}

export default App
