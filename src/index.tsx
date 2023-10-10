import "bootswatch/dist/cosmo/bootstrap.min.css";
// TODO: Note: Replace ^[theme]^ (examples: darkly, slate, cosmo, spacelab, and superhero. 
//See https://bootswatch.com for current theme names.)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/index.scss';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'whatwg-fetch'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
