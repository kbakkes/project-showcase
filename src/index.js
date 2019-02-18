import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// Check for browser support of service worker
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`).then(function (register) {
        console.log("worked", register);
    }).catch(function (err) {
        console.log(err);
        
    });
}
