import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export default function Carousels({ images }) {

  console.log(images);
 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div >
      <Slider {...settings} >
        {images.map((image, index) => (
          <img src={image} alt="" key={index} className='h-1/2'/>
        ))}
      </Slider>
    </div>
  );
}
