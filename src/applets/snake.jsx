import { useEffect, useState } from "react";

export default function Snake({ size }) {
	const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
	const [food, setFood] = useState({ x: 2, y: 2 });
	const [direction, setDirection] = useState({ x: 0, y: 0 });
	const [score, setScore] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			const front = {
				x: snake[0].x + direction.x,
				y: snake[0].y + direction.y,
			};

			if (
				front.x < 0 ||
				front.x >= size ||
				front.y < 0 ||
				front.y >= size
			) {
				setSnake([{ x: 5, y: 5 }]);
				setFood({ x: 2, y: 2 });
				setDirection({ x: 0, y: 0 });
				setScore(0);
			} else if (front.x === food.x && front.y === food.y) {
				setSnake([front, ...snake]);

				setFood({
					x: Math.floor(Math.random() * size),
					y: Math.floor(Math.random() * size),
				});

				setScore(score + 1);
			} else {
				setSnake([front, ...snake.slice(0, -1)]);
			}
		}, 300);

		return () => clearInterval(timer);
	}, [snake, direction, food, score, size]);

	function handleKeyDown(e) {
		if (e.key === "ArrowUp")
			setDirection({ x: 0, y: -1 });
		if (e.key === "ArrowDown")
			setDirection({ x: 0, y: 1 });
		if (e.key === "ArrowLeft")
			setDirection({ x: -1, y: 0 });
		if (e.key === "ArrowRight")
			setDirection({ x: 1, y: 0 });
	}

	function color(x, y) {
		if (snake.some(cell => cell.x === x && cell.y === y))
			return "green";

		if (food.x === x && food.y === y)
			return "red";

		return "white";
	}

	return (
		<main onKeyDown={handleKeyDown} tabIndex={0} autoFocus>
			<h1>🐍 Snake</h1>

			<h2>Score: {score}</h2>

			<table>
				<tbody>
					{Array.from({ length: size }, (_, y) => (
						<tr key={y}>
							{Array.from({ length: size }, (_, x) => (
								<td
									key={x}
									style={{
										width: 25,
										height: 25,
										border: "1px solid",
										background: color(x, y),
									}}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
}