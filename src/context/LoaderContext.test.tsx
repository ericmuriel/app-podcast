import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoaderProvider, useLoader } from './LoaderContext';

const TestComponent: React.FC = () => {
  const { isLoading, setLoading } = useLoader();
  return (
    <div>
      <div data-testid="loading-state">{isLoading ? 'Loading' : 'Not Loading'}</div>
      <button onClick={() => setLoading(true)}>Set Loading</button>
    </div>
  );
};

describe('LoaderContext', () => {
  test('provides default value and updates loading state', () => {
    render(
      <LoaderProvider>
        <TestComponent />
      </LoaderProvider>
    );

    expect(screen.getByTestId('loading-state')).toHaveTextContent('Not Loading');

    screen.getByText('Set Loading').click();

    expect(screen.getByTestId('loading-state')).toHaveTextContent('Loading');
  });
});
