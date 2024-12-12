import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PodcastCard from '../PodcastCard/PodcastCard';
import { Podcast, PodcastService } from '../../services/PodcastService';
import './PrincipalView.scss';

export const PrincipalView = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [value, setValue] = useState<string>(''); 
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  const podcastService = PodcastService.getInstance(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await podcastService.fetchAllPodcasts();
        setPodcasts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [podcastService]);

  if (isLoading) {
    return <div className="principal-view__loading">Cargando podcasts...</div>;
  }

  if (error) {
    return (
      <div className="principal-view__error">
        Error al cargar los podcasts. Por favor, inténtalo de nuevo.
        <br />
        {error}
      </div>
    );
  }

  const filterFn = (item: Podcast): boolean => {
    const searchValue = value.toUpperCase();
    return (
      item['im:name'].label.toUpperCase().includes(searchValue) ||
      item['im:artist'].label.toUpperCase().includes(searchValue) ||
      value === ''
    );
  };

  const podcastList = podcasts.filter(filterFn).map((entry) => (
    <Link key={entry.id.attributes['im:id']} to={`/podcast/${entry.id.attributes['im:id']}`}>
      <PodcastCard
        image={entry['im:image'][2].label}
        name={entry['im:name'].label}
        author={entry['im:artist'].label}
      />
    </Link>
  ));

  return (
    <div className="principal-view">
      <div className="principal-view__header">
        <div className="principal-view__count">{podcasts.filter(filterFn).length}</div>
        <input
          type="search"
          className="principal-view__search"
          placeholder="Filter podcasts..."
          value={value}
          onChange={(e) => setValue(e.target.value.trim())}
        />
      </div>

      <div className="principal-view__list">
        {podcastList.length > 0 ? podcastList : <div>No podcasts found.</div>}
      </div>
    </div>
  );
};
