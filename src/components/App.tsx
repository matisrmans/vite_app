import { useEffect, useState } from 'react'
import './App.css'
import Spinner from './spinner'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(t)
  }, [])

  const addTodo = () => {
    const text = input.trim()
    if (!text) return
    setTodos([...todos, { id: Date.now(), text, completed: false }])
    setInput('')
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="input-row">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              {todo.text}
            
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
              &times;
            </button>
          </li>
        ))}
      </ul>
      {loading && (
        <div className="loading-row">
          <Spinner />
        </div>
      )}
      {!loading && todos.length === 0 && <p className="empty">No todos yet. Add one above!</p>}
    </div>
  )
}

export default App
