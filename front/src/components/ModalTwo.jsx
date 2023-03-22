import React from 'react';
import ImgBox from './Imgbox';
export default function Modal({ setOpenModal }, props) {
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-30 text-center z-10">
      <div className="bg-gray-300 min-w-[500px] min-h-[450px] rounded">
        <div className='flex justify-between'>
        <h1 className="font-extrabold">이 게임의 이름</h1>
        <button onClick={setOpenModal}> X </button>
        </div> 

        <div className="flex justify-stretch px-4">
          <a href="https://www.naver.com">
          <ImgBox className="px-4" />
          </a>
          <div className="px-4">정보창</div>
        </div>
        <div>설명창 {props.name} 
        <span>
            실망이야 
        </span>
        </div>
      </div>
    </div>
  );
}
