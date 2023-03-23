import React from 'react';
import ImgBox from './Imgbox';

export default function gamemodal() {
    return(
        <div className='border-2 absolute inset-x-0 bottom-0 h-2/6 flex justify-center space-x-3 bg-black bg-opacity-50'>
            <ImgBox />
            <ImgBox />
            <ImgBox />
            <ImgBox />
        </div>
    );
}