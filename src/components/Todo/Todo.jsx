import React, { Component } from 'react';
import { classNames } from '../../helpers';

export default class Todo extends Component {
  shouldComponentUpdate({ todoObj: { done: newDone, name: newName } }) {
    const { done, name } = this.props.todoObj;

    return newDone !== done || newName !== name;
  }

  handleTodoChange = (value) => {
    return (e) => {
      const { todoObj, onTodoChange } = this.props;
      let change = value == undefined ? e.target.value : value;
      // If 'change' contains stringed bool, we convert it to bool
      if (e.target.name === 'done') {
        change = change === 'true' ? true : false;
      }
      onTodoChange(todoObj.id, {
        [e.target.name]: change,
      });
    };
  };

  render() {
    const { todoObj } = this.props;

    const { id, done, name } = todoObj;

    return (
      <div className={classNames('todo', { 'todo--done': done })}>
        <div className="todo__head">
          <button
            type="checkbox"
            className="todo__head__done"
            onClick={this.handleTodoChange()}
            value={!done}
            name="done"
          />
          <input
            type="text"
            className="todo__head__name"
            onChange={this.handleTodoChange()}
            value={name}
            name="name"
            disabled
          />
        </div>
      </div>
    );
  }
}
