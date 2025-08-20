import { createContext, useState, useContext, useCallback } from "react";

const MasterContext = createContext();

export const MasterProvider = ({ children }) => {
  const [masterState, setMasterState] = useState({
    loading: false,
    error: null,
    branch: null,
    toDate: null,
    fromDate: null,
    park: undefined,
    invoiceNumber: null,
    dealerLocationName: null,
    customerName: null,
    hsn: null,
    tableData: [],
    totalCount: 0,
    selectedRowIds: {},
    selectedRowsData: [],
    showDialog: false
  });

  const resetMasterState = useCallback(() => {
    setMasterState({
      loading: false,
      error: null,
      branch: null,
      toDate: null,
      fromDate: null,
      park: undefined,
      invoiceNumber: null,
      dealerLocationName: null,
      customerName: null,
      hsn: null,
      tableData: [],
      totalCount: 0,
      selectedRowIds: {},
      selectedRowsData: [],
      showDialog: false
    });
  }, []);

  const contextValue = {
    masterState,
    setMasterState,
    resetMasterState,
    resetState: useCallback(() => {
      setMasterState(prev => ({
        ...prev,
        loading: false,
        error: null,
        tableData: [],
        totalCount: 0
      }));
    }, [])
  };

  return (
    <MasterContext.Provider value={contextValue}>
      {children}
    </MasterContext.Provider>
  );
};

export const useMaster = () => {
  const context = useContext(MasterContext);
  if (!context) {
    throw new Error('useMaster must be used within a MasterProvider');
  }
  return context;
};