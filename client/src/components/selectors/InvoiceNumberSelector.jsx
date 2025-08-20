import React, { useState } from 'react'
import { Button, Input, Label, ListItemStandard, SelectDialog } from '@ui5/webcomponents-react';
import { useMaster } from '../../pages/master/MasterContext';

function InvoiceNumberSelector() {

    const { masterState, setMasterState } = useMaster();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const invoiceNumbers = [
        "INV26A000459", "INV26A000460", "INV26A000461",
        "INV26A000462", "INV26A000463", "INV26A000464",
        "INV26A000465", "INV26A000466", "INV26A000467",
        "INV26A000468", "INV26A000469", "INV26A000470",
        "INV26A000471", "INV26A000472", "INV26A000473",
        "INV26A000474", "INV26A000475", "INV26A000476",
        "INV26A000477", "INV26A000478"
    ];

    const filteredInvoices = searchTerm ?
        invoiceNumbers.filter(invoice =>
            invoice.toLowerCase().includes(searchTerm.toLowerCase())
        ) : invoiceNumbers;

    const handleConfirm = (e) => {
        if (e.detail.selectedItems.length > 0) {
            setMasterState(prev => ({
                ...prev,
                invoiceNumber: e.detail.selectedItems[0].text
            }));
        }
        setIsDialogOpen(false);
    };

    const handleSearchInput = (e) => {
        setSearchTerm(e.detail.value);
    };

    const handleSearchReset = () => {
        setSearchTerm('');
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Label showColon style={{ width: '80px' }}>Invoice Number</Label>
            <Input
                value={masterState.invoiceNumber || ''}
                placeholder='Select invoice number'
                style={{ width: '256px' }}
                onFocus={() => setIsDialogOpen(true)}
                readonly
            />
            <Button
                design="Transparent"
                icon="slim-arrow-down"
                onClick={() => setIsDialogOpen(true)}
            />

            <SelectDialog
                open={isDialogOpen}
                headerText='Select Invoice Number'
                onCancel={() => setIsDialogOpen(false)}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleConfirm}
                onSearchInput={handleSearchInput}
                onSearchReset={handleSearchReset}
            >
                {filteredInvoices.map(invoice => (
                    <ListItemStandard
                        key={invoice}
                        text={invoice}
                    />
                ))}
            </SelectDialog>
        </div>
    )
}

export default InvoiceNumberSelector