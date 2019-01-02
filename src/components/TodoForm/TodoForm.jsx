import React, { Component } from 'react';
import { classNames } from '../../helpers';
import Todo from '../Todo';

class TodoForm extends Component {
  state = {
    active: false,
    value: '',
  };

  shouldComponentUpdate(_, { active: newActive, value: newValue }) {
    const { active, value } = this.state;

    return newActive !== active || newValue !== value;
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { dayObj, onNewTodo } = this.props;
    const { value } = this.state;

    if (value.length > 0) {
      onNewTodo(dayObj, value);
      this.setState({ active: false, value: '' });
    }
  };

  toggleActive = (e) => {
    e.preventDefault();
    this.setState({ active: true });
  };

  render() {
    const { active, value } = this.state;

    // TODO: Rework class system connected with button

    return (
      <form
        className={classNames('new-todo-form', {
          'new-todo-form--active': active,
        })}
        onSubmit={active ? this.handleSubmit : this.toggleActive}
      >
        <div className="new-todo-form__body">
          {active && <Todo onTodoChange={() => {}} isInputActive />}
        </div>
        <button className="new-todo-form__button">+</button>
      </form>
    );
  }
}

export default TodoForm;
