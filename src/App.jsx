import './App.css'
import TodoList from './TodoList.jsx'
import AddTodoForm from './AddTodoForm.jsx'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styles from './App.module.css'
import Nav from './Nav.jsx'

const getOptions = {
  method: "GET",      
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
  },
};

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {

    setIsLoading(true);
    
    try {
      const response = await fetch(url, getOptions);
    
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title
      }));

      setTodoList(todos);      
    } catch (error) {
      console.log(error.message);
    }  finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if(!isLoading) {
        localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    };
  }, [todoList, isLoading]);

  const postTodo = async (todo) => {
    
    const airtableData = {
      fields: {
        title: todo,
      },
    };

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify(airtableData),
    };

    try {

      const response = await fetch(url, postOptions);

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
    <BrowserRouter>
      <div className={styles.appContainer}>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>Todo List</h1>
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? <p>Loading...</p> :
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
              </div>
            }
          />
          <Route
            path="/new"
            element={
              <h1>New Todo List</h1>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App