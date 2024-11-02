import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

let todoList = [
  {
    id: 1,
    title: "Clean up fish tanks"
  },
  {
    id: 2,
    title: "Feed fish and snails"
  },
  {
    id: 3,
    title: "Take medication"
  }
];

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Todo List</h1>
        <ul>
          {todoList.map(function (item) {
            return <li key={item.id}>{item.title}</li>;
          })}
        </ul>
    </>
  )
}

export default App
