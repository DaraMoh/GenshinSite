import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Characters from './pages/Characters';
import TierList from './pages/TierList';
import TierListMaker from './pages/TierListMaker';
import Endgame from './pages/Endgame';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/tier-list" element={<TierList />} />
          <Route path="/tier-list-maker" element={<TierListMaker />} />
          <Route path="/endgame" element={<Endgame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
