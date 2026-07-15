import { useEffect, useState } from "react";

const SIZE = 10;

function point(x, y) {
  return { x, y };
}

function add(a, b) {
  return point(a.x + b.x, a.y + b.y);
}

function equal(a, b) {
  return a.x === b.x && a.y === b.y;
}

export default function Snake() {
  const [game, setGame] = useState({
    snake: [point(5, 5)],
    food: point(2, 2),
    direction: point(0, 0),
    score: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setGame(game => {
        const head = add(
          game.snake[0],
          game.direction
        );

        const outside =
          head.x < 0 ||
          head.x >= SIZE ||
          head.y < 0 ||
          head.y >= SIZE;

        if (outside) {
          return {
            snake: [point(5, 5)],
            food: point(2, 2),
            direction: point(0, 0),
            score: 0,
          };
        }

        if (equal(head, game.food)) {
          return {
            ...game,
            snake: [head, ...game.snake],
            food: point(Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)),
            score: game.score + 1,
          };
        }

        return {
          ...game,
          snake: [
            head,
            ...game.snake.slice(0, -1),
          ],
        };
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  function keyDown(e) {
    if (e.key === "ArrowUp")
      setGame(g => ({
        ...g,
        direction: point(0, -1),
      }));

    if (e.key === "ArrowDown")
      setGame(g => ({
        ...g,
        direction: point(0, 1),
      }));

    if (e.key === "ArrowLeft")
      setGame(g => ({
        ...g,
        direction: point(-1, 0),
      }));

    if (e.key === "ArrowRight")
      setGame(g => ({
        ...g,
        direction: point(1, 0),
      }));
  }

  function color(cell) {
    if (game.snake.some(s => equal(s, cell)))
      return "green";

    if (equal(game.food, cell))
      return "red";

    return "white";
  }

  return (
    <main onKeyDown={keyDown} tabIndex={0} autoFocus>
      <h1>🐍 Snake</h1>

      <h2>Score: {game.score}</h2>

      <table>
        <tbody>
          {Array.from({ length: SIZE }, (_, y) => (
            <tr key={y}>
              {Array.from({ length: SIZE }, (_, x) => (
                <td
                  key={x}
                  style={{
                    width: 25,
                    height: 25,
                    border: "1px solid",
                    background: color(point(x, y)),
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