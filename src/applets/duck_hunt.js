import { useContext, useState } from "react";
import { NameContext } from "./home";

const WIDTH = 400;
const HEIGHT = 300;

export default function DuckHunt() {
	const {name} = useContext(NameContext)
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
			setTimeout(() => {
				setDuck({
					x: Math.random() * (WIDTH - 40),
					y: Math.random() * (HEIGHT - 40),
					alive: true,
				});
			}, 200);
		}
	}

  return (
    <main>
      <h1>🔫 Hunt em, {name == "" ? "???" : name}!</h1>

      <h2>Score: {score}</h2>

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
			cursor: "crosshair",
          }}>
          {duck.alive ? "🦆" : "💥"}
        </p>
      </figure>
    </main>
  );
}