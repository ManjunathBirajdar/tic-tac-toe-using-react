import React, { useState, useEffect } from "react";
import "./App.css";

const initMatrix = [];
function App() {
  const [matrix, setMatrix] = useState(initMatrix);
  const [matrixSize, setMatrixSize] = useState(3);
  const [currPlayer, setCurrPlayer] = useState("o");
  const [winner, setWinner] = useState(null);
  const [selR, setSelR] = useState(null);
  const [selC, setSelC] = useState(null);
  const [reset, setReset] = useState(false);
  const [clickedCount, setClickedCount] = useState(0);
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    setWinner(false);
    setDraw(false);
    setSelC(null);
    setSelR(null);
    setClickedCount(0);
    setReset(false);
    const row = new Array(matrixSize).fill(null);
    const tempMat = [];
    for (let index = 0; index < matrixSize; index++) {
      tempMat.push([...row]);
    }
    setMatrix(tempMat);
  }, [reset]);

  function squareClick(r,c){
    console.log(r,c);
    if (!matrix[r][c] && !winner) {
      setSelC(c);
      setSelR(r);
      setClickedCount(clickedCount+1);
      const nextPlayer = currPlayer === "o" ? "x" : "o";
      const matrixCopy = [...matrix];
      matrixCopy[r][c] = nextPlayer;
      setCurrPlayer(nextPlayer);
      setMatrix(matrixCopy);
    }
  }

  function isWinner(){
    let horizontal = true;
    let vertical = true;
    let d1 = true;
    let d2 = true;

    if(selC === null || selR === null){
      return;
    }

    for (let i = 0; i < matrixSize; i++) {
      if(matrix[i][selC]!== currPlayer){
        vertical=false;
      }
      if (matrix[selR][i] !== currPlayer) {
        horizontal = false;
      }
      if (matrix[i][i] !== currPlayer) {
        d1 = false;
      }
      if (matrix[i][matrixSize-i-1] !== currPlayer) {
        d2 = false;
      }
      
    }

    if(vertical|| horizontal || d1 || d2){
      setWinner(true);
    } else if (clickedCount === 9) {
      setDraw(true);
    }

  }

  useEffect(()=>{
    if(!winner){
      isWinner();
    }
  })

  function resetGame(){
    setReset(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button className="button-style" onClick={resetGame}>
          Reset Game
        </button>

        <div>
          {matrix.map((val, c) => (
            <div className="c">
              {val.map((val1, r) => (
                <div
                  className="r"
                  onClick={() => {
                    squareClick(r, c);
                  }}
                >
                  {matrix[r][c]}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="message">
          {winner ? `Player ${currPlayer} is a winner` : ""}
          {draw ? 'This is a draw. Please press Reset Game to play next game.':''}
        </div>
      </header>
    </div>
  );
}

export default App;
