import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleSquareClick(i) {
    // Create a copy of the squares array
    let nextSquares = squares.slice();

    nextSquares[i] = "X";

    setSquares(nextSquares);
  }

  return (
    <>
      <div className="board-row">
        <Square
          className="square"
          value={squares[0]}
          onSquareClick={() => handleSquareClick(0)}
        />
        <Square
          className="square"
          value={squares[1]}
          onSquareClick={() => handleSquareClick(1)}
        />
        <Square
          className="square"
          value={squares[2]}
          onSquareClick={() => handleSquareClick(2)}
        />
      </div>
      <div className="board-row">
        <Square
          className="square"
          value={squares[3]}
          onSquareClick={() => handleSquareClick(3)}
        />
        <Square
          className="square"
          value={squares[4]}
          onSquareClick={() => handleSquareClick(4)}
        />
        <Square
          className="square"
          value={squares[5]}
          onSquareClick={() => handleSquareClick(5)}
        />
      </div>
      <div className="board-row">
        <Square
          className="square"
          value={squares[6]}
          onSquareClick={() => handleSquareClick(6)}
        />
        <Square
          className="square"
          value={squares[7]}
          onSquareClick={() => handleSquareClick(7)}
        />
        <Square
          className="square"
          value={squares[8]}
          onSquareClick={() => handleSquareClick(8)}
        />
      </div>
    </>
  );
}
