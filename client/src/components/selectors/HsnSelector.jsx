import { Button, Input, Label, ListItemStandard, SelectDialog } from '@ui5/webcomponents-react';
import React, { useState } from 'react'
import { useMaster } from '../../pages/master/MasterContext';

function HsnSelector() {

    const { masterState, setMasterState } = useMaster();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const hsnCodes = [
        "87032391", "87032392", "87032393", "87032394", "87032395",
        "87032396", "87032397", "87032398", "87032399", "87032400",
        "87032401", "87032402", "87032403", "87032404", "87032405",
        "87032406", "87032407", "87032408", "87032409", "87032410"
    ];

    const filteredHsnCodes = searchTerm ?
        hsnCodes.filter(hsn =>
            hsn.includes(searchTerm)
        )
        : hsnCodes;

    const handleConfirm = (e) => {
        if (e.detail.selectedItems.length > 0) {
            setMasterState(prev => ({
                ...prev,
                hsn: e.detail.selectedItems[0].text
            }));
        }
        setIsDialogOpen(false);
    };


  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Label showColon style={{ width: '80px' }}>HSN</Label>
            <Input
                value={masterState.hsn || ''}
                placeholder='Select HSN code'
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
                headerText='Select HSN Code'
                onCancel={() => setIsDialogOpen(false)}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleConfirm}
                onSearchInput={(e) => setSearchTerm(e.detail.value)}
                onSearchReset={() => setSearchTerm('')}
            >
                {filteredHsnCodes.map(hsn => (
                    <ListItemStandard
                        key={hsn}
                        text={hsn}
                    />
                ))}
            </SelectDialog>
        </div>
  )
}

export default HsnSelector