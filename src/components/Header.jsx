import React from 'react';

const Header = ({ addTask, newTask, addNewTaskHandler }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={addTask}
        onChange={addNewTaskHandler}
        value={newTask}
      />
    </header>
  );
};

export default Header;
