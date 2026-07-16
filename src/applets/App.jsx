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
import Home from "./home";
import Smiley from "./smiley";

export const NameContext = createContext();

export default function App() {
	const [name, setName] = useState("");

	return (
		<NameContext.Provider value={{ name, setName }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/counter" element={<Counter initialCount={5} min={0} max={10} step={1} />} />
					<Route path="/stopwatch" element={<Stopwatch />} />
					<Route path="/crystal-ball" element={<CrystalBall probability={0.5} />} />
					<Route path="/todo" element={<TodoApp />} />
					<Route path="/duck-hunt" element={<DuckHunt height={500} width={500} />} />
					<Route path="/smiley" element={<Smiley/>} />
					<Route path="/pizza" element={<PizzaBuilder size={500} />} />
					<Route path="/tictactoe" element={<TicTacToe />} />
					<Route path="/snake" element={<Snake size={10} />} />
					<Route path="/pokedex" element={<Pokedex />} />
				</Routes>
			</BrowserRouter>
		</NameContext.Provider>
	);
}