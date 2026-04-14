import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DevDailyTracker from './components/DevDailyTracker';
import Roadmap from './components/Roadmap';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dev-tracker" element={<DevDailyTracker />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </Router>
  );
}

export default App;
