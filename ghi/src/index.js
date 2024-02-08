import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './state/store'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, '');

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={basename}>
        <Routes>
          <Route path='/*' element={<App />}/>
      </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
