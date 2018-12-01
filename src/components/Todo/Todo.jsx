import React, { Component } from 'react';

export default class Todo extends Component {
  state = {
    minified: true,
  };

  toggleMinified = () => {
    this.setState((state) => ({
      minified: !state.minified,
    }));
  };

  handleTodoChange = (nameOfChange) => {
    return (e) => {
      const { todoObj, onTodoChange } = this.props;
      let change = e.target.value;
      // If 'change' contains stringed bool, we convert it to bool
      if (nameOfChange === 'done') {
        change = change === 'true' ? true : false;
      }
      onTodoChange(todoObj.id, {
        [nameOfChange]: change,
      });
    };
  };

  render() {
    const { minified } = this.state;
    const { todoObj } = this.props;

    const { id, done, name, desc } = todoObj;

    return (
      <div
        className={`todo ${minified ? 'todo--minified' : ''} ${
          done ? 'todo--done' : ''
        }`}
      >
        <div className="todo__head">
          <input
            type="checkbox"
            className="todo__head__done"
            checked={done}
            onChange={this.handleTodoChange('done')}
            value={!done}
          />
          <input
            type="text"
            className="todo__head__name"
            onChange={this.handleTodoChange('name')}
            value={name}
            disabled
          />
          {/* <div className="todo__head__name">{name}</div> */}
          <button
            className="todo__head__btn-expand btn--round"
            onClick={this.toggleMinified}
          >
            v
          </button>
        </div>
        <div className="todo__content">
          <input
            type="text"
            className="todo__content__desc"
            onChange={this.handleTodoChange('desc')}
            value={desc}
          />
        </div>
      </div>
    );
  }
}
