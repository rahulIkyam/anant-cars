import { createContext, useCallback, useContext, useState } from "react"


const AccountReceiptContext = createContext();

export const AccountReceiptProvider = ({ children }) => {
    const [accountState, setAccountState] = useState({
        loading: false,
        error: null,
        toDate: null,
        fromDate: null,
        park: undefined,
        tableData: [],
        totalCount: 0,
        selectedRowIds: {},
        selectedRowsData: [],
        showDialog: false
    });

    const resetAccountReceiptState = useCallback(() => {
        setAccountState({
            loading: false,
            error: null,
            toDate: null,
            fromDate: null,
            park: undefined,
            tableData: [],
            totalCount: 0,
            selectedRowIds: {},
            selectedRowsData: [],
            showDialog: false
        });
    }, []);

    const contextValue = {
        accountState,
        setAccountState,
        resetAccountReceiptState,
        resetState: useCallback(() => {
            setAccountState(prev => ({
                ...prev,
                loading: false,
                error: null,
                tableData: [],
            }));
        }, [])
    };


    return (
        <AccountReceiptContext.Provider value={contextValue}>
            {children}
        </AccountReceiptContext.Provider>
    );
};


export const useAccReceipt = () => {
    const context = useContext(AccountReceiptContext);
    if(!context) {
        throw new Error("useAccReceipt must be used within a AccountReceiptProvider")
    }
    return context;
};