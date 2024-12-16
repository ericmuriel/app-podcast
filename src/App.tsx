import React from 'react';
import './App.scss';
import { Link, Route, Routes } from 'react-router-dom';
import { PrincipalView } from './components/PrincipalView/PrincipalView';
import EpisodeList from './components/EpisodeList/EpisodeList';
import PodcastView from './components/PodcastView/PodcastView';
import Loader from './components/Loader/Loader';

function App() {
  return (
    <div className="App">
      <div className="Header">
        <Link to="/" className="header__link">
          <h2>Podcaster</h2>
        </Link>
        <div>
          <Loader/>
        </div>
      </div>
      <hr className="separator" />
      <Routes>
        <Route path="/" element={<PrincipalView />} />
        <Route path="/podcast/:podcastId" element={<EpisodeList />} />
        <Route path="/podcast/:podcastId/episode/:episodeId" element={<PodcastView />} />
      </Routes>
    </div>
  );
}

export default App;
