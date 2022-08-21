import React from 'react';

const Task = ({
  toggleEdit,
  task,
  blurEdit,
  enterEdit,
  completedTask,
  removeTask,
  changeTask,
}) => {
  return (
    <li
      onDoubleClick={toggleEdit}
      className={task.completed ? ' completed ' : ''}
      onBlur={blurEdit}
      onKeyDown={enterEdit}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={() => {
            completedTask(task.id);
          }}
          checked={task.completed}
        />
        <label>{task.name}</label>
        <button
          className="destroy"
          onClick={() => removeTask(task.id)}
        ></button>
      </div>
      <input
        className="edit"
        onChange={(e) => changeTask(e, task)}
        type="text"
        value={task.name}
      />
    </li>
  );
};

export default Task;
