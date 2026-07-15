import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Counter from './applets/counter';
import Stopwatch from './applets/stopwatch';
import CrystalBall from './applets/crystal_ball';
import DuckHunt from './applets/duck_hunt';
import PizzaBuilder from './applets/pizza';
import TicTacToe from './applets/tictactoe';
import TodoApp from './applets/todo';
import App from './applets/home';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	<BrowserRouter>
    	<App />
	</BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
