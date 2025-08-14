import { Button, Input, Label, ListItemStandard, SelectDialog } from '@ui5/webcomponents-react';
import React, { useState } from 'react'
import { useMaster } from '../../master/MasterContext';

function CustomerNameSelector() {

    const { masterState, setMasterState } = useMaster();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const customerNames = [
        "MAHINDRA AND MAHINDRA FINANCIAL SERVICES LIMITED",
        "TATA MOTORS FINANCE LIMITED",
        "HDFC BANK LTD",
        "ICICI BANK LTD",
        "AXIS BANK LTD",
        "KOTAK MAHINDRA BANK LTD",
        "BAJAJ FINANCE LTD",
        "SHRI RAM TRANSPORT FINANCE CO LTD",
        "CHOLAMANDALAM INVESTMENT AND FINANCE CO LTD",
        "SUNDARAM FINANCE LTD",
        "MUTHOOT FINANCE LTD",
        "MANAPPURAM FINANCE LTD",
        "L&T FINANCE LTD",
        "ADITYA BIRLA FINANCE LTD",
        "PUNJAB NATIONAL BANK",
        "STATE BANK OF INDIA",
        "BANK OF BARODA",
        "CANARA BANK",
        "UNION BANK OF INDIA",
        "INDIAN BANK"
    ];

        const filteredCustomers = searchTerm ?
        customerNames.filter(name =>
            name.toLowerCase().includes(searchTerm.toLowerCase())
        ) : customerNames;

    const handleConfirm = (e) => {
        if (e.detail.selectedItems.length > 0) {
            setMasterState(prev => ({
                ...prev,
                customerName: e.detail.selectedItems[0].text
            }));
        }
        setIsDialogOpen(false);
    };


  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Label showColon style={{ width: '80px' }}>Customer Name</Label>
            <Input
                value={masterState.customerName || ''}
                placeholder='Select customer name'
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
                headerText='Select Customer Name'
                onCancel={() => setIsDialogOpen(false)}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleConfirm}
                onSearchInput={(e) => setSearchTerm(e.detail.value)}
                onSearchReset={() => setSearchTerm('')}
            >
                {filteredCustomers.map(customer => (
                    <ListItemStandard
                        key={customer}
                        text={customer}
                    />
                ))}
            </SelectDialog>
        </div>
  )
}

export default CustomerNameSelector