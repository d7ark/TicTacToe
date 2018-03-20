import React, { Component } from 'react';
import './Square.css';

class Square extends React.Component {
  render() {
    const className = this.props.winner ? 'winner' : '';
    return (
      <button
        className={"square "  + className}
        onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

export default Square;
