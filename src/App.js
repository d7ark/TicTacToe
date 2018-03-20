import React, { Component } from 'react';
import './App.css';
import Board from './Board';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      isXNext: true,
      stepNumber: 0,
      movesAscending: true,
    }
  }

  handleClick (i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return null;
    }

    squares[i] = this.state.isXNext ? 'x' : 'o';
    const col = i % 3;
    const row = Math.floor(i / 3);
    this.setState({
      history : history.concat([{ squares: squares, move: {col, row} }]),
      isXNext : !this.state.isXNext,
      stepNumber: history.length,
    });
  }

  jumpTo (step) {
    this.setState({
      stepNumber: step,
      isXNext: (step % 2) === 0,
    });
  }

  toggleMoves () {
    this.setState({
      movesAscending : !this.state.movesAscending,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const draw = isDraw(current.squares);

    let status = 'Step number: ' + this.state.stepNumber + ' ';
    if (winner) {
      status += 'The winner is player ' + winner.name + ' ';
    } else if (draw) {
      status += 'Draw'
    } else {
      status += 'Next player: ' + (this.state.isXNext ? 'x' : 'o');
    }

    let moves = history.map((step, move) => {
      const desc = move ?
        'go to move #' + move + ' (' + step.move.row + ' , ' + step.move.col + ')' :
        'go to beggining';
      const active = move === this.state.stepNumber;

      let button;
      if (active) {
        button = <button onClick={() => this.jumpTo(move)}><b>{desc}</b></button>;
      } else {
        button = <button onClick={() => this.jumpTo(move)}>{desc}</button>;
      }

      return (
        <li key={move}>{button}</li>
      )
    });

    if (!this.state.movesAscending) {
      moves.reverse();
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winners={winner ? winner.squares : 'nope'}
            />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div><button onClick={() => this.toggleMoves()}>toggle moves</button></div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner (squares) {
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
      return {name: squares[a], squares : [a, b, c]};
    }
  }
  return null;
}

function isDraw (squares) {
  return squares.every((element) => element !== null);
}

// ========================================
export default App;
