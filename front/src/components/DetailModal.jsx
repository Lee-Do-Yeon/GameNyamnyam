import React from 'react';

export default function Detail({setInfo}) {
  const closeInfo = () => {
    setInfo(false);
  }
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-30 text-center" >
      <div className="container w-2/3 border-2 rounded bg-gray-300 grid grid-cols-12 grid-flow-row gap-4">
        <header className="col-span-5 text-left pl-5 text-4xl mt-4"> 제목  </header>
        <div className="col-start-12 pr-4 border-4" > <button className='text-xl text-center' onClick = {closeInfo}> X </button> </div>
        <div className="col-span-7 place-content-center border-4 h-18 rounded"> 
          <img src='https://cdn.akamai.steamstatic.com/steam/apps/793543/header.jpg?t=1520446355' 
          alt=""
          className='w-full h-full' />
          460*215
        </div>
        <div className="col-span-5 border-4 text-left bg-gray-500 rounded-lg">
          <div className='ml-4'>평점 :</div>
          <div className='ml-4'>장르 :</div>
          <div className='ml-4'>태그 : </div>
          <button
          className="bg-yellow-300 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center col-start-12"
          >
            접시 가져오기
          </button>
        </div>
        <div className="col-span-12 border-4 text-left h-80 bg-gray-500 rounded-lg">
           <div>
            <div>출시일 : </div>
            <div>개발사 : </div>
           </div>
           <div> 설명</div>
           </div>
      </div>
    </div>
  );
}
