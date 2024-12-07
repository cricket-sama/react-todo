import './App.css'
import './TodoList.jsx'
import TodoList from './TodoList.jsx'
import AddTodoForm from './AddTodoForm.jsx'
import { useState } from 'react'

function App() {

  const [todoList, setTodoList] = useState([]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </>
  );
}

export default App
