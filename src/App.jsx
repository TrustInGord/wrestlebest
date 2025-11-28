import { useState } from 'react'
import { roster } from './Wrestler.jsx'
import { faceOff } from './Match.jsx'
import Card from './Card.jsx'
import Bio from './Bio.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('card')
  const [score, setScore] = useState(0)
  const [day, setDay] = useState(1)

  return (
    <div>
      <h1>WrestleBest</h1>
      <p>Day: {day} | Score: {score}</p>
      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => setCurrentPage('card')}>Card</button>
        <button onClick={() => setCurrentPage('bio')} style={{ marginLeft: '10px' }}>Wrestler Bios</button>
      </nav>
      {currentPage === 'card' && <Card score={score} setScore={setScore} day={day} setDay={setDay} />}
      {currentPage === 'bio' && <Bio />}
    </div>
  )
}

export default App
