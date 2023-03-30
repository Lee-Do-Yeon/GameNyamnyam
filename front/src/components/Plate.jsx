import React from 'react';
import '../index.css';




export default function Plate({ price, image }) {
    
  const changeColor = (price) => {
    if (price === 0) {
      return '#FEF874';
    } else if (0 < price && price <= 10000) {
      return '#92C63A';
    } else if (10000 < price && price <= 30000) {
      return '#DB4646';
    } else if (30000 < price && price <= 50000) {
      return '#454FAA';
    } else if (50000 < price) {
      return '#373737';
    }
  };

    const backgroundColor = changeColor(price);

  return (
    <div className="relative">
      <div className="flex justify-center items-center">
        <div className="aaa ellipse bg-gray-200 w-[440px] h-[220px] absolute sha-2xl"></div>
        <div className={`ellipse bg-[${backgroundColor}] w-[500px] h-[250px] shadow-xl absolute`}></div>
        <div className={`ellipse w-[400px] h-[200px] bg-[${backgroundColor}] border-4 absolute`} ></div>
        <div className="ellipse bg-white w-[300px] h-[150px] absolute"></div>
        <div className="w-[390px] h-[175px] border-2 bg-white absolute rounded-lg">
          <img 
          src={image}
          className="w-full h-full"
           />
        </div>
      </div>
    </div>
  );
}
