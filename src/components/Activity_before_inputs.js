import React, { Component } from 'react';

class Activity extends Component {
  constructor(props) {
    super(props);

    this.isChecked = (function () {
      let check = !props.activity.done;
      const gen = (function* () {
        for (;;) {
          check = !check;
          yield (check+'' === 'true') ? true : false;
        }
      })();
      
      return function () { return gen.next().value };
    })();

    this.isChecked = this.isChecked.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const key = classNameToKey(e.target.className);

    this.forceUpdate();

    this.props.applyChange(
      {
        date: this.props.date,
        id: this.props.activity.id,

        key: key,
        value: true && e.target.value,
      }
    )
  }

  render() {
    return (
      <li
        className={`activity ${(this.props.activity.done) ? "done" : ""}`}
        id={`activity${this.props.activity.id}`}
      >
        <input
          className="activity-done"
          type="checkbox"
          value={!this.isChecked()}
          defaultChecked={this.props.activity.done}
          onChange={this.handleChange}
        />
        <div className="activity-time"> {this.props.activity.time} </div>
        <div className="activity-name" value={this.props.activity.name}> {this.props.activity.name} </div>
        <div className="activity-description"> {(this.props.activity.description) ? `- ${this.props.activity.description}` : ''} </div>
      </li>
    );
  }
}

// function Activity(props) {
//   return (
//     <li
//       className="activity"
//       id={props.id}
//     >
//       <input
//         className="activity-done"
//         type="checkbox"
//         value={!props.activity.done}
//         defaultChecked={props.activity.done}
//       />
//       <div className="activity-time"> {props.activity.time} </div>
//       <div className="activity-name"> {props.activity.name} </div>
//       <div className="activity-description"> {(props.activity.description) ? `- ${props.activity.description}` : ''} </div>
//     </li>
//   );
// }

function classNameToKey(name) {
  return name.slice(9);
}

export default Activity