import {describe, it, expect, vi} from 'vitest';
import { getCoords, convertTime } from "./helpers";
import axios from 'axios';

describe('convertTime function', () => {
  const date = new Date("2010-01-09T03:24:00Z");
  const unixTime = date.getTime()/1000;

  it('No timezone', () => {
    let result: string;
    result = convertTime(unixTime, 0, 'full');
    expect(result).toBe("09-01 03:24");
    result = convertTime(unixTime, 0, 'hours');
    expect(result).toBe("03:24");
    result = convertTime(unixTime, 0, 'day');
    expect(result).toBe("09");
    result = convertTime(unixTime, 0, 'date');
    expect(result).toBe("2010-01-09");
  })

  it('New York timezone', () => {
    const timezone = -14400; // -4 hours
    let result: string;
    result = convertTime(unixTime, timezone, 'full');
    expect(result).toBe("08-01 23:24");
    result = convertTime(unixTime, timezone, 'date');
    expect(result).toBe("2010-01-08");
  })
})


vi.mock('axios');
describe('getCoords function', () => {
  const mockedAxiosGet = vi.mocked(axios.get);
  
  it('Returns longitude and latitude as numbers when the API call succeeds', async () => {
    const fakeApiResponse = {
      data: [
        { lon: 14.4208, lat: 50.0878 }
      ]
    };
    
    mockedAxiosGet.mockResolvedValueOnce(fakeApiResponse);

    const result = await getCoords('Prague');

    expect(mockedAxiosGet).toHaveBeenCalledWith(expect.stringContaining('https://api.openweathermap.org/geo/1.0/direct?q=Prague'));
    expect(result.lon).toEqual(expect.any(Number));
    expect(result.lat).toEqual(expect.any(Number));
  });

  it('Throws an expected error when the API call fails', async () => {
    mockedAxiosGet.mockRejectedValueOnce(new Error('Network error'));

    await expect(getCoords('InvalidCityName123?')).rejects.toThrow('Getting coordinates has failed.');
  });

});
