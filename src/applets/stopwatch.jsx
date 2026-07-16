import { useEffect, useState } from "react";

export default function Stopwatch() {
	const [seconds, setSeconds] = useState(0);
	const [running, setRunning] = useState(false);

	function handleTick() {
		setSeconds(seconds => seconds + 1);
	}

	function handleStart() {
		setRunning(true);
	}

	function handleStop() {
		setRunning(false);
	}

	function handleReset() {
		setRunning(false);
		setSeconds(0);
	}

	useEffect(() => {
		if (running) {
			const interval = setInterval(handleTick, 1000);

			return function cleanup() {
				clearInterval(interval);
			};
		}
	}, [running]);

	return (
		<main>
			<h1>Stopwatch</h1>

			<h2>{seconds} seconds</h2>

			<button onClick={handleStart}> Start </button>

			<button onClick={handleStop}> Stop </button>

			<button onClick={handleReset}> Reset </button>
		</main>
	);
}