import React from 'react';
import ImgBox from './Imgbox';

export default function gamemodal() {
    return(
        <div className='border-2 absolute inset-x-0 bottom-0 h-48 flex justify-center space-x-3 bg-black'>
            <ImgBox />
            <ImgBox />
            <ImgBox />
            <ImgBox />
        </div>
    );
}