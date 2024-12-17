import './App.css'
import './TodoList.jsx'
import TodoList from './TodoList.jsx'
import AddTodoForm from './AddTodoForm.jsx'
import { useEffect, useState } from 'react'

function useSemiPersistentState() {

  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem('savedTodoList'))
  );

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
}

function App() {

  const [todoList, setTodoList] = useSemiPersistentState();

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  function removeTodo(id) {
  const newTodoList = todoList.filter(
    (todo) => todo.id !== id
  );

  setTodoList(newTodoList);
}

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App
