import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="container"><h1>Event Ticket Generator</h1></div>} />
      </Routes>
    </Router>
  )
}

export default App
