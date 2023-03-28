import React from 'react';
import './Slider.css';
import Dish from '../components/Dish';

export default function Slider() {

  return (
    <div>
      <div className="slider">
        <div className="slide-track m-3">
          <div className='slide'>
          <Dish />
          </div>
          <div className='slide '> <Dish /> </div>
          <div className='box slide'> 1</div>
          <div className='box slide'> 2 </div>
          <div className='box slide'> 3 </div>
          <div className='box slide'> 4 </div>
          <div className='box slide'> 5 </div>
          <div className='box slide'> 6 </div>
          <div className='box slide'> 7 </div>
          <div className='box slide'> <Dish/> </div>

        </div>
      </div>
    </div>
  );
}
