import React, { useState } from "react";
import "./calculadora.css";

const botoes = [
  ["MC", "MR", "M+", "M-", "MS"],
  ["%", "CE", "C", "⌫"],
  ["1/x", "x²", "√", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["±", "0", ",", "="],
];

function Calculadora() {
  const [display, setDisplay] = useState("0");
  const [memoria, setMemoria] = useState(0);
  const [operador, setOperador] = useState(null);
  const [valorAnterior, setValorAnterior] = useState(null);
  const [aguardandoNovoNumero, setAguardandoNovoNumero] = useState(false);

  const limparTudo = () => {
    setDisplay("0");
    setOperador(null);
    setValorAnterior(null);
    setAguardandoNovoNumero(false);
  };

  const limparEntrada = () => setDisplay("0");

  const backspace = () => setDisplay(display.length > 1 ? display.slice(0, -1) : "0");

  const inserirNumero = (num) => {
    if (aguardandoNovoNumero) {
      setDisplay(num);
      setAguardandoNovoNumero(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inserirVirgula = () => {
    if (!display.includes(",")) setDisplay(display + ",");
  };

  const trocarSinal = () => setDisplay((parseFloat(display.replace(",", ".")) * -1).toString().replace(".", ","));

  const calcular = (proxOperador) => {
    let valorAtual = parseFloat(display.replace(",", "."));
    if (valorAnterior != null && operador) {
      switch (operador) {
        case "+": valorAtual = valorAnterior + valorAtual; break;
        case "−": valorAtual = valorAnterior - valorAtual; break;
        case "×": valorAtual = valorAnterior * valorAtual; break;
        case "÷": valorAtual = valorAtual !== 0 ? valorAnterior / valorAtual : "Erro"; break;
        default: break;
      }
      setDisplay(valorAtual.toString().replace(".", ","));
      setValorAnterior(valorAtual === "Erro" ? null : valorAtual);
    } else {
      setValorAnterior(valorAtual);
    }
    setOperador(proxOperador === "=" ? null : proxOperador);
    setAguardandoNovoNumero(true);
  };

  const calcularEspecial = (tipo) => {
    let valor = parseFloat(display.replace(",", "."));
    switch (tipo) {
      case "%": valor = valorAnterior ? (valorAnterior * valor) / 100 : valor / 100; break;
      case "1/x": valor = valor !== 0 ? 1 / valor : "Erro"; break;
      case "x²": valor = valor ** 2; break;
      case "√": valor = valor >= 0 ? Math.sqrt(valor) : "Erro"; break;
      default: break;
    }
    setDisplay(valor.toString().replace(".", ","));
    setAguardandoNovoNumero(true);
  };

  const memoriaFunc = (tipo) => {
    let valor = parseFloat(display.replace(",", "."));
    switch (tipo) {
      case "MC": setMemoria(0); break;
      case "MR": setDisplay(memoria.toString().replace(".", ",")); break;
      case "M+": setMemoria(memoria + valor); break;
      case "M-": setMemoria(memoria - valor); break;
      case "MS": setMemoria(valor); break;
      default: break;
    }
    setAguardandoNovoNumero(true);
  };

  const handleClick = (btn) => {
    if (!isNaN(btn)) return inserirNumero(btn);
    if (btn === ",") return inserirVirgula();
    if (btn === "±") return trocarSinal();
    if (["+", "−", "×", "÷", "="].includes(btn)) return calcular(btn);
    if (["%", "1/x", "x²", "√"].includes(btn)) return calcularEspecial(btn);
    if (["MC", "MR", "M+", "M-", "MS"].includes(btn)) return memoriaFunc(btn);
    if (btn === "C") return limparTudo();
    if (btn === "CE") return limparEntrada();
    if (btn === "⌫") return backspace();
  };

  return (
    <div className="calculadora">
      <div className="display">{display}</div>
      <div className="botoes">
        {botoes.flat().map((btn, i) => (
          <button key={i} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
      </div>
    </div>
  );
}

export default Calculadora;