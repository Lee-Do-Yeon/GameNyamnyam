import React from 'react';


export default function gamemodal({setaddgame}) {
  const appid = '1811260'
  const closeaddgame = () => {
    setaddgame(false);
  }
  return (
    <div className='h-screen w-full fixed left-0 top-0 bg-black bg-opacity-0' onClick={closeaddgame}>
    <div 
    className="absolute inset-x-0 bottom-0 flex flex-row bg-black bg-opacity-80 gap-4 py-4 px-8"
    >
      {/* 무조건 4개 추천해준다는 가정으로 그냥 이렇게 만들거임 */}
      <a href={`https://store.steampowered.com/app/${appid}/EA_SPORTS_FIFA_23/`} target="_blank" rel="noopener noreferrer">
        <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/header.jpg?t=1679504733" alt="" className='rounded-lg'/>
      </a>
    </div>
      </div>
  );
}
