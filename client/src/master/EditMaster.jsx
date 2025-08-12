import {
    Bar,
    Button,
    Input,
    Label,
    Page,
    Table,
    TableCell,
    TableHeaderCell,
    TableHeaderRow,
    TableRow,
    TableVirtualizer,
    Toolbar,
    ToolbarSpacer
} from '@ui5/webcomponents-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function EditMaster() {

    const location = useLocation();
    const navigate = useNavigate();
    const { state = {} } = location;
    const { rowData } = state;

    const [formData, setFormData] = useState({
        fileName: '',
        registerNumber: '',
        invoiceNumber: '',
        fullModelCode: '',
        vinNo: '',
        engineNo: '',
        jobType: '',
        placeOfSupply: '',
        contactName: '',
        contactPhone: '',
        customerBillTo: '',
        customerShipTo: '',
        gstin: '',
        invoiceType: '',
        branchCode: '',
    });

    useEffect(() => {
        console.log('------------');
        console.log(rowData);
        if (rowData) {
            setFormData({
                fileName: rowData.header.fileName || '',
                registerNumber: rowData.header.registerNumber || '',
                invoiceNumber: rowData.header.invoiceNumber || '',
                fullModelCode: rowData.header.fullModelCode || '',
                vinNo: rowData.header.vinNo || '',
                engineNo: rowData.header.engineNo || '',
                jobType: rowData.header.jobType || '',
                contactName: rowData.header.contactName || '',
                contactPhone: rowData.header.contactPhone || '',
                customerBillTo: rowData.header.customerBillTo || '',
                customerShipTo: rowData.header.customerShipTo || '',
                gstin: rowData.header.gstin || '',
                invoiceType: rowData.header.invoiceType || '',
                branchCode: rowData.header.branchCode || '',
                placeOfSupply: rowData.header.placeOfSupply || '',
            });
        }
    }, [rowData]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        console.log('Saving data:', formData);
        navigate('/master');
    };

    const handleBack = () => {
        navigate('/master');
    };

    const lineItemColumns = [
        { Header: 'Type', accessor: 'type' },
        { Header: 'Part No', accessor: 'partNo' },
        { Header: 'Description', accessor: 'description' },
        { Header: 'HSN', accessor: 'hsn' },
        { Header: 'Quantity', accessor: 'quantity' },
        { Header: 'UOM', accessor: 'uom' },
        { Header: 'Unit Price', accessor: 'unitPrice' },
        { Header: 'Taxable Value', accessor: 'taxableValue' },
        { Header: 'Amount with Tax', accessor: 'amountWithTax' }
    ];


    return (
        <div className="p-0 pt-10 bg-gray-100 min-h-screen">
            <Page
                backgroundDesign='Solid'
                style={{
                    height: 'calc(100vh - 5rem)',
                    position: 'relative',
                    padding: '1.5rem',
                }}
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
                                <div className="flex space-x-2">
                                    <Button
                                        design='Transparent'
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        design='Transparent'
                                        onClick={handleSave}
                                    >
                                        Save
                                    </Button>
                                </div>
                            }
                        />
                    </div>
                }
            >
                <div style={{ flexShrink: 0 }}>
                    <Toolbar
                        style={{
                            backgroundColor: 'white',
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            width: '100%',
                            height: '250px',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>File Name</Label>
                                    <Input
                                        disabled
                                        value={formData.fileName}
                                        onChange={(e) => handleInputChange('fileName', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Register No</Label>
                                    <Input
                                        disabled
                                        value={formData.registerNumber}
                                        onChange={(e) => handleInputChange('registerNumber', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Invoice No</Label>
                                    <Input
                                        disabled
                                        value={formData.invoiceNumber}
                                        onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Model Code</Label>
                                    <Input
                                        disabled
                                        value={formData.fullModelCode}
                                        onChange={(e) => handleInputChange('fullModelCode', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>VIN No</Label>
                                    <Input
                                        disabled
                                        value={formData.vinNo}
                                        onChange={(e) => handleInputChange('vinNo', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Engine No</Label>
                                    <Input
                                        disabled
                                        value={formData.engineNo}
                                        onChange={(e) => handleInputChange('engineNo', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Job Type</Label>
                                    <Input
                                        disabled
                                        value={formData.jobType}
                                        onChange={(e) => handleInputChange('jobType', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Place of Supply</Label>
                                    <Input
                                        disabled
                                        value={formData.placeOfSupply}
                                        onChange={(e) => handleInputChange('placeOfSupply', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Contact Name</Label>
                                    <Input
                                        disabled
                                        value={formData.contactName}
                                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Contact Phone</Label>
                                    <Input
                                        disabled
                                        value={formData.contactPhone}
                                        onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Bill To</Label>
                                    <Input
                                        disabled
                                        value={formData.customerBillTo}
                                        onChange={(e) => handleInputChange('customerBillTo', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Ship To</Label>
                                    <Input
                                        disabled
                                        value={formData.customerShipTo}
                                        onChange={(e) => handleInputChange('customerShipTo', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>GSTIN</Label>
                                    <Input
                                        disabled
                                        value={formData.gstin}
                                        onChange={(e) => handleInputChange('gstin', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Invoice Type</Label>
                                    <Input
                                        disabled
                                        value={formData.invoiceType}
                                        onChange={(e) => handleInputChange('invoiceType', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Branch Code</Label>
                                    <Input
                                        disabled
                                        value={formData.branchCode}
                                        onChange={(e) => handleInputChange('branchCode', e.target.value)}
                                    />
                                </div>
                                <div style={{ height: '40px', visibility: 'hidden' }}></div>
                            </div>
                        </div>
                    </Toolbar>
                </div>


                <div
                    style={{
                        flex: 1,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                >
                    <div
                        style={{
                            overflowY: 'auto',
                            flex: 1,
                            position: 'relative'
                        }}
                    >
                        <Table
                            className="tableHeightContentDensity"
                            style={{
                                borderCollapse: 'separate',
                                borderSpacing: 0,
                                width: '100%',
                                minWidth: 'fit-content',
                                height: '500px'
                            }}
                            headerRow={
                                <TableHeaderRow
                                    sticky
                                    style={{
                                        borderBottom: '3px solid #e0e0e0',
                                        backgroundColor: '#f5f5f5',
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: 1
                                    }}
                                >
                                    {lineItemColumns.map(column => (
                                        <TableHeaderCell
                                            key={column.accessor}
                                            style={{
                                                padding: '0.75rem 1rem',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {column.Header}
                                        </TableHeaderCell>
                                    ))}
                                </TableHeaderRow>
                            }
                        >
                            {rowData?.lineItems?.map((item, index) => (
                                <TableRow
                                    key={index}
                                    position={index}
                                    style={{
                                        borderBottom: '1px solid #e0e0e0',
                                        ':hover': {
                                            backgroundColor: '#f9f9f9'
                                        }
                                    }}
                                >
                                    {lineItemColumns.map(column => (
                                        <TableCell
                                            key={`${index}-${column.accessor}`}
                                            style={{
                                                padding: '0.75rem 1rem',
                                            }}
                                        >
                                            <span>
                                                {item[column.accessor]}
                                            </span>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </Table>
                    </div>
                </div>
            </Page>


        </div>
    )
}

export default EditMaster