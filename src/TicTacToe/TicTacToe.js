import React, { useEffect, useState } from "react";
// import "./App.css";
import "./TicTacToe.css";

function TicTacToe() {
  const [boxes, setBoxes] = useState(["", "", "", "", "", "", "", "", ""]);
  const [xpoints, setxpoints] = useState(0);
  const [ypoints, setypoints] = useState(0);
  const [winningset, setwinningset] = useState([]);
  const [winner, setWinner] = useState("Pending");
  const [gameOver, setgameOver] = useState(false);
  const [turn, setTurn] = useState("X");
  const [invalid, setinvalid] = useState([]);

  const handelTurn = () => {
    if (turn === "X") {
      setTurn("0");
    } else {
      setTurn("X");
    }
  };

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

  const newGame = () => {
    setBoxes(["", "", "", "", "", "", "", "", ""]);
    setWinner("Pending");
    setgameOver(false);
    setTurn("X");
    setwinningset([]);
  };

  const checkWinner = () => {
    

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
        setwinningset(lines[i]);
        setWinner(boxes[a]);
        if (boxes[a] === "X") {
          setxpoints(xpoints + 1);
        } else {
          setypoints(ypoints + 1);
        }
        setgameOver(true);
      }
    }

    if (boxes.every((ele) => ele != "") && winner !== "Pending") {
      setWinner("TIE");
      setgameOver(true);
      return;
    }
  };

  const handelBoxClick = (val, index) => {
    if (val === "") {
      let temp = boxes.map((ele, i) => (i === index ? turn : ele));
      setBoxes(temp);
      handelTurn();
      setinvalid([]);
    } else {
      setinvalid([index]);
    }
  };

  useEffect(() => {
    checkWinner();
  }, [boxes]);

  return (
    <div className="App">
      <div className="points-div">
        Points: X: {xpoints}, Y: {ypoints}
      </div>
      <br></br>
      Turn : {turn}
      <div className="container">
        {boxes.map((ele, index) => {
          return (
            <div
              key={index}
              className="box"
              style={{
                background: winningset.includes(index)
                  ? "lightgreen" // Give priority to winning boxes
                  : invalid.includes(index)
                  ? "red"
                  : null,
              }}
              onClick={() => {
                if (!gameOver) {
                  handelBoxClick(ele, index);
                  checkWinner();
                }
              }}
            >
              {ele}
            </div>
          );
        })}
      </div>
      {gameOver && (
        <div className="game-over">
          Winner: {winner} <br></br>
          <button onClick={newGame}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default TicTacToe;
