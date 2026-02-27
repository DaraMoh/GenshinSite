import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Characters from './pages/Characters';
import TierList from './pages/TierList';
import TierListMaker from './pages/TierListMaker';
import Endgame from './pages/Endgame';
import SpiralAbyss from './pages/SpiralAbyss';
import ImaginariumTheatre from './pages/ImaginariumTheatre';
import StygianOnslaught from './pages/StygianOnslaught';

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
          <Route path="/endgame/spiral-abyss" element={<SpiralAbyss />} />
          <Route path="/endgame/imaginarium-theatre" element={<ImaginariumTheatre />} />
          <Route path="/endgame/stygian-onslaught" element={<StygianOnslaught />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
