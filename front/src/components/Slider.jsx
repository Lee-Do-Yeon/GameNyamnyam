import React from 'react';
import './Slider.css';
import Dish from '../components/Dish';

export default function Slider() {

  return (
    <div>
      <div className="slider">
        <div className="slide-track">
          <div className='slide'>
          <Dish />
          </div>
          <div className='slide'> <Dish /> </div>
          <div className='box slide'> hello </div>
          <div className='box slide'> hello </div>
          <div className='box slide'> hello </div>
          <div className='box slide'> hello </div>
          <div className='box slide'> hello </div>
          <div className='box slide'> hello </div>
          <div className='box slide'> hello </div>
        </div>
      </div>
    </div>
  );
}
