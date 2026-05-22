import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import Header from './Header';
import { getCoords } from '../utils/helpers.ts';

vi.mock('../utils/helpers.ts', () => ({
  getCoords: vi.fn(),
  replaceSpaces: (str: string) => str.trim(), 
}));

const mockedGetCoords = vi.mocked(getCoords);

describe('Header Component', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();

    const mockGeolocation = {
      watchPosition: vi.fn(),
      clearWatch: vi.fn(),
    };
    vi.stubGlobal('navigator', { geolocation: mockGeolocation });
  });

  const renderHeader = () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/city/:lon/:lat" element={<div data-testid="city-page">City Page</div>} />
          <Route path="/404" element={<div data-testid="404-page">Error Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('searches for a city and navigates to the city page on success', async () => {
    const user = userEvent.setup();
    mockedGetCoords.mockResolvedValueOnce({ lon: 14.42, lat: 50.08 });

    renderHeader();

    const searchInput = screen.getByPlaceholderText(/find a city/i);
    await user.type(searchInput, 'Prague');

    const submitButton = screen.getAllByRole('button')[0]; 
    await user.click(submitButton);

    expect(mockedGetCoords).toHaveBeenCalledWith('Prague');

    expect(await screen.findByTestId('city-page')).toBeInTheDocument();
  });

  it('navigates to the 404 page if the city search fails', async () => {
    // mute and handle console errors
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const user = userEvent.setup();
    mockedGetCoords.mockRejectedValueOnce(new Error('API Failed'));

    renderHeader();

    const searchInput = screen.getByPlaceholderText(/find a city/i);
    await user.type(searchInput, 'FakeCityThatDoesNotExist');
    
    const submitButton = screen.getAllByRole('button')[0];
    await user.click(submitButton);

    expect(await screen.findByTestId('404-page')).toBeInTheDocument();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Getting coordinations has failed.", 
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('uses geolocation and navigates to the user coordinates', async () => {
    const user = userEvent.setup();
    const watchMock = navigator.geolocation.watchPosition as Mock;
    
    watchMock.mockImplementationOnce(
      (successCallback: PositionCallback) => {
        setTimeout(() => {
          successCallback({
            coords:
              { longitude: -74.00, latitude: 40.71 }
            } as unknown as GeolocationPosition);
        }, 0);
        return 123;
      }
    );

    renderHeader();

    const locationButton = screen.getAllByRole('button')[1];
    await user.click(locationButton);

    expect(await screen.findByTestId('city-page')).toBeInTheDocument();
  });

});