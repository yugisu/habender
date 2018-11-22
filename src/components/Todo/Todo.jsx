import React, { Component } from 'react';

import NiceDate from '../../NiceDate';

export default class Todo extends Component {
  state = {
    minified: true,
  };

  toggleMinified = () => {
    this.setState((state) => ({
      minified: !state.minified,
    }));
  };

  render() {
    const { minified } = this.state;
    const { todoObj } = this.props;

    return (
      <div className={`todo ${minified ? 'todo--minified' : ''}`}>
        <div className="todo__head">
          <div className="todo__head__name">{todoObj.name}</div>
          <button
            className="todo__head__btn-expand"
            onClick={this.toggleMinified}
          >
            v
          </button>
        </div>
        <div className="todo__content" />
      </div>
    );
  }
}
