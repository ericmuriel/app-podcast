import React from 'react';
import { render, screen } from '@testing-library/react';
import { PrincipalView } from './PrincipalView';

jest.mock('../../services/PodcastService', () => ({
  PodcastService: {
    getInstance: jest.fn(() => ({
      fetchAllPodcasts: jest.fn(() => new Promise(() => {})),
    })),
  },
}));

describe('PrincipalView', () => {
  test('renders loading state', () => {
    render(<PrincipalView />);

    expect(screen.getByText('Cargando podcasts...')).toBeInTheDocument();
  });
});
