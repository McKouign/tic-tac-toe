import React, { useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (lock || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "x" : "o";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWin(newBoard);
  };

  const checkWin = (newBoard) => {
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
    for (let line of lines) {
      const [a, b, c] = line;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setLock(true);
        setWinner(newBoard[a]);
        return;
      }
    }
    if (!newBoard.includes(null)) {
      setLock(true); // Lock the game if it's a tie (no more moves possible)
      setWinner("tie");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setLock(false);
    setWinner(null);
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe Game In <span>React</span>
      </h1>
      {winner && winner !== "tie" && (
        <h2 className="winner-message">
           <img className="winner-img" src={winner === "x" ? cross_icon : circle_icon} alt={winner} />   is the WINNER  🎉🥳
        </h2>
      )}
      {winner && winner === "tie" && <h2>The game is a tie!</h2>}
      <div className="board">
        {board.map((value, index) => (
          <div key={index} className="boxes" onClick={() => handleClick(index)}>
            {value === "x" && <img src={cross_icon} alt="X" />}
            {value === "o" && <img src={circle_icon} alt="O" />}
          </div>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;