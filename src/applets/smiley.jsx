import { useEffect, useRef, useState } from "react";

function drawEye(ctx, x, y, angle) {
  // Eye white
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();

  // Pupil
  const pupilX = x + Math.cos(angle) * 8;
  const pupilY = y + Math.sin(angle) * 8;

  ctx.beginPath();
  ctx.arc(pupilX, pupilY, 8, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
}

export default function Smiley() {
  const canvasRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 200, y: 200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function draw() {
      ctx.clearRect(0, 0, 400, 400);

      // Face
      ctx.beginPath();
      ctx.arc(200, 200, 120, 0, Math.PI * 2);
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.stroke();

      // Angles from each eye to the mouse
      const leftAngle = Math.atan2(mouse.y - 160, mouse.x - 150);
      const rightAngle = Math.atan2(mouse.y - 160, mouse.x - 250);

      // Eyes
      drawEye(ctx, 150, 160, leftAngle);
      drawEye(ctx, 250, 160, rightAngle);

      // Smile
      ctx.beginPath();
      ctx.arc(200, 210, 60, 0, Math.PI);
      ctx.stroke();
    }

    draw();
  }, [mouse]);

  function handleMouseMove(e) {
    const rect = canvasRef.current.getBoundingClientRect();

    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
	<>
		<h1>Bob</h1>
		<canvas
		ref={canvasRef}
		width={400}
		height={400}
		onMouseMove={handleMouseMove}
		style={{ border: "1px solid black" }}
		/>
	</>
  );
}