import React from 'react';

import { useRecoilValue } from 'recoil';
import { userGame } from '../../../recoil/user/atoms';
import AddGame from '../../components/AddGame';
import PlateCopy from '../../components/PlateCopy';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import axios from 'axios';

export default function Resultpage() {
  const myValue = useRecoilValue(userGame);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="h-screen bg-yellow-600 font-semibold">
      <div className="flex items-center justify-center h-1/6">
        <div className="p-3 border-2 rounded-lg bg-gray-200 shadow-lg w-4/5">
          <div className="text-center text-2xl">카피페이지</div>
        </div>
      </div>

      <div className="flex h-4/6">
        <div className="flex justify-center w-3/4 px-24">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("/resultTwo.png")`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="relative h-full">
              <div className="w-4/5 h-5/6 p-4 ml-5 mt-10">
                <PlateCopy />
              </div>
              
              

            </div>
          </div>
        </div>
        <div
          className="w-1/4"
          style={{
            backgroundImage: `url("/resultreceipt.png")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="mt-36 mx-10">
            <div>
              <div>
                {myValue.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12">
                    <div className="col-span-2">{index + 1} </div>
                    <div className="col-span-6 truncate">{item.name}</div>
                    <div className="col-span-3">₩ {item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 h-1/6">
        <div className="p-4 text-center">
          <div className="text-white text-xl">
            이런 게임도 좋아하실거 같아요
          </div>
          <AddGame className="p-3" />
        </div>
      </div>
    </div>
  );
}
