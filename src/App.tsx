import React from 'react';
import './App.scss';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PrincipalView } from './components/PrincipalView/PrincipalView';
import EpisodeList from './components/EpisodeList/EpisodeList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path='/' element={<PrincipalView/>} />
        <Route path="/podcast/:podcastId" element={<EpisodeList />} />
      </Routes>
      </div>
    </Router>

  );
}

export default App;
