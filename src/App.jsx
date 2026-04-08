import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DevDailyTracker from './components/DevDailyTracker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dev-tracker" element={<DevDailyTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
