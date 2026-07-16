import { useContext, useEffect, useRef, useState } from "react";
import base from "./pizza_base.png";
import { NameContext } from "./App";

const TOPPINGS = ["🍄", "🧀", "🌽", "🍍", "🧅", "🌶️", "🫑"];

export default function PizzaBuilder({ size }) {
	const { name } = useContext(NameContext);
	const canvasRef = useRef(null);
	const [selected, setSelected] = useState(TOPPINGS[0]);
	const [pizza, setPizza] = useState([]);

	function handlePizzaClick(e) {
		setPizza((pizza) => [
			...pizza,
			{
				topping: selected,
				x: e.nativeEvent.offsetX,
				y: e.nativeEvent.offsetY,
			},
		]);
	}

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		const image = new Image();
		image.src = base;

		image.onload = () => {
			ctx.clearRect(0, 0, size, size);

			// Draw pizza base.
			ctx.drawImage(image, 0, 0, size, size);

			// Draw toppings.
			ctx.font = "28px serif";
			ctx.textAlign = "center";
			pizza.forEach(({ topping, x, y }) => {
				ctx.fillText(topping, x, y);
			});
		};
	}, [pizza, size]);

	return (
		<main>
			<h1>🍕 Make a pizza, {name || "???"} </h1>

			<h2>Toppings: {pizza.length}</h2>

			<p>
				{TOPPINGS.map((topping) => (
					<button
						key={topping}
						disabled={selected === topping}
						onClick={() => setSelected(topping)}
					>
						{topping}
					</button>
				))}
			</p>

			<canvas
				ref={canvasRef}
				width={size}
				height={size}
				onClick={handlePizzaClick}
				style={{
					width: size,
					height: size,
					border: "1px solid #ddd",
					cursor: "crosshair",
				}}
			/>
		</main>
	);
}