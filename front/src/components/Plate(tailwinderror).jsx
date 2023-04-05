import React, { useEffect, useState } from 'react';
// import axios from 'axios'
import '../index.css';

export default function Plate({ myValue }) {
  console.log(myValue);
  const [changeColor, setChangeColor] = useState('');
  useEffect(() => {
    if (myValue.price === 0) {
      setChangeColor('bg-[#FEF874]');
    } else if (0 < myValue.price && myValue.price <= 10000) {
      setChangeColor('bg-[#92C63A]');
    } else if (10000 < myValue.price && myValue.price <= 30000) {
      setChangeColor('bg-[#DB4646]');
    } else if (30000 < myValue.price && myValue.price <= 50000) {
      setChangeColor('bg-[#454FAA]');
    } else if (50000 < myValue.price) {
      setChangeColor('bg-[#373737]');
    }
  }, []);

  return (
    <>
      <div className="h-[420px]">
        <div className="w-full h-full flex items-center justify-center pb-5">
          <div
            className={`ellipse ${changeColor} w-[600px] h-[400px] shadow-2xl absolute`}
            style
          ></div>
          <div
            className={`ellipse w-[550px] h-[350px] border-4 absolute`}
          ></div>
          <div className="ellipse bg-white w-[480px] h-[300px] absolute"></div>
          <div className="w-[430px] h-[250px] rounded-lg absolute"></div>
          <div id="result_wrap">
            <div className="card">
              <img
                src={myValue.image}
                className="shadow-2xl rounded-lg card-front"
              />
              <div className="card-back">
                <div>
                  {/* <div>{goEat.genres}</div> */}
                  {/* <div>{goEat.categories}</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
