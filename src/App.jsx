import './App.css'
import TodoList from './components/TodoList.jsx'
import AddTodoForm from './components/AddTodoForm.jsx'
import { useEffect, useState, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import styles from './App.module.css'
import Nav from './Nav.jsx'
import SortToggleButton from './components/SortToggleButton.jsx'
import Home from './components/Home.jsx'

const getOptions = {
  method: "GET",      
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
  },
};

function App() {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState('asc');
  const [tableName, setTableName] = useState('Todo List');

  const path = useLocation();

  useEffect(() => {
    if (path.pathname === '/' || path.pathname === '/main') {
      setTableName('Todo List')
    } else if (path.pathname === '/others') {
      setTableName('Ideas & Notes');
    }
  }, [path.pathname]);

  const toggleSortDirection = () => {
    setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
  };

  const fetchData = useCallback(async () => {

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}?view=Grid%20view&sort%5B0%5D%5Bfield%5D=createdTime&sort%5B0%5D%5Bdirection%5D=${sortDirection}`;

    setIsLoading(true);
    
    try {
      const response = await fetch(url, getOptions);
    
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      console.log("Airtable API Response:", data.records);

      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title,
        createdTime: todo.fields.createdTime
      }));

      setTodoList(todos);      
    } catch (error) {
      console.log(error.message);
    }  finally {
      setIsLoading(false);
    }
  }, [tableName, sortDirection]);

  useEffect(() => {
    fetchData();
  }, [tableName, sortDirection, fetchData]);

  useEffect(() => {
    if(!isLoading) {
        localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    };
  }, [todoList, isLoading]);

  useEffect(() => {
    if (path.pathname !== '/') {
      console.log("User has navigated away from home.");
      localStorage.setItem('hasNavigated', JSON.stringify(true));
    }
  }, [path.pathname]);

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

    const postUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}`;

    try {

      const response = await fetch(postUrl, postOptions);

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

  const addTodo = async (title) => {
    const newTodo = await postTodo(title);
    if (newTodo) {
      fetchData();
    }
  };

  const deleteTodo = async (id) => {
    const deleteUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}/${id}`;

    const deleteOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(deleteUrl, deleteOptions);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
      console.log(`Todo with ID '${id}' deleted`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    fetchData();
  };

  return (
      <div className={styles.appContainer}>
        <Nav />
        <Routes>
          <Route
            path='/'
            element={
              <div>
                <Home todoList={todoList} />
              </div>
            }
          />
          <Route
            path='/main'
            element={
              <div>
                <h1>{tableName}</h1>
                <SortToggleButton sortDirection={sortDirection} toggleSortDirection={toggleSortDirection} />
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? <p>Loading...</p> :
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
              </div>
            }
          />
          <Route
            path='/others'
            element={
              <div>
                <h1>{tableName}</h1>
                <SortToggleButton sortDirection={sortDirection} toggleSortDirection={toggleSortDirection} />
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? <p>Loading...</p> :
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
              </div>
            }
          />
        </Routes>
      </div>
  );
}

export default App