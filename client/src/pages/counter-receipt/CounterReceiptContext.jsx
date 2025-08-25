import { createContext, useCallback, useContext, useState } from "react";

const CounterreceiptContext = createContext();

export const CounterReceiptProvider = ({ children }) => {
    const [counterState, setCounterState] = useState({
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

    const resetCounterReceiptState = useCallback(() => {
        setCounterState({
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
        counterState,
        setCounterState,
        resetCounterReceiptState,
        resetState: useCallback(() => {
            setCounterState(prev => ({
                ...prev,
                loading: false,
                error: null,
                tableData: []
            }));
        }, [])
    };

    return (
        <CounterreceiptContext.Provider value={contextValue}>
            {children}
        </CounterreceiptContext.Provider>
    );
};


export const useCounterReceipt = () => {
    const context = useContext(CounterreceiptContext);
    if(!context) {
        throw new Error("useCounterReceipt must be used within a CounterReceiptProvider")
    }
    return context;
};