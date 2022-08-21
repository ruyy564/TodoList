import React from 'react';

export class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          {this.props.tasks.filter((task) => !task.completed).length} item left
        </span>
        <ul className="filters">
          <li>
            <a
              href="#"
              className={this.props.filter === 'all' ? 'selected' : null}
              onClick={() => {
                this.props.filtered('all');
              }}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => {
                this.props.filtered(false);
              }}
              className={this.props.filter === false ? 'selected' : null}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => {
                this.props.filtered(true);
              }}
              className={this.props.filter === true ? 'selected' : null}
            >
              Completed
            </a>
          </li>
        </ul>
        <button
          className="clear-completed"
          onClick={this.props.removeCompletedTask}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}
