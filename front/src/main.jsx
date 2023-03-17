import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App'; 
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Test from './Test'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <Test />
    </BrowserRouter>
  </React.StrictMode>,
);
