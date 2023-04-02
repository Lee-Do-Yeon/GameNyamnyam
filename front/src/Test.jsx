import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Mainpage from './pages/mainpage/MainPage'
import GamePage from './pages/gamepage/GamePage'
import GamePage2 from './pages/gamepage/GamePage2'
import ResultPage from './pages/resultpage/ResultPage'
import ResultPageCopy from './pages/resultpage/ResultPageCopy'
import PageNotFound from './pages/404page/PageNotFound'

export default function Test() {
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/game2" element={<GamePage2 />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/copy" element={<ResultPageCopy />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}