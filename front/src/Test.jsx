import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Mainpage from './pages/mainpage/MainPage'
import GamePage from './pages/gamepage/GamePage'
import ResultPage from './pages/resultpage/ResultPage'
import PageNotFound from './pages/404page/PageNotFound'

export default function Test() {
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}