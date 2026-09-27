
"use client";

import React, { useState } from "react";

const Page = () => {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  const handleNumber = (number: string) => {
    if (waitingForSecond) {
      setDisplay(number);
      setWaitingForSecond(false);
    } else {
      setDisplay(display === "0" ? number : display + number);
    }
  };

  const handleDecimal = () => {
    if (waitingForSecond) {
      setDisplay("0.");
      setWaitingForSecond(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (op: string) => {
    const inputNumber = parseFloat(display);

    if (firstNumber === null) {
      setFirstNumber(inputNumber);
    } else if (operator) {
      const result = calculate(firstNumber, inputNumber, operator);
      setDisplay(String(result));
      setFirstNumber(result as number);
    }

    setOperator(op);
    setWaitingForSecond(true);
  };

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b === 0 ? "Error" : a / b;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (firstNumber === null || operator === null) return;

    const secondNumber = parseFloat(display);
    const result = calculate(firstNumber, secondNumber, operator);

    setDisplay(String(result));
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecond(true);
  };

  const clearCalculator = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const deleteNumber = () => {
    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-80 rounded-2xl bg-black p-5 shadow-xl">
        
        {/* Display */}
        <div className="mb-5 rounded-xl bg-gray-900 p-5 text-right">
          <div className="overflow-hidden text-4xl font-semibold text-white">
            {display}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">

          <button
            onClick={clearCalculator}
            className="rounded-xl bg-red-500 p-4 text-xl font-semibold text-white hover:bg-red-600"
          >
            C
          </button>

          <button
            onClick={deleteNumber}
            className="rounded-xl bg-gray-700 p-4 text-xl font-semibold text-white hover:bg-gray-600"
          >
            DEL
          </button>

          <button
            onClick={() => handleOperator("/")}
            className="rounded-xl bg-orange-500 p-4 text-xl font-semibold text-white hover:bg-orange-600"
          >
            ÷
          </button>

          <button
            onClick={() => handleOperator("*")}
            className="rounded-xl bg-orange-500 p-4 text-xl font-semibold text-white hover:bg-orange-600"
          >
            ×
          </button>

          <button onClick={() => handleNumber("7")} className="calc-btn">
            7
          </button>
          <button onClick={() => handleNumber("8")} className="calc-btn">
            8
          </button>
          <button onClick={() => handleNumber("9")} className="calc-btn">
            9
          </button>
          <button
            onClick={() => handleOperator("-")}
            className="rounded-xl bg-orange-500 p-4 text-xl font-semibold text-white hover:bg-orange-600"
          >
            −
          </button>

          <button onClick={() => handleNumber("4")} className="calc-btn">
            4
          </button>
          <button onClick={() => handleNumber("5")} className="calc-btn">
            5
          </button>
          <button onClick={() => handleNumber("6")} className="calc-btn">
            6
          </button>
          <button
            onClick={() => handleOperator("+")}
            className="rounded-xl bg-orange-500 p-4 text-xl font-semibold text-white hover:bg-orange-600"
          >
            +
          </button>

          <button onClick={() => handleNumber("1")} className="calc-btn">
            1
          </button>
          <button onClick={() => handleNumber("2")} className="calc-btn">
            2
          </button>
          <button onClick={() => handleNumber("3")} className="calc-btn">
            3
          </button>

          <button
            onClick={handleEquals}
            className="row-span-2 rounded-xl bg-green-500 p-4 text-xl font-semibold text-white hover:bg-green-600"
          >
            =
          </button>

          <button
            onClick={() => handleNumber("0")}
            className="calc-btn col-span-2"
          >
            0
          </button>

          <button onClick={handleDecimal} className="calc-btn">
            .
          </button>
        </div>
      </div>

      <style jsx>{`
        .calc-btn {
          border-radius: 0.75rem;
          background: #374151;
          padding: 1rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
        }

        .calc-btn:hover {
          background: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default Page;
