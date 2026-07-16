import { createContext, useContext, useState } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

import Counter from "./counter";
import Stopwatch from "./stopwatch";
import CrystalBall from "./crystal_ball";
import DuckHunt from "./duck_hunt";
import PizzaBuilder from "./pizza";
import TicTacToe from "./tictactoe";
import TodoApp from "./todo";
import Snake from "./snake";
import Pokedex from "./pokedex";

export const NameContext = createContext();

export default function App() {
  const [name, setName] = useState("");

  return (
    <NameContext.Provider value={{ name, setName }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/counter"
            element={<Counter initialCount={100} step={1} />}
          />
          <Route path="/stopwatch" element={<Stopwatch />} />
          <Route path="/crystal-ball" element={<CrystalBall />} />
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/duck-hunt" element={<DuckHunt />} />
          <Route path="/pizza" element={<PizzaBuilder SIZE={500}/>} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/snake" element={<Snake />} />
          <Route path="/pokedex" element={<Pokedex />} />
        </Routes>
      </BrowserRouter>
    </NameContext.Provider>
  );
}

function Home() {
  const { name, setName } = useContext(NameContext);

  return (
    <main>
      <h1>Hello, {name == "" ? "???" : name} </h1>

      <p>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </p>

      <p>
        <Link to="/counter">🔢 Counter</Link>
      </p>

      <p>
        <Link to="/stopwatch">⏱️ Stopwatch</Link>
      </p>

      <p>
        <Link to="/crystal-ball">🔮 Crystal Ball</Link>
      </p>

      <p>
        <Link to="/todo">📝 Todo</Link>
      </p>

      <p>
        <Link to="/duck-hunt">🦆 Duck Hunt</Link>
      </p>

      <p>
        <Link to="/pizza">🍕 Pizza Builder</Link>
      </p>

      <p>
        <Link to="/tictactoe">⭕ Tic Tac Toe</Link>
      </p>

      <p>
        <Link to="/snake">🐍 Snake</Link>
      </p>

      <p>
        <Link to="/pokedex">🔴 Pokedex</Link>
      </p>

      <footer>
        slides @{" "}
        <a
          href="https://maybegowtham.github.io/react_playground/"
          target="_blank"
          rel="noopener noreferrer"
        >
          maybegowtham.github.io/react_playground
        </a>
      </footer>
    </main>
  );
}