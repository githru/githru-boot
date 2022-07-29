import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Graph from './Component/graph'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Graph></Graph>
    </div>
  )
}

export default App
