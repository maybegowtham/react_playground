import { useState } from "react";

const WIDTH = 400;
const HEIGHT = 300;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function DuckHunt() {
	const [score, setScore] = useState(0);
	const [duck, setDuck] = useState({
		x: WIDTH / 2,
		y: HEIGHT / 2,
		alive: true,
	});

	async function shootDuck() {
		if (duck.alive) {			
			setScore(score => score + 1);
			
			setDuck(duck => ({
				...duck,
				alive: false,
			}));
			
			await sleep(200);
			
			setDuck({
				x: Math.random() * (WIDTH - 40),
				y: Math.random() * (HEIGHT - 40),
				alive: true,
			});
		}
	}

  return (
    <main>
      <h1>🔫 Duck Hunt</h1>

      <p>Score: {score}</p>

      <figure
        style={{
          position: "relative",
          width: WIDTH,
          height: HEIGHT,
          border: "2px solid",
        }}>
        <p
          onClick={shootDuck}
          style={{
            position: "absolute",
            left: duck.x,
            top: duck.y,
          }}>
          {duck.alive ? "🦆" : "💥"}
        </p>
      </figure>
    </main>
  );
}