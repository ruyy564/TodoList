import React from 'react';
import { Task } from './Task';
import { Footer } from './Footer';
import { Header } from './Header';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [], filtered: 'all' };
    this.props = props;
    this.addTask = this.addTask.bind(this);
    this.completedTask = this.completedTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.allComplited = this.allComplited.bind(this);
    this.removeCompletedTask = this.removeCompletedTask.bind(this);
    this.filtered = this.filtered.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.completedEdit = this.completedEdit.bind(this);
    this.blurEdit = this.blurEdit.bind(this);
    this.enterEdit = this.enterEdit.bind(this);
    this.changeTask = this.changeTask.bind(this);
  }

  blurEdit(event) {
    if (event.target.className === 'edit') {
      this.completedEdit(event);
    }
  }

  enterEdit(event) {
    if (event.target.className === 'edit' && event.key === 'Enter') {
      this.completedEdit(event);
    }
  }

  changeTask(event, task) {
    this.setState((state) => {
      return {
        ...state,
        tasks: this.state.tasks.map((el) => {
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
  }

  toggleEdit(event) {
    event.currentTarget.classList.add('editing');
    event.currentTarget.children[1].focus();
  }

  completedEdit(event) {
    event.currentTarget.classList.remove('editing');
  }

  filtered(filter) {
    this.setState({ ...this.state, filtered: filter });
  }

  allComplited() {
    this.setState((state) => {
      const { tasks } = state;
      let completed = true;
      const length = tasks.filter((task) => !task.completed).length;

      if (length === 0) {
        completed = false;
      }

      return {
        ...state,
        tasks: tasks.map((task) => ({ ...task, completed: completed })),
      };
    });
  }

  addTask(event) {
    if (event.key === 'Enter') {
      this.setState((state) => {
        const { tasks } = state;
        const task = {
          id: new Date().valueOf(),
          name: event.target.value,
          completed: false,
        };

        event.target.value = '';

        return { ...state, tasks: [...tasks, task] };
      });
    }
  }

  removeCompletedTask() {
    this.setState((status) => ({
      ...status,
      tasks: status.tasks.filter((el) => !el.completed),
    }));
  }

  removeTask(id) {
    this.setState((status) => ({
      ...status,
      tasks: status.tasks.filter((el) => el.id !== id),
    }));
  }

  completedTask(id) {
    this.setState((state) => {
      return {
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : { ...task }
        ),
      };
    });
  }

  render() {
    return (
      <section className="todoapp">
        <Header addTask={this.addTask} />
        <section style={{ display: 'block' }} className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          {this.state.tasks.length !== 0 ? (
            <label htmlFor="toggle-all" onClick={this.allComplited}>
              Mark all as complete
            </label>
          ) : null}
          <ul className="todo-list">
            {this.state.tasks
              .filter((task) => {
                if (this.state.filtered === 'all') {
                  return true;
                }

                return this.state.filtered === task.completed;
              })
              .map((task) => (
                <Task
                  key={task.id}
                  toggleEdit={this.toggleEdit}
                  changeTask={this.changeTask}
                  enterEdit={this.enterEdit}
                  blurEdit={this.blurEdit}
                  task={task}
                  removeTask={this.removeTask}
                  completedTask={this.completedTask}
                />
              ))}
          </ul>
          {this.state.tasks.length !== 0 ? (
            <Footer
              tasks={this.state.tasks}
              filter={this.state.filtered}
              filtered={this.filtered}
              removeCompletedTask={this.removeCompletedTask}
            />
          ) : null}
        </section>
      </section>
    );
  }
}

export default TodoList;
