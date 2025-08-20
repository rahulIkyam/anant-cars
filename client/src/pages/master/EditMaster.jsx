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
import { useMaster } from './MasterContext';

function EditMaster() {

    const location = useLocation();
    const navigate = useNavigate();
    const { state = {} } = location;
    const { rowData } = state;
    const { masterState } = useMaster();

    const [formData, setFormData] = useState({
        invoiceAmount: '',
        engineNumber: '',
        modelDescription: '',
        sellingPrice: '',
        dealerDiscount: '',
        oemSchemeDiscount: '',
        corporateDiscountAmount: '',
        tcsAmount: '',
        cessTaxRate: '',
        cessTaxAmount: '',
        cgstTaxRate: '',
        cgstTaxAmount: '',
        sgstTaxRate: '',
        sgstTaxAmount: '',
        igstTaxRate: '',
        igstTaxAmount: '',
        ugstTaxRate: '',
        ugstTaxAmount: '',
        epcAmount: ''
    });

    useEffect(() => {
        console.log('------------');
        console.log(rowData);
        if (rowData) {
            setFormData({
                invoiceAmount: rowData.InvoiceAmount_V || '',
                engineNumber: rowData.EngineNumber || '',
                modelDescription: rowData.ModelDescription || '',
                sellingPrice: rowData.SellingPrice_V || '',
                dealerDiscount: rowData.DealerDiscount_V || '',
                oemSchemeDiscount: rowData.OEMSchemeDiscount_V || '',
                corporateDiscountAmount: rowData.CorporateDiscountAmount_V || '',
                tcsAmount: rowData.TCSAmount_V || '',
                cessTaxRate: rowData.CESSTaxRate || '',
                cessTaxAmount: rowData.CESSTaxAmount_V || '',
                cgstTaxRate: rowData.CGSTTaxRate || '',
                cgstTaxAmount: rowData.CGSTTaxAmount_V || '',
                sgstTaxRate: rowData.SGSTTaxRate || '',
                sgstTaxAmount: rowData.SGSTTaxAmount_V || '',
                igstTaxRate: rowData.IGSTTaxRate || '',
                igstTaxAmount: rowData.IGSTTaxAmount_V || '',
                ugstTaxRate: rowData.UGSTTaxRate || '',
                ugstTaxAmount: rowData.UGSTTaxAmount_V || '',
                epcAmount: rowData.EPCAmount_V || '',
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
        navigate('/sales-register');
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
                                    <Label showColon style={{ width: '80px' }}>Invoice Amount</Label>
                                    <Input
                                        disabled
                                        value={formData.invoiceAmount}
                                        onChange={(e) => handleInputChange('invoiceAmount', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Engine No</Label>
                                    <Input
                                        disabled
                                        value={formData.engineNumber}
                                        onChange={(e) => handleInputChange('engineNumber', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Model Description</Label>
                                    <Input
                                        disabled
                                        value={formData.modelDescription}
                                        onChange={(e) => handleInputChange('modelDescription', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Selling Price</Label>
                                    <Input
                                        disabled
                                        value={formData.sellingPrice}
                                        onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Dealer Discount</Label>
                                    <Input
                                        disabled
                                        value={formData.dealerDiscount}
                                        onChange={(e) => handleInputChange('dealerDiscount', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>OEM Scheme Discount</Label>
                                    <Input
                                        disabled
                                        value={formData.oemSchemeDiscount}
                                        onChange={(e) => handleInputChange('oemSchemeDiscount', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>Corporate Discount Amount</Label>
                                    <Input
                                        disabled
                                        value={formData.corporateDiscountAmount}
                                        onChange={(e) => handleInputChange('corporateDiscountAmount', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>TCS Amount</Label>
                                    <Input
                                        disabled
                                        value={formData.tcsAmount}
                                        onChange={(e) => handleInputChange('tcsAmount', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>CESS Tax Rate</Label>
                                    <Input
                                        disabled
                                        value={formData.cessTaxRate}
                                        onChange={(e) => handleInputChange('cessTaxRate', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>CESS Tax Amount</Label>
                                    <Input
                                        disabled
                                        value={formData.cessTaxAmount}
                                        onChange={(e) => handleInputChange('cessTaxAmount', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>CGST Tax Rate</Label>
                                    <Input
                                        disabled
                                        value={formData.cgstTaxRate}
                                        onChange={(e) => handleInputChange('cgstTaxRate', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>CGST Tax Amount</Label>
                                    <Input
                                        disabled
                                        value={formData.cgstTaxAmount}
                                        onChange={(e) => handleInputChange('cgstTaxAmount', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>SGST Tax Rate</Label>
                                    <Input
                                        disabled
                                        value={formData.sgstTaxRate}
                                        onChange={(e) => handleInputChange('sgstTaxRate', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>SGST Tax Amount</Label>
                                    <Input
                                        disabled
                                        value={formData.sgstTaxAmount}
                                        onChange={(e) => handleInputChange('sgstTaxAmount', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>IGST Tax Rate</Label>
                                    <Input
                                        disabled
                                        value={formData.igstTaxRate}
                                        onChange={(e) => handleInputChange('igstTaxRate', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>IGST Tax Amount</Label>
                                    <Input
                                        disabled
                                        value={formData.igstTaxAmount}
                                        onChange={(e) => handleInputChange('igstTaxAmount', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>UGST Tax Rate</Label>
                                    <Input
                                        disabled
                                        value={formData.ugstTaxRate}
                                        onChange={(e) => handleInputChange('ugstTaxRate', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>UGST Tax Amount</Label>
                                    <Input
                                        disabled
                                        value={formData.ugstTaxAmount}
                                        onChange={(e) => handleInputChange('ugstTaxAmount', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Label showColon style={{ width: '80px' }}>EPC Amount</Label>
                                    <Input
                                        disabled
                                        value={formData.epcAmount}
                                        onChange={(e) => handleInputChange('epcAmount', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </Toolbar>
                </div>


                {/* <div
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
                </div> */}
            </Page>


        </div>
    )
}

export default EditMaster