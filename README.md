# MyWeatherApp
A responsive weather application built as a personal project to showcase web development and data visualization skills. It provides current weather data and a 4-day forecast for locations worldwide. Users can search for specific places or use automatic geolocation (with specific handling for mobile device limitations).

<br>

## Table of content
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Future Improvements](#future-improvements)

<br>
<br>

# Description

<br>

## What is this app?
This is a live weather dashboard featuring a 4-day forecast. Users can search for any global location or utilize the "Locate Me" feature to find weather data for their current position.

## Technology Stack
I chose the [OpenWeather API](https://openweathermap.org/) for data integration. It offers a robust free tier including geocoding and weather maps, which is ideal for personal projects, subject only to reasonable rate limits.

## Challenges
Building this application presented several technical challenges:

### Styling & Design
Implementing the visual design, specifically the smooth opacity transitions over the background clouds, required advanced CSS techniques beyond basic styling.

### Search Logic
Integrating the search algorithm with OpenWeather's geolocator required precise formatting of user inputs to ensure successful API requests and error handling.

### Map Integration
Integrating a live map on the home page was an addition to the original scope. Since I had not worked with map visualization before, I had to learn how to render and configure the map layers. *Note: I am currently working on optimizing the color scheme for better UI/UX contrast.*

### Mobile Geolocation
A known issue exists where browser-based geolocation requests on mobile devices can time out. This is a documented inconsistency across mobile browsers.
* **The Problem:** GPS requests often hang indefinitely on mobile networks.
* **My Solution:** I implemented the native Geolocation API but added a user alert system to manage expectations regarding potential timeouts. Interestingly, user interaction with the alert seems to improve the success rate of the GPS lock.

## Future Improvements
* **Autosuggest:** Implement search autocomplete to improve user experience.
* **Redesign:** Refactor the home page and forecast UI for a more modern look.
* **Favorites:** Add local storage support to save favorite locations.

<br>

# Installation
The web app is deployed on Netlify: [Live Demo](https://my-weather-app-01.netlify.app/)

To run the project locally:

1. Clone the repository using terminal:
    ```bash
    git clone git@github.com:kopeclu/whatsTheWeather.git
    ```
2. Navigate to the project directory: 
    ```bash
    cd whatsTheWeather
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
    *Note: Requires Node.js installed.*

4. Create OpeanWeather API key and insert it into .env file:
    ```bash
    REACT_APP_KEY=YOUR_API_KEY
    ```

5. Start the website on your machine by typing
    ```bash
    npm run start
    ```
6. The app should open automatically at http://localhost:3000.

# Usage

## Searching

Search for any location by typing the name in the input bar and pressing *Enter* or the *magnifying glass icon*. To use your current location, press the *locator icon*.

Note on Mobile: As mentioned in the Challenges section, the "Locate Me" feature relies on browser GPS, which may time out on mobile networks compared to the instant response on desktop WiFi/Ethernet.

## Routing

The application uses client-side routing:

<code>/</code> - Home Page

<code>/city/*longtitude*/*latitude*</code> - Forecast for specific coordinates

<code>/*</code> - Redirects to 404 Error Page

**Example:** You can navigate directly to /city/51/0 to see the forecast for London.

## Limiting usage

Since this project uses the free tier of the OpenWeather API, extensive usage in a short period may hit the API rate limit (calls per minute). If data stops loading, please wait a minute before retrying.