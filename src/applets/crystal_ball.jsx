import { useContext, useState } from "react";
import { NameContext } from "./App"

export default function CrystalBall({ probability }) {
	const { name } = useContext(NameContext);
	const [answer, setAnswer] = useState("");

	function predict() {
		setAnswer(null);
		setTimeout(() => {
			setAnswer(Math.random() < probability ? "Yes" : "No");
		}, 2000);
	}

	return (
		<main>
			<h1>🔮 Welcome Back, {name || "???"} </h1>

			<input placeholder="Ask a yes/no question" />

			<button onClick={predict}> Ask </button>

			{answer === null ? <h2>⏳ Thinking...</h2> : <h2>{answer}</h2>}
		</main>
	);
}