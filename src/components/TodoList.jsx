import React, { useState, useEffect } from 'react';
import Task from './Task';
import Footer from './Footer';
import Header from './Header';

const TodoList = ({ filters }) => {
  const [state, setState] = useState({ tasks: [], filtered: 'all' });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    setState({ ...state, filtered: filters });
  }, [filters]);

  const addNewTaskHandler = (e) => {
    setNewTask(e.target.value);
  };

  const completedEdit = (event) => {
    event.currentTarget.classList.remove('editing');
  };

  const blurEdit = (event) => {
    if (event.target.className === 'edit') {
      completedEdit(event);
    }
  };

  const enterEdit = (event) => {
    if (event.target.className === 'edit' && event.key === 'Enter') {
      completedEdit(event);
    }
  };

  const changeTask = (event, task) => {
    setState((state) => {
      return {
        ...state,
        tasks: state.tasks.map((el) => {
          if (el.id === task.id) {
            return {
              ...el,
              name: event.target.value,
            };
          }

          return { ...el };
        }),
      };
    });
  };

  const toggleEdit = (event) => {
    event.currentTarget.classList.add('editing');
    event.currentTarget.children[1].focus();
  };

  const allComplited = () => {
    setState((state) => {
      const { tasks } = state;
      const length = tasks.filter((task) => !task.completed).length;
      let completed = true;

      if (length === 0) {
        completed = false;
      }

      return {
        ...state,
        tasks: tasks.map((task) => ({ ...task, completed: completed })),
      };
    });
  };

  const addTask = (event) => {
    if (event.key === 'Enter') {
      setState((state) => {
        const task = {
          id: new Date().valueOf(),
          name: newTask,
          completed: false,
        };
        setNewTask('');

        return { ...state, tasks: [...state.tasks, task] };
      });
    }
  };

  const removeCompletedTask = () => {
    setState((status) => ({
      ...status,
      tasks: status.tasks.filter((el) => !el.completed),
    }));
  };

  const removeTask = (id) => {
    setState((status) => ({
      ...status,
      tasks: status.tasks.filter((el) => el.id !== id),
    }));
  };

  const completedTask = (id) => {
    setState((state) => {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : { ...task }
        ),
      };
    });
  };

  return (
    <section className="todoapp">
      <Header
        addTask={addTask}
        addNewTaskHandler={addNewTaskHandler}
        newTask={newTask}
      />
      <section style={{ display: 'block' }} className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        {state.tasks.length !== 0 ? (
          <label htmlFor="toggle-all" onClick={allComplited}>
            Mark all as complete
          </label>
        ) : null}
        <ul className="todo-list">
          {state.tasks
            .filter((task) => {
              if (state.filtered === 'all') {
                return true;
              }

              return state.filtered === task.completed;
            })
            .map((task) => (
              <Task
                key={task.id}
                toggleEdit={toggleEdit}
                changeTask={changeTask}
                enterEdit={enterEdit}
                blurEdit={blurEdit}
                task={task}
                removeTask={removeTask}
                completedTask={completedTask}
              />
            ))}
        </ul>
        {state.tasks.length !== 0 ? (
          <Footer
            tasks={state.tasks}
            removeCompletedTask={removeCompletedTask}
          />
        ) : null}
      </section>
    </section>
  );
};

export default TodoList;
