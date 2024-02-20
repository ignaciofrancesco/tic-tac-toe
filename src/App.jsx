import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleSquareClick(i) {
    // If the square is already set, or there is a winner, return
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // Create a copy of the squares array
    let nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // Once the nextSquares is computed at this level, I pass it on to the Game to fully process the play.
    onPlay(nextSquares);
  }

  // Calculate winner every time the Board is rendered
  let winner = calculateWinner(squares);

  let status = null;

  if (winner) {
    status = "The winner is: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
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

  function calculateWinner(squares) {
    // Possible winner combinations
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  }
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  // The history is an array of arrays. Each array will be state at a certain point in time.
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // The current state is the last element in the history array
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setXIsNext(!xIsNext);
    // Create a new array for history, that contains history, and the new squares state
    setHistory([...history, nextSquares]);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}
