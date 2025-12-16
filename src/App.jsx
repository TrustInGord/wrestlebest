import { useState, useEffect } from 'react'
import { roster } from './Wrestler.jsx'
import { faceOff } from './Match.jsx'
import Card from './Card.jsx'
import Bio from './Bio.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('card')
  const [score, setScore] = useState(0)
  const [day, setDay] = useState(1)
  const [user, setUser] = useState(null)
  const [authMode, setAuthMode] = useState('login')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // You could verify token here
      setUser({ username: 'User' }) // Simplified for now
    }
    
    const hash = window.location.hash.slice(1) || 'card'
    setCurrentPage(hash)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  if (!user) {
    return (
      <div>
        {authMode === 'login' ? (
          <Login onLogin={handleLogin} switchToRegister={() => setAuthMode('register')} />
        ) : (
          <Register switchToLogin={() => setAuthMode('login')} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h1>WrestleBest</h1>
      <p>Welcome, {user.username}! | Day: {day} | Score: {score}</p>
      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => { setCurrentPage('card'); window.location.hash = 'card'; }}>Card</button>
        <button onClick={() => { setCurrentPage('bio'); window.location.hash = 'bio'; }} style={{ marginLeft: '10px' }}>Wrestler Bios</button>
        <button onClick={handleLogout} style={{ marginLeft: '10px', backgroundColor: '#dc3545', color: 'white' }}>Logout</button>
      </nav>
      {currentPage === 'card' && <Card score={score} setScore={setScore} day={day} setDay={setDay} />}
      {currentPage === 'bio' && <Bio />}
    </div>
  )
}

export default App
