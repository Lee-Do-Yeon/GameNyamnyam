import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export default function Carousels({ images }) {
  const [gameImages, setGameImages] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(images);
  useEffect(() => {
    if (images) {
      setGameImages(images);
      setLoading(false);
    }
  }, [images]);
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
