import React from 'react'
import { MasterProvider } from '../pages/master/MasterContext';
import { AccountReceiptProvider } from '../pages/account-receipt/AccountReceiptContext';
import { CounterReceiptProvider } from '../pages/counter-receipt/CounterReceiptContext';
import { NewVehiclePurchaseProvider } from '../pages/new-vehicle-purchase/NewVehiclePurchaseContext';

export const AppProviders = ({ children }) => (
  <MasterProvider>
    <AccountReceiptProvider>
      <CounterReceiptProvider>
        <NewVehiclePurchaseProvider>
          {children}
        </NewVehiclePurchaseProvider>
      </CounterReceiptProvider>
    </AccountReceiptProvider>
  </MasterProvider>
);