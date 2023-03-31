import React from 'react';
import { useRecoilValue } from 'recoil';
import { userGame } from '../../../recoil/user/atoms';
import AddGame from '../../components/AddGame';
import Plate from '../../components/Plate';

// import axios from 'axios';

export default function Resultpage() {
  const myValue = useRecoilValue(userGame);
  console.log(myValue);
  return (
    <div className="h-screen bg-yellow-600 font-semibold">
      <div className="flex items-center justify-center h-1/6">
        <div className="p-3 border-2 rounded-lg bg-gray-200 shadow-lg w-4/5">
          <div className="text-center text-2xl">열.받.으.시.나.요.?/</div>
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
              <div className="flex justify-center items-center w-4/5 h-5/6 p-4 ml-5 mt-10">
                <Plate myValue={myValue} />
              </div>

              <button className="place-self-end bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg text-sm text-black px-5 py-2.5 absolute bottom-20 right-20">
                Go to Eat
              </button>
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
          <div className="mt-36 mx-8">
            <div className="border-2">
              <div>
                {myValue.map((item) => (
                  <li key={item.appid}>
                    {item.appid} / {item.name} / {item.price} 원
                  </li>
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
