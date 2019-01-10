import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../helpers';

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
      name: '',
    },
    isInputActive: false,
  };

  shouldComponentUpdate({ todoObj: { done: newDone, name: newName } }) {
    const { done, name } = this.props.todoObj;

    return newDone !== done || newName !== name;
  }

  onTodoToggleDone = (e) => {
    const { todoObj, onTodoChange } = this.props;

    onTodoChange(todoObj.id, {
      [e.target.name]: e.target.value === 'true' ? true : false,
    });
  };

  onTodoInput = (e) => {
    const { todoObj, onTodoChange } = this.props;

    onTodoChange(todoObj.id, {
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { todoObj, isInputActive } = this.props;

    const { id, done, name } = todoObj;

    return (
      <div className={classNames('todo', { 'todo--done': done })}>
        <div className="todo__head">
          <button
            type="checkbox"
            className="todo__head__done"
            onClick={this.onTodoToggleDone}
            value={!done}
            name="done"
            disabled={isInputActive}
          />
          <input
            className="todo__head__name"
            value={name}
            autoFocus={isInputActive}
            disabled={!isInputActive}
            onChange={this.onTodoInput}
            type="text"
            name="name"
            placeholder="What to do?"
            autoComplete={'off'}
          />
        </div>
      </div>
    );
  }
}

export default Todo;
