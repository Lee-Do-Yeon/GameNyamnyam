import React, {useState} from 'react';
import ReceiptModal from './ReceiptModal';

export default function Receipt() {
    const [receipt, setreceipt] = useState(false);

    const openreceipt = () => {
        setreceipt(!receipt)
    };

    return (
        <div className="menu" onClick={openreceipt}> 
            {receipt && <ReceiptModal setreceipt = {openreceipt} />}
        </div>
    );
}