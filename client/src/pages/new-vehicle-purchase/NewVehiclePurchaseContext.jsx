import { createContext, useCallback, useContext, useState } from "react";


const NewVehiclePurchaseContext = createContext();

export const NewVehiclePurchaseProvider = ({ children }) => {
    const [nvpState, setNvpState] = useState({
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


    const resetNewVehiclePurchaseState = useCallback(() => {
        setNvpState({
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
        nvpState,
        setNvpState,
        resetNewVehiclePurchaseState,
        resetState: useCallback(() => {
            setNvpState(prev => ({
                ...prev,
                loading: false,
                error: null,
                tableData: []
            }));
        }, [])
    };


    return (
        <NewVehiclePurchaseContext.Provider value={contextValue}>
            {children}
        </NewVehiclePurchaseContext.Provider>
    )
};



export const useNewVehiclePurchase = () => {
    const context = useContext(NewVehiclePurchaseContext);
    if(!context) {
        throw new Error("useNewVehiclePurchase must be used within a NewVehiclePurchaseProvider")
    }
    return context;
}