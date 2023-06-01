import React, { useState, useEffect } from "react";
import "../styles/RouletteWheel.css";

const numbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

const green = [0];

const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

const black = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
];

const RouletteWheel = () => {
  const [number, setNumber] = useState(0);
  const [numberColor, setNumberColor] = useState("black");
  const [previousNumberColor, setPreviousNumberColor] = useState("black");
  const [nextNumberColor, setNextNumberColor] = useState("black");
  const [spinning, setSpinning] = useState(false);
  const [previousNumber, setPreviousNumber] = useState(null);
  const [nextNumber, setNextNumber] = useState(null);

  const getRandomNumber = () => {
    return numbers[Math.floor(Math.random() * numbers.length)];
  };

  const spin = () => {
    const num = getRandomNumber();
    let numColor = "";
    const i = numbers.length * 2 + numbers.indexOf(num) + 1;
    setSpinning(true);
    for (let j = 0; j < i; j++) {
      setTimeout(() => {
        setSpinning(true);
        document.getElementById("numberDisp").style.color = numColor;
        setNumber(numbers[j % numbers.length]);
        if (j === i - 1) {
          // last iteration, so set spinning to false
          setSpinning(false);
          document.getElementById("numberDisp").classList.add("winner");
        }
      }, j * (j * 1.25));
    }
  };

  useEffect(() => {
    setNumberColor(
      green.includes(number) ? "green" : red.includes(number) ? "red" : "black"
    );
    setPreviousNumber(numbers[(numbers.indexOf(number) - 1 + numbers.length) % numbers.length]);
    setNextNumber(numbers[(numbers.indexOf(number) + 1) % numbers.length]);
    setPreviousNumberColor(
      green.includes(previousNumber) ? "green" : red.includes(previousNumber) ? "red" : "black"
    );
    setNextNumberColor(
      green.includes(nextNumber) ? "green" : red.includes(nextNumber) ? "red" : "black"
    );
  }, [number, previousNumber, nextNumber]);

  return (
    <div className="rouletteWheel">
    <div className="roulette">
      <h1 id="previousNumber" style={{ color: previousNumberColor }}>
        {previousNumber}
      </h1>
      <h1 id="numberDisp" style={{ color: numberColor }}>
        {number}
      </h1>
      <h1 id="nextNumber" style={{ color: nextNumberColor }}>
        {nextNumber}
      </h1>
    </div>
    <div className="spinButton">
    <button onClick={spin} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin"}
      </button>
    </div>
    <hr></hr>
    </div>
  );
};

export default RouletteWheel;