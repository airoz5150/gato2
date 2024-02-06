import { useState } from "react";

function Square({ value, onSquareClick }) {

  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board({xIsNext,squares,onPlay}) {


  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }


    const nextSquare = squares.slice();

    if (xIsNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }

    onPlay(nextSquare);
    

  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "ganador: " + winner;
  } else {
    status = "siguiente jugador: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">
        {status}
      </div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

    </>


  );
}

export default function game() {
  const[history,setHistory]= useState([Array(9).fill(null)]);
  const [currenMove, setCurrenMove] = useState(0);
  const xIsNext = currenMove % 2 === 0;
  const currenSquares = history[currenMove];
  
  function handlePlay(nextSquare) {
    const nextHistoy =[...history.slice(0,currenMove + 1),nextSquare];
    setHistory(nextHistoy);
    setCurrenMove(nextHistoy.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrenMove(nextMove);
  }
  
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Ir al movimiento # ' + move;
    } else {
      description = 'Ir al inicio del juego'
    }
    return(
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );  
  });
 
  return (
     
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currenSquares} onPlay={handlePlay} />
      </div>
      <div>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );

}

function calculateWinner(square) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}
