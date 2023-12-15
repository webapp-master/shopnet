import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './store'





ReactDOM.render(
 <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);



// Apply inline styles to the body element
document.body.style.margin = 0;
document.body.style.padding = 0;


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
