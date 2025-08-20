import React from 'react'
import axios from 'axios';
import { useAccReceipt } from './AccountReceiptContext';
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import { AnalyticalTable, Bar, BusyIndicator, Button, ComboBox, ComboBoxItem, DatePicker, Dialog, DynamicPage, DynamicPageHeader, DynamicPageTitle, Label, Tag, Toolbar, ToolbarButton } from '@ui5/webcomponents-react';
import InvoiceNumberSelector from '../../components/selectors/InvoiceNumberSelector';
import CustomerNameSelector from '../../components/selectors/CustomerNameSelector';
import HsnSelector from '../../components/selectors/HsnSelector';

function AccountReceipt() {

    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    const { accountState, setAccountState } = useAccReceipt();
    const {
        loading, error, toDate, fromDate, park, tableData, totalCount,
        selectedRowIds, selectedRowsData, showDialog
    } = accountState;

    const updateState = (updates) => {
        setAccountState(prev => ({ ...prev, ...updates }));
    };

    const enableMultiSelect = park === '';
    const enablePostButton = enableMultiSelect && selectedRowsData.length > 0;

    const columns = [
        { Header: <div className='font-bold pl-2'>UUID</div>, accessor: 'SAP_UUID', width: 220, hAlign: 'Left', HeaderTooltip: 'UUID' },
        { Header: <div className='font-bold pl-2'>Description</div>, accessor: 'SAP_Description', width: 180, hAlign: 'Left', HeaderTooltip: 'Description' },
        { Header: <div className='font-bold pl-2'>Created By User</div>, accessor: 'SAP_CreatedByUser', width: 180, hAlign: 'Left', HeaderTooltip: 'Created By User' },
        { Header: <div className='font-bold pl-2'>Created By User Text</div>, accessor: 'SAP_CreatedByUser_Text', width: 150, hAlign: 'Left', HeaderTooltip: 'Created By User Text' },
        { Header: <div className='font-bold pl-2'>Last Changed By User</div>, accessor: 'SAP_LastChangedByUser', width: 200, hAlign: 'Left', HeaderTooltip: 'Last Changed By User' },
        { Header: <div className='font-bold pl-2'>Last Changed By User Text</div>, accessor: 'SAP_LastChangedByUser_Text', width: 150, hAlign: 'Left', HeaderTooltip: 'Last Changed By User Text' },
        { Header: <div className='font-bold pl-2'>Lifecycle Status</div>, accessor: 'SAP_LifecycleStatus', width: 250, hAlign: 'Left', HeaderTooltip: 'Lifecycle Status' },
        { Header: <div className='font-bold pl-2'>Lifecycle Status Text</div>, accessor: 'SAP_LifecycleStatus_Text', width: 180, hAlign: 'Left', HeaderTooltip: 'Lifecycle Status Text' },
        { Header: <div className='font-bold pl-2'>Receipt No</div>, accessor: 'ReceiptNo', width: 150, hAlign: 'Left', HeaderTooltip: 'Receipt No' },
        { Header: <div className='font-bold pl-2'>Document Type</div>, accessor: 'DocumentType', width: 180, hAlign: 'Left', HeaderTooltip: 'Document Type' },
        { Header: <div className='font-bold pl-2'>Company Code</div>, accessor: 'CompanyCode', width: 180, hAlign: 'Left', HeaderTooltip: 'Company Code' },
        { Header: <div className='font-bold pl-2'>Period</div>, accessor: 'Period', width: 180, hAlign: 'Left', HeaderTooltip: 'Period' },
        { Header: <div className='font-bold pl-2'>Currency</div>, accessor: 'Currency', width: 180, hAlign: 'Left', HeaderTooltip: 'Currency' },
        { Header: <div className='font-bold pl-2'>Reference</div>, accessor: 'Reference', width: 180, hAlign: 'Left', HeaderTooltip: 'Reference' },
        { Header: <div className='font-bold pl-2'>Document Header Text</div>, accessor: 'DocumentHeaderText', width: 180, hAlign: 'Left', HeaderTooltip: 'Document Header Text' },
        { Header: <div className='font-bold pl-2'>Status</div>, accessor: 'Status', width: 180, hAlign: 'Left', HeaderTooltip: 'Status' },
        { Header: <div className='font-bold pl-2'>Status Text</div>, accessor: 'Status_Text', width: 180, hAlign: 'Left', HeaderTooltip: 'Status Text' },
        { Header: <div className='font-bold pl-2'>Remarks</div>, accessor: 'Remarks', width: 180, hAlign: 'Left', HeaderTooltip: 'Remarks' },
        { Header: <div className='font-bold pl-2'>Account Receipt Entry</div>, accessor: 'AccountReceiptEntry', width: 180, hAlign: 'Left', HeaderTooltip: 'Account Receipt Entry' },
        {
            Header: <div className='font-bold pl-2'>Action</div>,
            accessor: 'actions',
            width: 150,
            hAlign: 'Left',
            disableFilters: true,
            disableSortBy: true,
            Cell: (instance) => {
                const { row } = instance;
                return (
                    <div className='flex space-x-2'>
                        <Button
                            icon='edit'
                            design='Transparent'
                            onClick={() => handleEdit(row.original)}
                            title='Edit'
                        />
                        <Button
                            icon="delete"
                            design="Transparent"
                            onClick={() => handleDelete(row.original)}
                            title="Delete"
                        />
                    </div>
                );
            }
        }
    ];


    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}T00:00:00`;
    };

    const onRowSelect = enableMultiSelect ? (e) => {
        const rowsById = e?.detail?.rowsById || {};
        const allRowsSelected = e?.detail?.allRowsSelected;
        const selectedCount = Object.values(e?.detail.selectedRowIds).filter(Boolean).length;

        var selectedRowObjects = [];
        const newSelectedIds = {};

        if (allRowsSelected && selectedCount !== 0) {
            selectedRowObjects = tableData;
            tableData.forEach((row, index) => {
                newSelectedIds[index] = true;
            });
        } else if (selectedCount === 0) {
            selectedRowObjects = [];
        } else {
            Object.entries(rowsById).forEach(([key, val]) => {
                if (val?.isSelected) {
                    const original = val?.row?.original || tableData[key];
                    if (original) {
                        selectedRowObjects.push(original);
                        newSelectedIds[key] = true;
                    }
                }
            });
        }

        updateState({
            selectedRowsData: selectedRowObjects,
            selectedRowIds: newSelectedIds
        });

    } : undefined;

    const handleEdit = (rowData) => {
        console.log('Edit row:', rowData);
    };

    const handleDelete = (rowData) => {
        console.log('Delete row:', rowData);
    };

    const fetchDateFilterData = async () => {
        const formattedFromDate = formatDate(fromDate);
        const formattedToDate = formatDate(toDate);

        const res = await axios.get(`${API_BASE}/api/accReceiptDateFilter`, {
            params: { fromDate: formattedFromDate, toDate: formattedToDate }
        });
        return res.data;
    };

    const fetchParkStatusData = async () => {
        const formattedFromDate = formatDate(fromDate);
        const formattedToDate = formatDate(toDate);

        try {
            const params = {
                fromDate: formattedFromDate,
                toDate: formattedToDate,
                status: park !== undefined ? park : ''
            };
            const res = await axios.get(`${API_BASE}/api/accReceiptParkStatus`, { params });

            const responseData = res.data?.d || res.data || {};

            return {
                count: responseData.__count || "0",
                results: responseData.results || []
            };

        } catch (error) {
            console.error("Error in fetchParkStatusData:", error);
            return {
                count: "0",
                results: []
            };
        }
    };

    const handleFetchAll = async () => {
        try {
            updateState({ loading: true, error: null });

            const [dateFilterRes, parkStatusRes] = await Promise.all([
                fetchDateFilterData(),
                fetchParkStatusData(),
            ]);

            const newData = parkStatusRes.results || [];
            const newCount = parseInt(parkStatusRes.count) || 0;

            updateState({
                loading: false,
                tableData: newData,
                totalCount: newCount,
                error: null
            });

            if (newData.length === 0) {
                updateState({ showDialog: true })
            }

        } catch (error) {
            updateState({
                error: error.message,
                loading: false,
                tableData: [],
                totalCount: 0
            });
            console.error("Error in handleFetchAll from Account Receipt:", error);
            updateState({ showDialog: true })
        }
    };


    const handlePost = async () => {
        if (selectedRowsData === 0) {
            console.log("No rows selected");
            return;
        }

        try {
            const status = "01";
            const promises = selectedRowsData.map(row => {
                const uuid = row.SAP_UUID;
                return axios.patch(
                    `${API_BASE}/api/updateAccReceiptStatus/update-status`,
                    { status },
                    {
                        params: { uuid },
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    },
                );
            });

            const results = await Promise.allSettled(promises);

            await handleFetchAll();
        } catch (error) {
            console.error("Error in handlePost:", error);
        }
    };

    return (
        <div className="p-20 bg-gray-100 min-h-screen" style={{ position: 'relative' }}>
            {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    zIndex: 0,
                    pointerEvents: 'auto'
                }}>
                    <BusyIndicator
                        active={loading}
                        size="Large"
                    />
                </div>
            )}

            <DynamicPage
                headerArea={
                    <DynamicPageHeader style={{ padding: '1rem', }}>
                        <div style={{ display: 'flex', flexGrow: 1, gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>From Date</Label>
                                    <DatePicker
                                        style={{ width: '256px' }}
                                        value={fromDate || ''}
                                        onChange={(e) => updateState({ fromDate: e.target.value })}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>To Date</Label>
                                    <DatePicker
                                        style={{ width: '256px' }}
                                        value={toDate || ''}
                                        onChange={(e) => updateState({ toDate: e.target.value })}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Park/Post</Label>
                                    <ComboBox
                                        filter={false}
                                        placeholder="Select"
                                        style={{ width: '256px' }}
                                        value={park === '' ? '-' :
                                            park === '01' ? '01 - Yet to Post' :
                                                park === '02' ? '02 - Success' :
                                                    park === '03' ? '03 - Failure' : ''}
                                        onChange={(e) => {
                                            const selectedItem = e.target.value;
                                            let parkValue;
                                            if (selectedItem === '-') {
                                                parkValue = '';
                                            } else if (selectedItem === '01 - Yet to Post') {
                                                parkValue = "01";
                                            } else if (selectedItem === '02 - Success') {
                                                parkValue = "02";
                                            } else if (selectedItem === '03 - Failure') {
                                                parkValue = "03";
                                            } else {
                                                parkValue = undefined;
                                            }
                                            updateState({
                                                park: parkValue,
                                                tableData: [],
                                                selectedRowIds: {},
                                                selectedRowsData: []
                                            });
                                        }}
                                    >
                                        <ComboBoxItem text="-" />
                                        <ComboBoxItem text="01 - Yet to Post" />
                                        <ComboBoxItem text="02 - Success" />
                                        <ComboBoxItem text="03 - Failure" />
                                    </ComboBox>
                                </div>
                            </div>

                            {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <InvoiceNumberSelector />
                                <CustomerNameSelector />
                                <HsnSelector />
                            </div> */}
                        </div>
                    </DynamicPageHeader>
                }
                titleArea={
                    <DynamicPageTitle
                        actionsBar={
                            <Toolbar design="Transparent">
                                <ToolbarButton
                                    style={{ paddingTop: '1rem', paddingRight: '1rem' }}
                                    design="Emphasized"
                                    text="Fetch"
                                    disabled={!fromDate || !toDate || park === undefined}
                                    onClick={handleFetchAll} />
                            </Toolbar>
                        }
                    >
                        <Tag>Expand</Tag>
                    </DynamicPageTitle>
                }
                showFooter='true'
                footerArea={
                    enableMultiSelect && (
                        <div className='pl-0 pr-0'>
                            <Bar
                                design='FloatingFooter'
                                style={{
                                    margin: '5rem 0 0 0',
                                    borderRadius: '0',
                                    border: 'none',
                                    boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
                                }}
                                endContent={
                                    <Button
                                        design="Positive"
                                        style={{
                                            backgroundColor: enablePostButton ? '#2563eb' : '#cccccc',
                                            color: 'white',
                                            border: 'none'
                                        }}
                                        onClick={handlePost}
                                        disabled={!enablePostButton}
                                    >
                                        Post
                                    </Button>
                                }
                            />
                        </div>
                    )
                }
                style={{
                    height: '1000px',
                }}
            >
                <div className="bg-white shadow w-full">
                    <AnalyticalTable
                        loading={loading}
                        key={`${tableData.length}-${loading}`}
                        columns={columns}
                        data={tableData}
                        onRowSelect={onRowSelect}
                        rowHeight={40}
                        headerRowHeight={40}
                        selectedRowIds={enableMultiSelect ? selectedRowIds : {}}
                        selectionMode={enableMultiSelect ? "Multiple" : "None"}
                        withRowHighlight
                        noDataText={error ? "Error loading data" : "No data available"}
                        visibleRows={Math.min(14, tableData.length)}
                    />
                </div>
            </DynamicPage>
            {showDialog && (
                <Dialog
                    open={showDialog}
                    headerText='Information'
                    footer={
                        <Button
                            onClick={() => updateState({ showDialog: false })}>OK</Button>
                    }
                >
                    <p>
                        {error
                            ? "Error loading data. Please try again."
                            : "No data available for the selected filters."}
                    </p>
                </Dialog>
            )}
        </div>
    )
}

export default AccountReceipt