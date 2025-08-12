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
  ToolbarSpacer
} from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialTableData } from './masterData';
import { useEffect } from 'react';

function Master() {

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const flattenData = (data) => {
    return data.map(item => ({
      ...item.header,
      actions: null,
      _originalData: item
    }));
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [branch, setBranch] = useState();
  const [toDate, setToDate] = useState();
  const [fromDate, setFromDate] = useState();
  const [park, setPark] = useState();
  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const [selectedRowsData, setSelectedRowsData] = useState([]);

  const columns = [
    { Header: <div className='font-bold pl-2'>SAP UUID</div>, accessor: 'SAP_UUID', width: 200, hAlign: 'Left', HeaderTooltip: 'SAP UUID' },
    { Header: <div className='font-bold pl-2'>S.No</div>, accessor: 'SNO', width: 100, hAlign: 'Left', HeaderTooltip: 'Serial Number' },
    { Header: <div className='font-bold pl-2'>Invoice Number</div>, accessor: 'InvoiceNumber', width: 180, hAlign: 'Left', HeaderTooltip: 'Invoice Number' },
    { Header: <div className='font-bold pl-2'>Invoice Date</div>, accessor: 'InvoiceDate', width: 180, hAlign: 'Left', HeaderTooltip: 'Invoice Date' },
    { Header: <div className='font-bold pl-2'>Invoice Amount</div>, accessor: 'InvoiceAmount_V', width: 180, hAlign: 'Left', HeaderTooltip: 'Invoice Amount' },
    { Header: <div className='font-bold pl-2'>Invoice Amount Currency</div>, accessor: 'InvoiceAmount_C', width: 180, hAlign: 'Left', HeaderTooltip: 'Invoice Amount Currency' },
    { Header: <div className='font-bold pl-2'>Invoice Amount Currency Text</div>, accessor: 'InvoiceAmount_C_Text', width: 220, hAlign: 'Left', HeaderTooltip: 'Invoice Amount Currency Text' },
    { Header: <div className='font-bold pl-2'>SC Name</div>, accessor: 'SCName', width: 150, hAlign: 'Left', HeaderTooltip: 'SC Name' },
    { Header: <div className='font-bold pl-2'>Dealer Location Name</div>, accessor: 'DealerLocationName', width: 200, hAlign: 'Left', HeaderTooltip: 'Dealer Location Name' },
    { Header: <div className='font-bold pl-2'>Engine Number</div>, accessor: 'EngineNumber', width: 180, hAlign: 'Left', HeaderTooltip: 'Engine Number' },
    { Header: <div className='font-bold pl-2'>Model Group</div>, accessor: 'ModelGroup', width: 150, hAlign: 'Left', HeaderTooltip: 'Model Group' },
    { Header: <div className='font-bold pl-2'>Model Description</div>, accessor: 'ModelDescription', width: 200, hAlign: 'Left', HeaderTooltip: 'Model Description' },
    { Header: <div className='font-bold pl-2'>Customer Name</div>, accessor: 'CustomerName', width: 250, hAlign: 'Left', HeaderTooltip: 'Customer Name' },
    { Header: <div className='font-bold pl-2'>Customer ID</div>, accessor: 'CustomerID', width: 180, hAlign: 'Left', HeaderTooltip: 'Customer ID' },
    { Header: <div className='font-bold pl-2'>VIN</div>, accessor: 'VehicleIdentificationNumber', width: 250, hAlign: 'Left', HeaderTooltip: 'Vehicle Identification Number' },
    { Header: <div className='font-bold pl-2'>Dealer Discount</div>, accessor: 'DealerDiscount_V', width: 180, hAlign: 'Left', HeaderTooltip: 'Dealer Discount' },
    { Header: <div className='font-bold pl-2'>Dealer Discount Currency</div>, accessor: 'DealerDiscount_C', width: 200, hAlign: 'Left', HeaderTooltip: 'Dealer Discount Currency' },
    { Header: <div className='font-bold pl-2'>Dealer Discount Currency Text</div>, accessor: 'DealerDiscount_C_Text', width: 250, hAlign: 'Left', HeaderTooltip: 'Dealer Discount Currency Text' },
    { Header: <div className='font-bold pl-2'>OEM Scheme Discount</div>, accessor: 'OEMSchemeDiscount_V', width: 200, hAlign: 'Left', HeaderTooltip: 'OEM Scheme Discount' },
    { Header: <div className='font-bold pl-2'>OEM Scheme Discount Currency</div>, accessor: 'OEMSchemeDiscount_C', width: 250, hAlign: 'Left', HeaderTooltip: 'OEM Scheme Discount Currency' },
    { Header: <div className='font-bold pl-2'>OEM Scheme Discount Currency Text</div>, accessor: 'OEMSchemeDiscount_C_Text', width: 300, hAlign: 'Left', HeaderTooltip: 'OEM Scheme Discount Currency Text' },
    { Header: <div className='font-bold pl-2'>Corporate Discount Amount</div>, accessor: 'CorporateDiscountAmount_V', width: 250, hAlign: 'Left', HeaderTooltip: 'Corporate Discount Amount' },
    { Header: <div className='font-bold pl-2'>Corporate Discount Amount Currency</div>, accessor: 'CorporateDiscountAmount_C', width: 300, hAlign: 'Left', HeaderTooltip: 'Corporate Discount Amount Currency' },
    { Header: <div className='font-bold pl-2'>Corporate Discount Amount Currency Text</div>, accessor: 'CorporateDiscountAmount_C_Text', width: 350, hAlign: 'Left', HeaderTooltip: 'Corporate Discount Amount Currency Text' },
    { Header: <div className='font-bold pl-2'>TCS Amount</div>, accessor: 'TCSAmount_V', width: 150, hAlign: 'Left', HeaderTooltip: 'TCS Amount' },
    { Header: <div className='font-bold pl-2'>TCS Amount Currency</div>, accessor: 'TCSAmount_C', width: 200, hAlign: 'Left', HeaderTooltip: 'TCS Amount Currency' },
    { Header: <div className='font-bold pl-2'>TCS Amount Currency Text</div>, accessor: 'TCSAmount_C_Text', width: 250, hAlign: 'Left', HeaderTooltip: 'TCS Amount Currency Text' },
    { Header: <div className='font-bold pl-2'>CESS Tax Rate</div>, accessor: 'CESSTaxRate', width: 180, hAlign: 'Left', HeaderTooltip: 'CESS Tax Rate' },
    { Header: <div className='font-bold pl-2'>CESS Tax Amount</div>, accessor: 'CESSTaxAmount_V', width: 200, hAlign: 'Left', HeaderTooltip: 'CESS Tax Amount' },
    { Header: <div className='font-bold pl-2'>CESS Tax Amount Currency</div>, accessor: 'CESSTaxAmount_C', width: 300, hAlign: 'Left', HeaderTooltip: 'CESS Tax Amount Currency' },
    { Header: <div className='font-bold pl-2'>CESS Tax Amount Currency Text</div>, accessor: 'CESSTaxAmount_C_Text', width: 350, hAlign: 'Left', HeaderTooltip: 'CESS Tax Amount Currency Text' },
    { Header: <div className='font-bold pl-2'>CGST Tax Rate</div>, accessor: 'CGSTTaxRate', width: 180, hAlign: 'Left', HeaderTooltip: 'CGST Tax Rate' },
    { Header: <div className='font-bold pl-2'>CGST Tax Amount</div>, accessor: 'CGSTTaxAmount_V', width: 200, hAlign: 'Left', HeaderTooltip: 'CGST Tax Amount' },
    { Header: <div className='font-bold pl-2'>CGST Tax Amount Currency</div>, accessor: 'CGSTTaxAmount_C', width: 300, hAlign: 'Left', HeaderTooltip: 'CGST Tax Amount Currency' },
    { Header: <div className='font-bold pl-2'>CGST Tax Amount Currency Text</div>, accessor: 'CGSTTaxAmount_C_Text', width: 350, hAlign: 'Left', HeaderTooltip: 'CGST Tax Amount Currency Text' },
    { Header: <div className='font-bold pl-2'>SGST Tax Rate</div>, accessor: 'SGSTTaxRate', width: 180, hAlign: 'Left', HeaderTooltip: 'SGST Tax Rate' },
    { Header: <div className='font-bold pl-2'>SGST Tax Amount</div>, accessor: 'SGSTTaxAmount_V', width: 200, hAlign: 'Left', HeaderTooltip: 'SGST Tax Amount' },
    { Header: <div className='font-bold pl-2'>SGST Tax Amount Currency</div>, accessor: 'SGSTTaxAmount_C', width: 300, hAlign: 'Left', HeaderTooltip: 'SGST Tax Amount Currency' },
    { Header: <div className='font-bold pl-2'>SGST Tax Amount Currency Text</div>, accessor: 'SGSTTaxAmount_C_Text', width: 350, hAlign: 'Left', HeaderTooltip: 'SGST Tax Amount Currency Text' },
    { Header: <div className='font-bold pl-2'>IGST Tax Rate</div>, accessor: 'IGSTTaxRate', width: 180, hAlign: 'Left', HeaderTooltip: 'IGST Tax Rate' },
    { Header: <div className='font-bold pl-2'>IGST Tax Amount</div>, accessor: 'IGSTTaxAmount_V', width: 200, hAlign: 'Left', HeaderTooltip: 'IGST Tax Amount' },
    { Header: <div className='font-bold pl-2'>IGST Tax Amount Currency</div>, accessor: 'IGSTTaxAmount_C', width: 300, hAlign: 'Left', HeaderTooltip: 'IGST Tax Amount Currency' },
    { Header: <div className='font-bold pl-2'>IGST Tax Amount Currency Text</div>, accessor: 'IGSTTaxAmount_C_Text', width: 350, hAlign: 'Left', HeaderTooltip: 'IGST Tax Amount Currency Text' },
    { Header: <div className='font-bold pl-2'>UGST Tax Rate</div>, accessor: 'UGSTTaxRate', width: 180, hAlign: 'Left', HeaderTooltip: 'UGST Tax Rate' },
    { Header: <div className='font-bold pl-2'>UGST Tax Amount</div>, accessor: 'UGSTTaxAmount_V', width: 200, hAlign: 'Left', HeaderTooltip: 'UGST Tax Amount' },
    { Header: <div className='font-bold pl-2'>UGST Tax Amount Currency</div>, accessor: 'UGSTTaxAmount_C', width: 300, hAlign: 'Left', HeaderTooltip: 'UGST Tax Amount Currency' },
    { Header: <div className='font-bold pl-2'>UGST Tax Amount Currency Text</div>, accessor: 'UGSTTaxAmount_C_Text', width: 350, hAlign: 'Left', HeaderTooltip: 'UGST Tax Amount Currency Text' },
    { Header: <div className='font-bold pl-2'>EPC Amount</div>, accessor: 'EPCAmount_V', width: 200, hAlign: 'Left', HeaderTooltip: 'EPC Amount' },
    { Header: <div className='font-bold pl-2'>EPC Amount Currency</div>, accessor: 'EPCAmount_C', width: 250, hAlign: 'Left', HeaderTooltip: 'EPC Amount Currency' },
    { Header: <div className='font-bold pl-2'>EPC Amount Currency Text</div>, accessor: 'EPCAmount_C_Text', width: 300, hAlign: 'Left', HeaderTooltip: 'EPC Amount Currency Text' },
    { Header: <div className='font-bold pl-2'>HSN</div>, accessor: 'HSN', width: 150, hAlign: 'Left', HeaderTooltip: 'HSN' },
    { Header: <div className='font-bold pl-2'>Dealer Code</div>, accessor: 'DealerCode', width: 180, hAlign: 'Left', HeaderTooltip: 'Dealer Code' },
    { Header: <div className='font-bold pl-2'>GL Account 1</div>, accessor: 'GLAccount1', width: 180, hAlign: 'Left', HeaderTooltip: 'GL Account 1' },
    { Header: <div className='font-bold pl-2'>TCS GL Account</div>, accessor: 'TCSGLAccount', width: 180, hAlign: 'Left', HeaderTooltip: 'TCS GL Account' },
    { Header: <div className='font-bold pl-2'>Profit Center</div>, accessor: 'ProfitCenter', width: 200, hAlign: 'Left', HeaderTooltip: 'Profit Center' },
    { Header: <div className='font-bold pl-2'>Creation Date</div>, accessor: 'CreationDate', width: 200, hAlign: 'Left', HeaderTooltip: 'Creation Date' },
    { Header: <div className='font-bold pl-2'>Selling Price</div>, accessor: 'SellingPrice_V', width: 200, hAlign: 'Left', HeaderTooltip: 'Selling Price' },
    { Header: <div className='font-bold pl-2'>Selling Price Currency</div>, accessor: 'SellingPrice_C', width: 250, hAlign: 'Left', HeaderTooltip: 'Selling Price Currency' },
    { Header: <div className='font-bold pl-2'>Selling Price Currency Text</div>, accessor: 'SellingPrice_C_Text', width: 300, hAlign: 'Left', HeaderTooltip: 'Selling Price Currency Text' },
    { Header: <div className='font-bold pl-2'>Status</div>, accessor: 'Status', width: 150, hAlign: 'Left', HeaderTooltip: 'Status' },
    { Header: <div className='font-bold pl-2'>Status Text</div>, accessor: 'Status_Text', width: 200, hAlign: 'Left', HeaderTooltip: 'Status Text' },
    { Header: <div className='font-bold pl-2'>Remarks</div>, accessor: 'Remarks', width: 400, hAlign: 'Left', HeaderTooltip: 'Remarks' },
    { Header: <div className='font-bold pl-2'>Business Place</div>, accessor: 'BusinessPlace', width: 200, hAlign: 'Left', HeaderTooltip: 'Business Place' },
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

  const fetchData = async () => {
    if (!branch || !date || !park) return;

    const formattedDate = formatDate(date);
    const url = `https://my403545-api.s4hana.cloud.sap/sap/opu/odata/sap/YY1_SO_EXCEL_UPLOAD_CDS/YY1_SO_EXCEL_UPLOAD?$filter=CreationDate eq datetime'${formattedDate}' and Branch eq '${branch}'&$format=json`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Basic ' + btoa('INTEGRATION:UT8BsHhZkz-cPbMRcvCiaMRzqngFlSAQZTxZBvGM')
        }
      });

      const json = await response.json();
      const results = json?.d?.results || [];

      const parsed = results.map((item) => ({
        sno: item.SNo,
        soldToParty: item.SoldToParty,
        orderType: item.OrderType,
        status: item.SAP_LifecycleStatus_Text,
        branch: item.Branch_Text
      }));

      setTableData(parsed);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData2 = async () => {
    const username = "INTEGRATION";
    const password = "UT8BsHhZkz-cPbMRcvCiaMRzqngFlSAQZTxZBvGM";
    const basicAuth = btoa(`${username}:${password}`);

    try {
      const url = "https://073013bftrial-dev-anant-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/anant/YY1_SO_EXCEL_UPLOAD";
      const response = await axios.get(
        url, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Basic ${basicAuth}`,
        }
      }
      );

      if (response.status === 200) {
        const results = response.data.value || [];
        const parsed = results.map((item) => ({
          sno: item.SNo,
          soldToParty: item.SoldToParty,
          orderType: item.OrderType,
          status: item.SAP_LifecycleStatus_Text,
          branch: item.Branch_Text
        }));

        setTableData(parsed);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData3 = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sales');
      if (response.status === 200) {
        console.log('----- results ------');
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const destinationApi = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/destination`);
      if (response.status === 200) {
        console.log('----- results ------');
        console.log("Branch:", branch);
        console.log("From Date:", fromDate);
        console.log("To Date:", toDate);
        console.log("Park/Post:", park);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
      setSelectedRowsData(selectedRowObjects);
      setSelectedRowIds(newSelectedIds);
    }
    else if (selectedCount === 0) {
      selectedRowObjects = [];

      setSelectedRowsData(selectedRowObjects);
      setSelectedRowIds({});
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
      setSelectedRowsData(selectedRowObjects);
      setSelectedRowIds(newSelectedIds);
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
    console.log('Edit row:', rowData._originalData);
    navigate('/edit-master', {
      state: {
        rowData: rowData._originalData
      }
    });
  };

  const handleDelete = (rowData) => {
    console.log('Delete row:', rowData);
  };

  const fetchDateFilterData = async () => {
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);
    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    const res = await axios.get(`${API_BASE}/api/salesDateFilter`, {
      params: { fromDate: formattedFromDate, toDate: formattedToDate }
    });

    return res.data;
  };

  const fetchCountRecordData = async () => {
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);
    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    const res = await axios.get(`${API_BASE}/api/salesRecordCount`, {
      params: { fromDate: formattedFromDate, toDate: formattedToDate }
    });

    return res.data;
  };

  const fetchParkStatusData = async () => {
    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);
    const API_BASE = import.meta.env.VITE_API_BASE_URL;


    try {
      const res = await axios.get(`${API_BASE}/api/salesParkStatus`, {
        params: {
          fromDate: formattedFromDate,
          toDate: formattedToDate,
          status: park
        }
      });

      console.log("API Response data:", res.data);

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
    console.log("Starting handleFetchAll");
    try {
      console.log("Calling APIs...");
      setLoading(true);
      setError(null);
      const [dateFilterRes, countRecordRes, parkStatusRes] = await Promise.all([
        fetchDateFilterData(),
        fetchCountRecordData(),
        fetchParkStatusData()
      ]);

      console.log("ParkStatus response:", parkStatusRes);
      console.log("Count:", parkStatusRes.count);
      console.log("Results:", parkStatusRes.results);

      setTotalCount(parseInt(parkStatusRes.count) || 0);
      setTableData(parkStatusRes.results || []);

      console.log("State updated - count:", totalCount, "data:", tableData);
    } catch (err) {
      setError(err.message);
      console.error("Error in handleFetchAll:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Current tableData:", tableData);
  }, [tableData]);



  return (
    <div className="p-0 pt-10 bg-gray-100 min-h-screen">
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
        }}
      >

        <Toolbar
          style={{
            backgroundColor: 'white',
            padding: '1rem',
            marginBottom: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            width: '100%',
            height: '150px'
          }}
        >
          <div style={{ display: 'flex', flexGrow: 1, gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Label showColon style={{ width: '80px' }}>Branch</Label>
                <ComboBox
                  placeholder="Select Branch"
                  style={{ width: '256px' }}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <ComboBoxItem text="01" />
                  <ComboBoxItem text="02" />
                </ComboBox>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Label showColon style={{ width: '80px' }}>From Date</Label>
                <DatePicker
                  style={{ width: '256px' }}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Label showColon style={{ width: '80px' }}>To Date</Label>
                <DatePicker
                  style={{ width: '256px' }}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Label showColon style={{ width: '80px' }}>Park/Post</Label>
                <ComboBox
                  placeholder="Select"
                  style={{ width: '256px' }}
                  onChange={(e) => setPark(e.target.value)}
                >
                  <ComboBoxItem text=" " />
                  <ComboBoxItem text="01" />
                  <ComboBoxItem text="02" />
                  <ComboBoxItem text="03" />
                </ComboBox>
              </div>

            </div>
          </div>

          <ToolbarSpacer />

          <Button
            design="Emphasized"
            onClick={handleFetchAll}
            disabled={!fromDate || !toDate || !park}
          >
            Fetch
          </Button>
        </Toolbar>

        <div className="bg-white p-4 shadow w-full pb-5"
        >
          <AnalyticalTable
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