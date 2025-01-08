import './App.css'
import TodoList from './TodoList.jsx'
import AddTodoForm from './AddTodoForm.jsx'
import { useEffect, useState } from 'react'

function App() {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {

    const options = {
      method: "GET",      
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      },
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    
    try {
      const response = await fetch(url, options);
    
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title
      }));

      console.log(todos);

      setTodoList(todos);
      setIsLoading(false);
      
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if(!isLoading) {
        localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    };
  }, [todoList]);

  const postTodo = async (todo) => {
    try {
      const airtableData = {
        fields: {
          title: todo,
        },
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify(airtableData),
      };

      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      return {
        id: data.id,
        title: data.fields.title,
      };
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const addTodo = async (newTodoTitle) => {
    const newTodo = await postTodo(newTodoTitle);
    if (newTodo) {
      setTodoList((prevList) => [...prevList, newTodo]);
    }
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

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