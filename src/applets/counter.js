import { useState } from "react";

export default function Counter({
  initialCount = 0,
  step = 1,
  min = 0,
  max = Infinity,
  title = "Counter",
}) {
  const [count, setCount] = useState(initialCount);

  function handleIncrement() {
    if (count + step <= max) {
      setCount(count + step);
    } else {
      alert(`Maximum is ${max}`);
    }
  }

  function handleDecrement() {
    if (count - step >= min) {
      setCount(count - step);
    } else {
      alert(`Minimum is ${min}`);
    }
  }

  function handleReset() {
    setCount(initialCount);
  }

  return (
    <>
      <h1>{title}</h1>

      <button onClick={handleIncrement}>+{step}</button>
      <button onClick={handleDecrement}>-{step}</button>
      <button onClick={handleReset}>Reset</button>

      <h2>{count}</h2>
    </>
  );
}