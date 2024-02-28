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
  // State for the history, which is an array of arrays. Each array will be state at a certain point in time.
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // State of the current move, defaults to 0
  const [currentMove, setCurrentMove] = useState(0);

  // X is next if the current move is even
  const xIsNext = currentMove % 2 === 0;
  // Set the current squares to the current move state
  const currentSquares = history[currentMove];

  // Create the moves buttons off the history state
  const moves = history.map((squares, move) => {
    let description = "";

    if (move > 0) {
      description = "Go to move # " + move;
    } else {
      description = "Go to game start.";
    }

    return (
      <li key={move}>
        {move === currentMove ? (
          "You are at move # " + move
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  function handlePlay(nextSquares) {
    // Create the next history considering the current move
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    // Update the history state
    setHistory(nextHistory);

    // Upadate the current move
    setCurrentMove(nextHistory.length - 1);
  }

  // Handles the click on the jump buttons
  function jumpTo(move) {
    setCurrentMove(move);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
