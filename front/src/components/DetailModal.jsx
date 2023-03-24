import React from 'react';
import Tag from './Tag';

export default function Detail({ setInfo }) {
  const closeInfo = () => {
    setInfo(false);
  };
  return (
    <div className="relative font-semibold text-white ">
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-30 text-center">
        <div className="w-2/3 rounded-lg bg-neutral-600 grid grid-cols-12 grid-flow-row gap-4 p-4 drop-shadow-2xl">
          <header className="col-span-5 text-left pl-5 text-4xl mt-4">
            제목
          </header>
          <div className="col-start-12">
            <button onClick={closeInfo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="w-6 h-6 text-white-700"
                viewBox="0 0 1792 1792"
              >
                <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
              </svg>
            </button>
          </div>
          <div className="col-span-7 h-18 ">
            <img
              src="https://cdn.akamai.steamstatic.com/steam/apps/793543/header.jpg?t=1520446355"
              alt=""
              className="w-full h-full rounded"
            />
          </div>

          <div className="col-span-5 text-left bg-neutral-700 rounded-lg pt-2 relative">
            <div className="ml-4 p-2">평점 : 73</div>
            <div className="ml-4 p-2">장르 : 어드벤쳐, 인디, 시뮬레이션</div>
            <div className="ml-4 p-2">
              태그 : <Tag />{' '}
            </div>
            <div className="absolute bottom-4 flex flex-row">
              <div className='bg-yellow-300 font-bold rounded-lg text-sm text-black px-5 py-2.5 text-center col-start-12 mx-5 mt-4 ml-6'> 
               ₩ : 21000
              </div>
              <button className="bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg text-sm text-black px-5 py-2.5 text-center col-start-12 mx-5 mt-4 ml-20">
                접시 가져오기
              </button>
            </div>
          </div>
           
          <div className="col-span-12 text-left h-56 bg-neutral-700 rounded-lg pt-2">
            <div>
              <div className="p-2">출시일 : </div>
              <div className="p-2">개발사 : </div>
            </div>
            <div className="p-2"> 설명 </div>
          </div>
        </div>
      </div>
    </div>
  );
}
