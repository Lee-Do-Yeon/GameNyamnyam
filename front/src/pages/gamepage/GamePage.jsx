import React from 'react';
import Dish from '../../components/Dish';
export default function Gamepage() {
  return (
    <div className="gamepage">
      <Dish draggable="true" />
      <div className="trailerGoRight"></div>
    </div>
  );
}
