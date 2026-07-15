import { useContext, useEffect, useRef, useState } from "react";
import base from "./pizza_base.png";
import { NameContext } from "./home";

const TOPPINGS = ["🍄", "🧀", "🌽", "🍍", "🧅", "🌶️", "🫑"];

const PRICES = {
  "🍄": 40,
  "🧀": 45,
  "🌽": 30,
  "🍍": 35,
  "🧅": 20,
  "🌶️": 25,
  "🫑": 30,
};

const BASE_PRICE = 299;
const SIZE = 500;

export default function PizzaBuilder() {
  const {name} = useContext(NameContext);
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
  function calculateTotal() {
	let total = BASE_PRICE;
	for(let topping of pizza) {
		total += PRICES[topping.topping]
	}
	return total;
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = base;

    image.onload = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Draw pizza base.
      ctx.drawImage(image, 0, 0, SIZE, SIZE);

      // Draw toppings.
      ctx.font = "28px serif";
	  ctx.textAlign = "center";
      pizza.forEach(({ topping, x, y }) => {
        ctx.fillText(topping, x, y);
      });
    };
  }, [pizza]);

  return (
    <main>
      <h1>🍕 Make a pizza, {name == "" ? "???" : name} </h1>

      <h2>Total: ₹{calculateTotal()}</h2>

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
        width={SIZE}
        height={SIZE}
        onClick={handlePizzaClick}
        style={{
          width: SIZE,
          height: SIZE,
          border: "1px solid #ddd",
          cursor: "crosshair",
        }}
      />
    </main>
  );
}