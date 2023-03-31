import React from 'react';

export default function Modal({ setreceipt }) {
  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-30 text-center z-10'
    onClick={setreceipt}>
        <img src="/src/assets/receipt.png" alt="" />
    </div>
  );
}
