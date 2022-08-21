import React from 'react';

export class Task extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <li
        onDoubleClick={this.props.toggleEdit}
        className={this.props.task.completed ? ' completed ' : ''}
        onBlur={this.props.blurEdit}
        onKeyDown={this.props.enterEdit}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={() => {
              this.props.completedTask(this.props.task.id);
            }}
            checked={this.props.task.completed}
          />
          <label>{this.props.task.name}</label>
          <button
            className="destroy"
            onClick={() => this.props.removeTask(this.props.task.id)}
          ></button>
        </div>
        <input
          className="edit"
          onChange={(e) => this.props.changeTask(e, this.props.task)}
          type="text"
          value={this.props.task.name}
        />
      </li>
    );
  }
}
