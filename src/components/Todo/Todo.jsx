import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { classNames } from '../../helpers';
import { crossMark, okHand, wastebasket, poop } from '../../static/emojis';
import ToolButton from '../ToolButton/ToolButton';

class Todo extends Component {
  static propTypes = {
    todoObj: PropTypes.shape({
      id: PropTypes.number,
      done: PropTypes.bool,
      name: PropTypes.string,
    }),
    onTodoChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    todoObj: {
      id: -1,
      done: false,
      name: 'DEFAULT THING TO DO',
    },
    isInputActive: false,
  };

  shouldComponentUpdate({ todoObj: { done: newDone, name: newName } }) {
    const { done, name } = this.props.todoObj;

    return newDone !== done || newName !== name;
  }

  onTodoToggleDone = () => {
    const {
      todoObj: { id, done },
      onTodoChange,
    } = this.props;

    onTodoChange(id, {
      done: !done,
    });
  };

  onTodoInput = (e) => {
    const { todoObj, onTodoChange } = this.props;

    onTodoChange(todoObj.id, {
      [e.target.name]: e.target.value,
    });
  };

  onTodoDelete = () => {
    const {
      todoObj: { id },
      onTodoDelete,
    } = this.props;

    onTodoDelete(id);
  };

  render() {
    const { todoObj, isInputActive } = this.props;

    const { done, name } = todoObj;

    return (
      <div className={classNames('todo', { 'todo--done': done })}>
        <div className="todo__tooltip">
          <ToolButton
            emoji={done ? okHand : crossMark}
            className="todo__tooltip__done"
            alt="Mark as done"
            onClick={this.onTodoToggleDone}
          />
          {done && (
            <ToolButton
              emoji={poop}
              className="tool-button--warning todo__tooltip__delete"
              alt="Delete"
              onClick={this.onTodoDelete}
            />
          )}
        </div>
        <input
          className="todo__name"
          value={name}
          alt={name}
          autoFocus={isInputActive}
          disabled={!isInputActive}
          onChange={this.onTodoInput}
          type="text"
          name="name"
          placeholder="What to do?"
          autoComplete="off"
        />
      </div>
    );
  }
}

export default Todo;
