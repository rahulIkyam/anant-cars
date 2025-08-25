import React from 'react'
import { MasterProvider } from '../pages/master/MasterContext';
import { AccountReceiptProvider } from '../pages/account-receipt/AccountReceiptContext';
import { CounterReceiptProvider } from '../pages/counter-receipt/CounterReceiptContext';

export const AppProviders = ({ children }) => (
  <MasterProvider>
    <AccountReceiptProvider>
      <CounterReceiptProvider>
        {children}
      </CounterReceiptProvider>
    </AccountReceiptProvider>
  </MasterProvider>
);