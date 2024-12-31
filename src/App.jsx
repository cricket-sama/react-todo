import './App.css'
import './TodoList.jsx'
import TodoList from './TodoList.jsx'
import AddTodoForm from './AddTodoForm.jsx'
import { useEffect, useState } from 'react'

function App() {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: JSON.parse(localStorage.getItem('savedTodoList'))
          }
        });
      }, 2000);
    });

    promise.then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if(isLoading === false) {
        localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    };
  }, [todoList]);

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
      {isLoading ? <p>Loading...</p> :
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
    </>
  );
}

export default App
