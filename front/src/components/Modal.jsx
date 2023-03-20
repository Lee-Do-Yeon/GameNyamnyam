import React from 'react';

export default function Modal({ setOpenModal }) {
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-30 text-center">
        <div className="bg-white rounded">
          <div className="border-b px-4 py-2 flex justify-between items-center">
            <h1 className="font-extrabold text-red-400"> 이게 모달이여 </h1>
            <span onClick={setOpenModal} className="text-red-500">
              X
            </span>
          </div>

          <div className="text-gray-500 text-sm px-4 py-8">
            1 개 이상 항목 선택 항목창이아주 스무스하게 잘 되는거 같은 <br /> 느낌이 들었지만 w와h가 조절이 안되는 이상황을 어떻게 해야할지 잘 모르겠따.... 오늘의 일기 끝
          </div>

          <div className="flex justify-end items-center w-100 border-t p-3 text-gray-500">
            <button
              onClick={setOpenModal}
              className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white"
            >
              확인
            </button>
          </div>
        </div>
    </div>
  );
}
