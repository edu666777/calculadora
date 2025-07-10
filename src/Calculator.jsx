import React, { useState } from 'react';
import './Calculator.css';

const buttons = [
  ['MC', 'MR', 'M+', 'M-', 'MS', 'M+'],
  ['%', 'CE', 'C', '⌫'],
  ['1/x', 'x²', '√x', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['±', '0', ',', '='],
];

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState(null);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const backspace = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const toggleSign = () => {
    setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
  };

  const percent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display.replace(',', '.'));
    if (operator && firstOperand != null && !waitingForOperand) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    } else {
      setFirstOperand(inputValue);
    }
    setOperator(nextOperator);
    setWaitingForOperand(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '−': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 'Erro';
      default: return b;
    }
  };

  const handleButtonClick = (value) => {
    if (!isNaN(value)) {
      inputDigit(value);
    } else if (value === ',') {
      inputDot();
    } else if (['+', '−', '×', '÷'].includes(value)) {
      performOperation(value);
    } else if (value === '=') {
      if (operator && firstOperand != null) {
        const result = calculate(firstOperand, parseFloat(display.replace(',', '.')), operator);
        setDisplay(String(result));
        setFirstOperand(null);
        setOperator(null);
        setWaitingForOperand(false);
      }
    } else if (value === 'C') {
      clearAll();
    } else if (value === 'CE') {
      clearEntry();
    } else if (value === '⌫') {
      backspace();
    } else if (value === '±') {
      toggleSign();
    } else if (value === '%') {
      percent();
    }
    // Funções de memória e especiais podem ser implementadas depois
  };

  return (
    <div className="calculator-container">
      <div className="calculator-display">{display}</div>
      <div className="calculator-buttons">
        {buttons.flat().map((btn, idx) => (
          <button
            key={idx}
            className={`btn btn-${btn}`}
            onClick={() => handleButtonClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
