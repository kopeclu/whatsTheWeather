import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Forecast from './Forecast';
import useFetch from '../hooks/useFetch';
import { CurrentWeather, ForecastData } from '../types';

vi.mock('../hooks/useFetch');
const mockedUseFetch = vi.mocked(useFetch);

vi.mock('../components/Header', () => ({ default: () => <header>Mock Header</header> }));
vi.mock('../components/UnitToggle', () => ({ default: () => <div>Mock UnitToggle</div> }));
vi.mock('../components/ForecastCurrent', () => ({ default: () => <div data-testid="current-forecast" /> }));
vi.mock('../components/Forecast24Hours', () => ({ default: () => <div data-testid="24hr-forecast" /> }));
vi.mock('../components/Forecast4Days', () => ({ default: () => <div data-testid="4day-forecast" /> }));

describe('Forecast Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <MemoryRouter 
        initialEntries={['/city/-74.00/40.71']} 
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/city/:lon/:lat" element={<Forecast />} />
          <Route path="/404" element={<h1>404 Error Page</h1>} /> 
        </Routes>
      </MemoryRouter>
    );
  };

  it('displays the loading state when data is pending', () => {
    mockedUseFetch.mockReturnValue({
      isPending: true,
      isError: false,
      currentData: null,
      futureData: null,
    });

    renderComponent();
    expect(screen.getByText(/loading forecast/i)).toBeInTheDocument();
  });

  it('renders the forecast components when data is successfully fetched', () => {
    mockedUseFetch.mockReturnValue({
      isPending: false,
      isError: false,
      currentData: {} as CurrentWeather,
      futureData: {} as ForecastData,
    });

    renderComponent();
    expect(screen.queryByText(/loading forecast/i)).not.toBeInTheDocument();
    expect(screen.getByTestId('current-forecast')).toBeInTheDocument();
    expect(screen.getByTestId('24hr-forecast')).toBeInTheDocument();
    expect(screen.getByTestId('4day-forecast')).toBeInTheDocument();
  });

  it('redirects to the 404 page if useFetch returns an error', () => {
    mockedUseFetch.mockReturnValue({
      isPending: false,
      isError: true,
      currentData: null,
      futureData: null,
    });

    renderComponent();
    expect(screen.getByText(/404/)).toBeInTheDocument();
  });
});