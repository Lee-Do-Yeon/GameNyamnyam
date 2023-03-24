import React, {useState} from 'react';
import ReceiptModal from './ReceiptModal';

export default function Receipt() {
    const [receipt, setreceipt] = useState(false);

    const openreceipt = () => {
        setreceipt(!receipt)
    };

    return (
        <div className='border-2'>
            <button onClick={openreceipt}> 메뉴판 보기 </button>
            {receipt && <ReceiptModal setreceipt = {openreceipt} />}
        </div>
    );
}