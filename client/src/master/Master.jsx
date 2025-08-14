import {
  ComboBox,
  ComboBoxItem,
  DatePicker,
  Label,
  Button,
  Page,
  Bar,
  AnalyticalTable,
  Toolbar,
  ToolbarSpacer,
  BusyIndicator
} from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialTableData } from './masterData';
import { useEffect } from 'react';
import { useMaster } from './MasterContext';
import InvoiceNumberSelector from '../components/selectors/InvoiceNumberSelector';
import CustomerNameSelector from '../components/selectors/CustomerNameSelector';
import HsnSelector from '../components/selectors/HsnSelector';

function Master() {

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  const { masterState, setMasterState } = useMaster();
  const {
    loading, error, branch, toDate, fromDate, park,
    tableData, totalCount, selectedRowIds, selectedRowsData, invoiceNumber,
    dealerLocationName, customerName, hsn
  } = masterState;

  const updateState = (updates) => {
    setMasterState(prev => ({ ...prev, ...updates }));
  };



  const columns = [
    { Header: <div className='font-bold pl-2'>Invoice Amount</div>, accessor: 'InvoiceAmount_V', width: 180, hAlign: 'Left', HeaderTooltip: 'Invoice Amount' },
    { Header: <div className='font-bold pl-2'>Engine Number</div>, accessor: 'EngineNumber', width: 180, hAlign: 'Left', HeaderTooltip: 'Engine Number' },
    { Header: <div className='font-bold pl-2'>Model Description</div>, accessor: 'ModelDescription', width: 150, hAlign: 'Left', HeaderTooltip: 'Model Description' },
    { Header: <div className='font-bold pl-2'>Selling Price</div>, accessor: 'SellingPrice_V', width: 200, hAlign: 'Left', HeaderTooltip: 'Selling Price' },
    { Header: <div className='font-bold pl-2'>Dealer Discount</div>, accessor: 'DealerDiscount_V', width: 150, hAlign: 'Left', HeaderTooltip: 'Dealer Discount' },
    { Header: <div className='font-bold pl-2'>OEM Scheme Discount</div>, accessor: 'OEMSchemeDiscount_V', width: 250, hAlign: 'Left', HeaderTooltip: 'OEM Scheme Discount' },
    { Header: <div className='font-bold pl-2'>Corporate Discount Amount</div>, accessor: 'CorporateDiscountAmount_V', width: 180, hAlign: 'Left', HeaderTooltip: 'Corporate Discount Amount' },
    { Header: <div className='font-bold pl-2'>TCS Amount</div>, accessor: 'TCSAmount_V', width: 250, hAlign: 'Left', HeaderTooltip: 'TCS Amount' },
    { Header: <div className='font-bold pl-2'>CESS Tax Rate</div>, accessor: 'CESSTaxRate', width: 150, hAlign: 'Left', HeaderTooltip: 'CESS Tax Rate' },
    { Header: <div className='font-bold pl-2'>CESS Tax Amount</div>, accessor: 'CESSTaxAmount_V', width: 180, hAlign: 'Left', HeaderTooltip: 'CESS Tax Amount' },
    { Header: <div className='font-bold pl-2'>CGST Tax Rate</div>, accessor: 'CGSTTaxRate', width: 180, hAlign: 'Left', HeaderTooltip: 'CGST Tax Rate' },
    { Header: <div className='font-bold pl-2'>CGST Tax Amount</div>, accessor: 'CGSTTaxAmount_V', width: 180, hAlign: 'Left', HeaderTooltip: 'CGST Tax Amount' },
    { Header: <div className='font-bold pl-2'>SGST Tax Rate</div>, accessor: 'SGSTTaxRate', width: 180, hAlign: 'Left', HeaderTooltip: 'SGST Tax Rate' },
    { Header: <div className='font-bold pl-2'>SGST Tax Amount</div>, accessor: 'SGSTTaxAmount_V', width: 180, hAlign: 'Left', HeaderTooltip: 'SGST Tax Amount' },
    { Header: <div className='font-bold pl-2'>IGST Tax Rate</div>, accessor: 'IGSTTaxRate', width: 180, hAlign: 'Left', HeaderTooltip: 'IGST Tax Rate' },
    { Header: <div className='font-bold pl-2'>IGST Tax Amount</div>, accessor: 'IGSTTaxAmount_V', width: 180, hAlign: 'Left', HeaderTooltip: 'IGST Tax Amount' },
    { Header: <div className='font-bold pl-2'>UGST Tax Rate</div>, accessor: 'UGSTTaxRate', width: 180, hAlign: 'Left', HeaderTooltip: 'UGST Tax Rate' },
    { Header: <div className='font-bold pl-2'>UGST Tax Amount</div>, accessor: 'UGSTTaxAmount_V', width: 180, hAlign: 'Left', HeaderTooltip: 'UGST Tax Amount' },
    { Header: <div className='font-bold pl-2'>EPC Amount</div>, accessor: 'EPCAmount_V', width: 180, hAlign: 'Left', HeaderTooltip: 'EPC Amount' },
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

  const onRowSelect = (e) => {
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
      updateState({ selectedRowsData: selectedRowObjects });
      updateState({ selectedRowIds: newSelectedIds });
    }
    else if (selectedCount === 0) {
      selectedRowObjects = [];

      updateState({ selectedRowsData: selectedRowObjects });
      updateState({});
    }
    else {

      Object.entries(rowsById).forEach(([key, val]) => {
        if (val?.isSelected) {
          const original = val?.row?.original || tableData[key];
          if (original) {
            selectedRowObjects.push(original);
            newSelectedIds[key] = true;
          }
        }
      });
      updateState({ selectedRowsData: selectedRowObjects });
      updateState({ selectedRowIds: newSelectedIds });
    }
  };

  const handlePost = () => {
    if (selectedRowsData.length > 0) {
      console.log("Selected rows:", selectedRowsData);
    } else {
      console.log("No rows selected");
    }
  };

  const handleEdit = (rowData) => {
    console.log('Edit row:', rowData);
    navigate('/application/edit', {
      state: {
        rowData: rowData
      }
    });
  };

  const handleDelete = (rowData) => {
    console.log('Delete row:', rowData);
  };

  const fetchDateFilterData = async () => {
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);

    const res = await axios.get(`${API_BASE}/api/salesDateFilter`, {
      params: { fromDate: formattedFromDate, toDate: formattedToDate }
    });

    return res.data;
  };

  const fetchCountRecordData = async () => {
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);

    const res = await axios.get(`${API_BASE}/api/salesRecordCount`, {
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
        toDate: formattedToDate
      };

      if (park !== undefined) {
        params.status = park === ' ' ? '' : park;
      }
      const res = await axios.get(`${API_BASE}/api/salesParkStatus`, { params });


      return {
        count: res.data?.__count || "0",
        results: res.data?.results || []
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

      const [dateFilterRes, countRecordRes, parkStatusRes] = await Promise.all([
        fetchDateFilterData(),
        fetchCountRecordData(),
        fetchParkStatusData(),
      ]);

      updateState({
        loading: false,
        tableData: parkStatusRes.results || [],
        totalCount: parseInt(parkStatusRes.count) || 0
      });
    } catch (err) {
      updateState({ error: err.message, loading: false });
      console.error("Error in handleFetchAll:", err);
    }
  };




  return (
    <div className="p-0 pt-10 bg-gray-100 min-h-screen" style={{ position: 'relative' }}>

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


      <Page
        backgroundDesign='Solid'
        footer={
          <div className='pl-12 pr-12 pb-5'>
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
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none'
                  }}
                  onClick={handlePost}
                >
                  Post
                </Button>
              }
            />
          </div>
        }
        style={{
          height: 'calc(100vh - 5rem)',
          position: 'relative',
          padding: '1.5rem',
          zIndex: 1
        }}
      >

        <Toolbar
          style={{
            backgroundColor: 'white',
            padding: '1rem',
            marginBottom: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            width: '100%',
            height: '220px'
          }}
        >
          <div style={{ display: 'flex', flexGrow: 1, gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Label showColon style={{ width: '80px' }}>Branch</Label>
                <ComboBox
                  placeholder="Select Branch"
                  style={{ width: '256px' }}
                  value={branch || ''}
                  onChange={(e) => updateState({ branch: e.target.value })}
                >
                  <ComboBoxItem text="01" />
                  <ComboBoxItem text="02" />
                </ComboBox>
              </div>
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
                  placeholder="Select"
                  style={{ width: '256px' }}
                  value={park || ''}
                  onChange={(e) => {
                    const selectedItem = e.target.value;
                    let parkValue;
                    if (selectedItem === '-') {
                      parkValue = " "
                    } else if (selectedItem === '01 - Yet to Post') {
                      parkValue = "01"
                    } else if (selectedItem === '02 - Success') {
                      parkValue = "02"
                    } else if (selectedItem === '03 - Failure') {
                      parkValue = "03"
                    }

                    updateState({ park: parkValue });
                  }}
                >
                  <ComboBoxItem text="-" />
                  <ComboBoxItem text="01 - Yet to Post" />
                  <ComboBoxItem text="02 - Success" />
                  <ComboBoxItem text="03 - Failure" />
                </ComboBox>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <InvoiceNumberSelector />
              <CustomerNameSelector />
              <HsnSelector/>
            </div>
          </div>

          <ToolbarSpacer />

          <Button
            design="Emphasized"
            onClick={handleFetchAll}
            disabled={!fromDate || !toDate || park === undefined}
          >
            Fetch
          </Button>
        </Toolbar>



        <div className="bg-white p-4 shadow w-full pb-5"
        >
          <AnalyticalTable
            loading={loading}
            key={tableData.length}
            columns={columns}
            data={tableData}
            onRowSelect={onRowSelect}
            rowHeight={40}
            headerRowHeight={40}
            selectedRowIds={selectedRowIds}
            selectionMode="Multiple"
            withRowHighlight
            noDataText="No data available"
            visibleRows={Math.min(14, tableData.length)}
          />
        </div>
      </Page>
    </div>
  );
}

export default Master;