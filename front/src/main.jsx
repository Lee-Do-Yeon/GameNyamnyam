import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Test from './Test';
import { RecoilRoot } from 'recoil';
import './gamepage.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <React.StrictMode>
      <BrowserRouter>
        {/* <App /> */}
        <Test />
      </BrowserRouter>
    </React.StrictMode>
  </RecoilRoot>,
);
