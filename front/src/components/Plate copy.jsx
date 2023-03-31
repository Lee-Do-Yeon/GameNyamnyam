import React from 'react';
import '../index.css';


export default function Plate({myValue}) {
  
  console.log(myValue[0].price)
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

  const backgroundColor = changeColor(myValue[0].price);

  return (
    <div className="relative">
      <div className="flex justify-center items-center">
        <div className="aaa ellipse bg-gray-200 w-[440px] h-[220px] absolute"></div>
        <div className={`ellipse bg-[${backgroundColor}] w-[600px] h-[400px] shadow-xl absolute`}></div>
        <div className={`ellipse w-[550px] h-[350px] bg-[${backgroundColor}] border-4 absolute`} ></div>
        <div className="ellipse bg-white w-[480px] h-[300px] absolute"></div>
        
        <div className="w-[430px] h-[250px] bg-white rounded-lg shadow-2xl absolute">
          <img 
          src={myValue[0].image}
          className="w-full h-full shadow-2xl rounded-lg"
           />
           
        </div>
      </div>
    </div>
  );
}
