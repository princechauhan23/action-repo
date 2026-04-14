import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Roadmap from './components/Roadmap'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/roadmap" element={<Roadmap />} />
    </Routes>
  )
}

export default App
