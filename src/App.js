import { Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TodoList filters={'all'} />} />
        <Route path="/active" element={<TodoList filters={false} />} />
        <Route path="/completed" element={<TodoList filters={true} />} />
      </Routes>
    </div>
  );
}

export default App;
