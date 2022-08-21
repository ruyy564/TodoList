import React from 'react';
import { NavLink } from 'react-router-dom';
const Footer = ({ tasks, removeCompletedTask }) => {
  const isActiveLink = ({ isActive }) => (isActive ? 'selected' : '');

  return (
    <footer className="footer">
      <span className="todo-count">
        {tasks.filter((task) => !task.completed).length} item left
      </span>
      <ul className="filters">
        <li>
          <NavLink to="/" className={isActiveLink}>
            All
          </NavLink>
        </li>
        <li>
          <NavLink to="/active" className={isActiveLink}>
            Active
          </NavLink>
        </li>
        <li>
          <NavLink to="/completed" className={isActiveLink}>
            Completed
          </NavLink>
        </li>
      </ul>
      <button className="clear-completed" onClick={removeCompletedTask}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
