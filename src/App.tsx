import * as React from "react";

import Board from "./Board";

import "./App.css";

interface Imove {
  col: string | number;
  row: string | number;
}

interface IhistoryObject {
  squares: Array<undefined | string>;
  move: Imove;
}

interface IinitialState {
  history: IhistoryObject[];
  isXNext: boolean;
  movesAscending: boolean;
  stepNumber: number;
}

const initialState = {
  history: [
    {
      move: { col: "-", row: "-" },
      squares: Array(9).fill(undefined)
    }
  ],
  isXNext: true,
  movesAscending: true,
  stepNumber: 0
};
type State = Readonly<IinitialState>;

class App extends React.Component<{}, State> {
  public readonly state: State = initialState;

  protected handleClick = (i: number) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return null;
    }

    squares[i] = this.state.isXNext ? "x" : "o";
    const col = i % 3;
    const row = Math.floor(i / 3);
    this.setState({
      history: history.concat([{ squares, move: { col, row } }]),
      isXNext: !this.state.isXNext,
      stepNumber: history.length
    });
    return null;
  };

  private jumpTo = (step: number) => {
    this.setState({
      isXNext: step % 2 === 0,
      stepNumber: step
    });
  };

  private toggleMoves = () => {
    this.setState({
      movesAscending: !this.state.movesAscending
    });
  };

  private renderButton = (step: IhistoryObject, index: number) => {
    if (step === null || step.move === null) {
      return null;
    }
    const desc = index
      ? "go to move #" +
        index +
        " (" +
        step.move.row +
        " , " +
        step.move.col +
        ")"
      : "go to beggining";
    const active = index === this.state.stepNumber;

    let button;
    if (active) {
      button = (
        <button onClick={() => this.jumpTo(index)}>
          <b>{desc}</b>
        </button>
      );
    } else {
      button = <button onClick={() => this.jumpTo(index)}>{desc}</button>;
    }

    return <li key={index}>{button}</li>;
  };

  // tslint:disable-next-line:member-ordering
  public render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const draw = isDraw(current.squares);

    let status = "Step number: " + this.state.stepNumber + " ";
    if (winner) {
      status += "The winner is player " + winner.name + " ";
    } else if (draw) {
      status += "Draw";
    } else {
      status += "Next player: " + (this.state.isXNext ? "x" : "o");
    }

    const moves = history.map(this.renderButton);

    if (!this.state.movesAscending) {
      moves.reverse();
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={this.handleClick}
            winners={winner ? winner.squares : undefined}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button onClick={() => this.toggleMoves()}>toggle moves</button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares: Array<undefined | string>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { name: squares[a], squares: [a, b, c] };
    }
  }
  return null;
}

function isDraw(squares: Array<undefined | string>) {
  return squares.every(element => element !== null);
}

// ========================================
export default App;
