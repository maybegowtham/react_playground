import { useContext, useState } from "react";
import { NameContext } from "./App";

export default function DuckHunt({ width, height }) {
	const { name } = useContext(NameContext)
	const [score, setScore] = useState(0);
	const [duck, setDuck] = useState({
		x: width / 2,
		y: height / 2,
		alive: true,
	});

	function shootDuck() {
		if (duck.alive) {
			setScore(score => score + 1);

			setDuck({
				x: duck.x,
				y: duck.y,
				alive: false,
			});
			setTimeout(() => {
				setDuck({
					x: Math.random() * (width - 40),
					y: Math.random() * (height - 40),
					alive: true,
				});
			}, 200);
		}
	}

	return (
		<main>
			<h1>🔫 Hunt em, {name || "???"}!</h1>

			<h2>Score: {score}</h2>

			<figure
				style={{
					position: "relative",
					width: width,
					height: height,
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