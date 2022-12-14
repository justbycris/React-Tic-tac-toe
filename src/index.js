import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* ----NOTES-----

class: type of function but instead of using the keyword function to initiate it, 
      we use the word 'class', and the properties are assigned inside a 'constructor()' method.
      *you can add methods in a class

Two approaches to changing data: 
      1. Mutate the data by directly changing the data's value
      2. Replace the data with a new copy which has the desired changes.

function component: simpler way to write components that only contain a render method
        and don't have their own state. Instead of defininf a class which extends React.Component
        we can write a function that takes props as input and returns what should be rendered.


*/

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
      }
    }

    handleClick(i){
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return; 
      }

      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }


    renderSquare(i) {
      return <Square value={this.state.squares[i]} 
      onClick={() => this.handleClick(i)}
      />;
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
          let status; 
          if (winner) {
            status = 'Winner: ' + winner;

          } else {
            status = 'Next player: ' + 
            (this.state.xIsNext ? 'X' : 'O');
          }

    
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);

  function calculateWinner(squares) {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  