import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Modal({ setCanLogin }) {
  const navigate = useNavigate();

  const goToMain = () => {
    setCanLogin(false);
    navigate('/');
  };
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-30 z-10 font-jamsil">
      <div>
        <div className="w-[40vw] h-[90vh] p-3 overflow-scroll box2 rounded-md bg-neutral-600 text-white">
          <h1 className="text-center text-2xl my-6">
            현재 스팀 아이디가 비공개 상태입니다.
          </h1>
          <p className="pl-4 my-2">
            1. 스팀 페이지 오른쪽 위의 프로필을 클릭하세요
          </p>
          <div className="steamprofile w-[35vw] h-[10vh] m-auto"></div>
          <p className="pl-4 mt-8 mb-2">2. 프로필 수정 버튼을 눌러주세요.</p>
          <div className="steamprofile2 w-[35vw] h-[22vh] ml-[2vw]"></div>
          <p className="pl-4 mt-8 mb-2">3. 프로필 비공개를 공개로 바꾸어주세요!</p>
          <div className="alertimage h-[30vh] ml-[5vw]"></div>
          <div className="flex justify-center my-2">
            <button
              onClick={goToMain}
              className="bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg p-4 text-black mt-5"
            >
              게임 냠냠을 즐기러 가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
