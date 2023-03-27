import React from 'react';
// import Receipt from '../../components/Receipt';
import AddGame from '../../components/AddGame';
import Dish from '../../components/Dish';
// import Detail from '../../components/Detail';

export default function Resultpage() {
  return (
    <div className="h-screen bg-yellow-700">
      <div className="grid grid-cols-7">
        <div className="col-span-7 bg-white">
          <div> 제목 </div>
        </div>
        <div className="col-span-5 px-3 w-5/6">
          <Dish />
        </div>
        <div className="col-span-2 flex justify-center self-center"></div>
        <div className="col-span-7 flex justify-center">
          <AddGame />
        </div>
      </div>
    </div>
  );
}
