import React from 'react'
import { MasterProvider } from '../pages/master/MasterContext';
import { AccountReceiptProvider } from '../pages/account-receipt/AccountReceiptContext';

export const AppProviders = ({ children }) => (
  <MasterProvider>
    <AccountReceiptProvider>
      {children}
    </AccountReceiptProvider>
  </MasterProvider>
);