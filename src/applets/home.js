import { Routes, Route, Link } from "react-router-dom";

import Counter from "./counter";
import Stopwatch from "./stopwatch";
import CrystalBall from "./crystal_ball";
import DuckHunt from "./duck_hunt";
import PizzaBuilder from "./pizza";
import TicTacToe from "./tictactoe";
import TodoApp from "./todo";
import Snake from "./snake";
import Pokedex from "./pokedex";

const apps = [
  { icon: "🔢", name: "Counter", path: "/counter" },
  { icon: "⏱️", name: "Stopwatch", path: "/stopwatch" },
  { icon: "🔮", name: "Crystal Ball", path: "/crystal-ball" },
  { icon: "📝", name: "Todo", path: "/todo" },
  { icon: "🦆", name: "Duck Hunt", path: "/duck-hunt" },
  { icon: "🍕", name: "Pizza Builder", path: "/pizza" },
  { icon: "⭕", name: "Tic Tac Toe", path: "/tictactoe" },
  { icon: "🐍", name: "Snake", path: "/snake" },
  { icon: "🔴", name: "Pokedex", path: "/pokedex"}
];

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/counter"
        element={<Counter initialCount={100} step={5} />}
      />

      <Route path="/stopwatch" element={<Stopwatch />} />
      <Route path="/crystal-ball" element={<CrystalBall />} />
      <Route path="/todo" element={<TodoApp />} />
      <Route path="/duck-hunt" element={<DuckHunt />} />
      <Route path="/pizza" element={<PizzaBuilder />} />
      <Route path="/tictactoe" element={<TicTacToe />} />
	  <Route path="/snake" element={<Snake/> }/>
	  <Route path="/pokedex" element={<Pokedex/> }/>
    </Routes>
  );
}

function Home() {
  return (
    <main>
      <h1>React Playground</h1>

      {apps.map(app => (
        <p key={app.path}>
          <Link to={app.path}>
            {app.icon} {app.name}
          </Link>
        </p>
      ))}
    </main>
  );
}