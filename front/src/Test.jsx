import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Mainpage from './pages/mainpage/MainPage';
import GamePage from './pages/gamepage/GamePage';
import GamePage2 from './pages/gamepage/GamePage2';
import ResultPage from './pages/resultpage/ResultPage';
import PageNotFound from './pages/404page/PageNotFound';
import Mainpage2 from './pages/mainpage/MainPage2';
import Tutorial from './pages/tutorial/Tutorial';

export default function Test() {
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/2" element={<Mainpage2 />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/game2" element={<GamePage2 />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/*" element={<PageNotFound />} />
      <Route path="/tutorial" element={<Tutorial />} />
    </Routes>
  );
}
