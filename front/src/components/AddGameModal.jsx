import React from 'react';
import ImgBox from './Imgbox';

export default function gamemodal({setaddgame}) {
  const closeaddgame = () => {
    setaddgame(false);
  }
  return (
    <div 
    className="absolute inset-x-0 bottom-0 flex justify-center space-x-3 bg-black bg-opacity-80 gap-4 py-4"
    onClick={closeaddgame}>
      <a href="https://www.naver.com" target="_blank" rel="noopener noreferrer" className='mx-4'>
        <ImgBox />
      </a>
      <a href="https://www.naver.com" target="_blank" rel="noopener noreferrer" className='mx-4'>
        <ImgBox />
      </a>
      <a href="https://www.naver.com" target="_blank" rel="noopener noreferrer" className='mx-4'>
        <ImgBox />
      </a>
      <a href="https://www.naver.com" target="_blank" rel="noopener noreferrer" className='mx-4'>
        <ImgBox />
      </a>
    </div>
  );
}
