import { useContext, useRef, useState } from "react";
import {NameContext} from "./home"
export default function CrystalBall() {
	const { name } = useContext(NameContext);

  const questionBox = useRef(null);
  const [answer, setAnswer] = useState("");

  async function predict() {
    setAnswer(null);
	setTimeout(() => {
		setAnswer(Math.random() < 0.5 ? "Yes" : "No");
	}, 2000);
  }

  return (
    <main>
		<h1>🔮 Welcome Back, {name == "" ? "???" : name} </h1>

		<input ref={questionBox} placeholder="Ask a yes/no question..." />

		<button onClick={predict}> Ask </button>
		
		{answer === null ? <h2>⏳ Thinking...</h2> : <h2>{answer}</h2>}
    </main>
  );
}