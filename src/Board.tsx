import * as React from "react";

import Square from "./Square";

interface IboardProps {
  onClick: (n: number) => void;
  squares: Array<undefined | string>;
  winners?: number[];
}

class Board extends React.Component<IboardProps, {}> {
  private renderSquare(i: number) {
    const { onClick: handleClick, squares, winners } = this.props;
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => handleClick(i)}
        winner={winners && winners.indexOf(i) !== -1}
      />
    );
  }

  // tslint:disable-next-line:member-ordering
  public render() {
    const board = [];
    for (let row = 0; row < 3; row++) {
      const cols = [];
      for (let col = 0; col < 3; col++) {
        cols.push(this.renderSquare(row * 3 + col));
      }
      board.push(
        <div key={row} className="board-row">
          {cols}
        </div>
      );
    }

    return <div> {board} </div>;
  }
}

export default Board;
