import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import ImgBox from './components/ImgBox';
import Buttontap from './components/Buttontap';
import Tag from './components/Tag';
import Modal from './components/Modal';

import PageNotFound from './pages/404page/PageNotFound'

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <ImgBox />
      <Tag />
      <Modal />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Buttontap />
      <PageNotFound />
    </div>
  );
}

export default App;
