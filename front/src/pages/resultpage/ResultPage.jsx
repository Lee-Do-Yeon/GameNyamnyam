import React from 'react';
import AddGame from '../../components/AddGame';


export default function Resultpage() {
  return (
    <div className="h-screen bg-yellow-200 font-semibold">
      <div className="flex items-center justify-center h-1/6">
        <div className="p-3 border-2 rounded-lg bg-gray-200 shadow-lg w-4/5">
          <div className="text-center text-2xl">내취향? 열.받.으.시.나.요.?/</div>
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
              <div className='text-center pt-8 '>
                <div className='pl-9 text-4xl text-white w-4/5 truncate'>
                {/* 이름을 길게 하려고 하는데 이건 어떻게 생각하시나요? 눼? */}
                짧은 이름일때 
                </div>
              </div>
              <div className='flex justify-center w-4/5 h-4/6 p-4 ml-5 border-2'>
                <div >

                </div>
              </div>
              <div className='text-center'>
                <div className='pl-9 absolute bottom-10 text-4xl text-white w-4/5 truncate'>가격</div>
              </div>
                <button className="place-self-end bg-yellow-300 hover:bg-yellow-500 font-bold rounded-lg text-sm text-black px-5 py-2.5 absolute bottom-8 right-20">
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
            <ul>
              <li>일병</li>
              <li>이병</li>
              <li>상병</li>
              <li>병장</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="p-4 h-1/6">
        <div className="p-4 text-center">
          <div className="text-white text-xl">이런 게임도 좋아하실거 같아요</div>
          <AddGame className="p-3" />
        </div>
      </div>
    </div>
  );
}
