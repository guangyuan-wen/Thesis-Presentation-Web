import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Presentation from './pages/Presentation';
import ScauSharing from './pages/ScauSharing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/scau-sharing" element={<ScauSharing />} />
      </Routes>
    </Router>
  );
}

export default App;
