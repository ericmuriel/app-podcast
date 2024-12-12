import React from 'react';
import './App.scss';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PrincipalView } from './components/PrincipalView/PrincipalView';
import EpisodeList from './components/EpisodeList/EpisodeList';
import PodcastView from './components/PodcastView/PodcastView';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="Header">
          <Link
            to={`/`}
            className="episode-list__link"
          >
          <h2>Podcaster</h2>
          </Link>
        </div>
        <hr className="separator"></hr>
        <Routes>
        <Route path='/' element={<PrincipalView/>} />
        <Route path="/podcast/:podcastId" element={<EpisodeList />} />
        <Route path="/podcast/:podcastId/episode/:episodeId" element={<PodcastView />} />
      </Routes>
      </div>
    </Router>

  );
}

export default App;
