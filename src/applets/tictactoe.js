import { useState } from "react";

const SYMBOLS = ["\xa0", "X", "O"];

const WINNING_LINES = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
];

function winner(board) {
  for (const line of WINNING_LINES) {
    const values = line.map(([r, c]) => board[r][c]);
	let first = values[0]
    if (values.every(s => s !== 0 && s === first)) {
      return first;
	}
  }

  return 0;
}

export default function TicTacToe() {
  const [board, setBoard] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  const [turn, setTurn] = useState(1);

  const winningPlayer = winner(board);

  function play(row, col) {
	if (winner(board) !== 0) {
		// cant make moves after someone won
	} else if (board[row][col] !== 0) {
		// cant override a cell
	} else {	
		const nextBoard = board.map(row => [...row]);
		nextBoard[row][col] = turn;
		
		setBoard(nextBoard);
		setTurn(turn === 1 ? 2 : 1);
	}
  }

  function reset() {
    setBoard([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    setTurn(1);
  }

  return (
    <main>
      <h1>Tic Tac Toe</h1>
      <h2>
        {winner(board) === 0 ? `${SYMBOLS[turn]}'s turn` : `${SYMBOLS[winningPlayer]} wins!`}
      </h2>
		<table
			style={{fontFamily: "monospace"}}>
			<tbody>
			{board.map((row, r) => (
				<tr key={r}>
				{row.map((cell, c) => (
					<td
					key={c}
					onClick={() => play(r, c)}
					style={{border: "1px solid"}}
					>
					{SYMBOLS[cell]}
					</td>
				))}
				</tr>
			))}
			</tbody>
		</table>
      <p>
        <button onClick={reset}>Reset</button>
      </p>
    </main>
  );
}