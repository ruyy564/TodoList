import React from 'react';

const Footer = ({ tasks, filter, filtered, removeCompletedTask }) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        {tasks.filter((task) => !task.completed).length} item left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#"
            className={filter === 'all' ? 'selected' : null}
            onClick={() => {
              filtered('all');
            }}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => {
              filtered(false);
            }}
            className={filter === false ? 'selected' : null}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => {
              filtered(true);
            }}
            className={filter === true ? 'selected' : null}
          >
            Completed
          </a>
        </li>
      </ul>
      <button className="clear-completed" onClick={removeCompletedTask}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
