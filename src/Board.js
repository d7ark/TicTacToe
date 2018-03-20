import React, { Component } from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        winner={this.props.winners && this.props.winners.indexOf(i) !== -1}
      />
    );
  }

  render() {
    let board = [];
    for (let row = 0; row < 3;  row++) {
      let cols = [];
      for (let col = 0; col < 3; col++) {
        cols.push(this.renderSquare((row * 3) + col));
      }
      board.push(<div key={row} className="board-row">{cols}</div>);
    }

    return (
      <div> {board} </div>
    );
  }
}


export default Board;
