import React from 'react'
import { MasterProvider } from '../master/MasterContext'

export const AppProviders = ({ children }) => (
  <MasterProvider>
    {children}
  </MasterProvider>
);