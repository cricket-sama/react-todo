// import { useState } from 'react'
import './App.css'
import './TodoList.jsx'
import TodoList from './TodoList.jsx'
import AddTodoForm from './AddTodoForm.jsx'

function App() {

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm />
      <TodoList />
    </>
  )
}

export default App
