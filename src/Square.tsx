import * as React from "react";

import "./Square.css";

interface IsquareProps {
  onClick: (n: React.MouseEvent<HTMLButtonElement>) => void;
  value?: string;
  winner?: boolean;
}

class Square extends React.Component<IsquareProps, {}> {
  public render() {
    const { onClick: handleClick, value, winner } = this.props;
    const className = winner ? "winner" : "";
    return (
      <button className={"square " + className} onClick={handleClick}>
        {value}
      </button>
    );
  }
}

export default Square;
