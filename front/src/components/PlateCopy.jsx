import React from 'react';
import Slider from 'react-slick';

import '../index.css';
// import { ReactComponent as Next } from "../assets/bell.png";
// import { ReactComponent as Prev } from "../assets/bell.png";

export default function Plate() {
  // console.log(myValue.price);
  // const changeColor = (price) => {
  //   if (price === 0) {
  //     return '#FEF874';
  //   } else if (0 < price && price <= 10000) {
  //     return '#92C63A';
  //   } else if (10000 < price && price <= 30000) {
  //     return '#DB4646';
  //   } else if (30000 < price && price <= 50000) {
  //     return '#454FAA';
  //   } else if (50000 < price) {
  //     return '#373737';
  //   }
  // };
  // const backgroundColor = changeColor(myValue.price);
  const appid = '1811260'

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // appendArrows: $('#arrows'),
    // arrows:false,
    // prevArrow: "<button type='button' className='slick-next'>Next</button>", // 이전 화살표 모양 설정"<button type='button' class='slick-prev'>Previous</button>"
    // nextArrow: "<button type='button' className='slick-prev'>Prev</button>",
   
  };

  return (
    <>
    <Slider {...settings}>
      {/* map으로 정보 배정 시킬거임 */}
      
      {/* 1번게임 */}
      <div className='h-[450px]'>
        <div className='w-full h-full flex items-center justify-center'>
          <div className='ellipse bg-[#92C63A] w-[600px] h-[400px] shadow-2xl absolute'></div>
          <div className='ellipse w-[550px] h-[350px] bg-[#92C63A] border-4 absolute'></div>
          <div className="ellipse bg-white w-[480px] h-[300px] absolute"></div>
          <div className="w-[430px] h-[250px] rounded-lg absolute"></div>
          <div id="result_wrap">
            <div className="card">
              <img
                src='https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg?t=1680091126'
                className="shadow-2xl rounded-lg card-front"
              />
              <div className="card-back"> 여기에는 정보 넣을거임 </div>
            </div>
          </div>
        </div>
      </div>
      {/* 2번 게임 */}
      <div className='h-[450px]'>
        <div className='w-full h-full flex items-center justify-center'>
          <div className='ellipse bg-[#92C63A] w-[600px] h-[400px] shadow-2xl absolute'></div>
          <div className='ellipse w-[550px] h-[350px] bg-[#92C63A] border-4 absolute'></div>
          <div className="ellipse bg-white w-[480px] h-[300px] absolute"></div>
          <div className="w-[430px] h-[250px] rounded-lg absolute"></div>
          <div id="result_wrap">
            <div className="card">
              <img
                src='https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/header.jpg?t=1679504733'
                className="shadow-2xl rounded-lg card-front"
              />
              <div className="card-back"> 여기에는 정보 넣을거임 </div>
            </div>
          </div>
        </div>
      </div>
    </Slider>
      
      <a href={`https://store.steampowered.com/app/${appid}/EA_SPORTS_FIFA_23/`} target="_blank" rel="noopener noreferrer">
      <button className="place-self-end bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg text-sm text-black px-5 py-2.5 absolute bottom-20 right-20">
                Go to Eat
      </button>
      </a>
    
    </>
  );
}
