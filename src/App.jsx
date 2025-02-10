import './App.css'
import TodoList from './components/TodoList.jsx'
import AddTodoForm from './components/AddTodoForm.jsx'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styles from './App.module.css'
import Nav from './Nav.jsx'
import SortToggleButton from './components/SortToggleButton.jsx'

const getOptions = {
  method: "GET",      
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
  },
};

// URL from Week 15 initial instructions
// const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort%5B0%5D%5Bfield%5D=title&sort%5B0%5D%5Bdirection%5D=asc`;

function App() {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState('asc');

  const toggleSortDirection = () => {
    setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
  };

  const fetchData = async () => {

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort%5B0%5D%5Bfield%5D=createdTime&sort%5B0%5D%5Bdirection%5D=${sortDirection}`;

    setIsLoading(true);
    
    try {
      const response = await fetch(url, getOptions);
    
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      // First JS sorting, A-to-Z
      // data.records.sort((objectA, objectB) => {
      //   const titleA = objectA.fields.title.toLowerCase();
      //   const titleB = objectB.fields.title.toLowerCase();
        
      //   if (titleA < titleB) return -1;
      //   if (titleA > titleB) return 1;
      //   return 0;
      // });

      // Second JS sorting, Z-to-A
      // data.records.sort((objectA, objectB) => {
      //   const titleA = objectA.fields.title.toLowerCase();
      //   const titleB = objectB.fields.title.toLowerCase();
        
      //   if (titleA < titleB) return 1;
      //   if (titleA > titleB) return -1;
      //   return 0;
      // });

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
  };

  useEffect(() => {
    fetchData();
  }, [sortDirection]);

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

    const postUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

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

  const addTodo = async (newTodoTitle) => {
    const newTodo = await postTodo(newTodoTitle);
    if (newTodo) {
      fetchData();
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
                <SortToggleButton sortDirection={sortDirection} toggleSortDirection={toggleSortDirection} />
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? <p>Loading...</p> :
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
              </div>
            }
          />
          <Route
            path="/new"
            element={
              <div>
                <h1>New Todo List</h1>
                <SortToggleButton sortDirection={sortDirection} toggleSortDirection={toggleSortDirection} />
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? <p>Loading...</p> :
                <TodoList todoList={[]} onRemoveTodo={removeTodo} />}
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App