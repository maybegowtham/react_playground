import { useRef, useState } from "react";

export default function CrystalBall() {
  const questionBox = useRef(null);
  const [answer, setAnswer] = useState("");

  function sleep(milliseconds) {
    return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
    });
  }

  async function predict() {
    setAnswer(null);
    await sleep(2000);
    setAnswer(Math.random() < 0.5 ? "Yes" : "No");
  }

  return (
    <main>
		<h1>🔮 Crystal Ball</h1>

		<input ref={questionBox} placeholder="Ask a yes/no question..." />

		<button onClick={predict}> Ask </button>
		
		{answer === null ? <p>⏳ Thinking...</p> : <h2>{answer}</h2>}
    </main>
  );
}