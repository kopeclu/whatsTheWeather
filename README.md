# MyWeatherApp
A simple weather app created as a personal project to showcase author's skill in web development and data visualization. You can find here data about current weather and forecast for next 4 days. Most places on the earth can be found, also user's device's position can be located (not working 100% on mobile devices).

<br>

## Table of content
- [Description](#description)
- [Instalation](#instalation)
- [Explanation](#explanation)
- [Usage](#usage)

<br>
<br>

# Description

<br>

## What is this app

This app is basic live weather app with 4-days forecast. You can find any place you want, also your current position (problems about this feature in [Usage](#usage)).

## Technology I used

There are many options, what API to use to get the weather data, in my case I use [OpenWeather](https://openweathermap.org/). The reason behind this is simple. They offer really huge amount of data for free, you can use their geolocator and weather map. This is all in a free bundle, there is only monthly limitation, which is okay in a personal project like this.

## Challenges

There were huge challenges, but i managed to solve almost all of them.

### Styling

The first challenge was styling the header section. I had a vision in my mind how it should look, but I didn't know whether it is possible to desing, epecially the smooth opacity coming over the clouds in the background, with my basic CSS skills.

### Searching algorithm

The second challenge was code the algorithm that finds the place that the user wants. The design of the OpenWeather's  geolocator really helped. Basically i only had to create the right URL that can be correctly fetched, which means i only had to edit the user's input to be in the form that the URL needs.

### Map on home page

The third challenge was including the map to the home page. This wasn't in my vision, but when I found out this feature is for free, it didn't sound bad to be on the home page. The problem was I never worked with displaying maps so it was something i had to learn. It had many versions and I decided to use the one that is displayed now. Still one unsolved problem here, the colors. I tried to configure it to look more user frindly, but i didn't manage to do it.

### User's location on mobile devices

The last challenge was finding out how to code the locator of user's device on mobile devices. The problem here is that the request (request for user's location from the web browser) on mobiles can time out and the user will never get the result. Why is this happening nobody knows (all i found was "we know about this, but nodoby solved it for years"), but it is well know problem. You can use alternatives, but they are not precise, because web browser uses GPS location (most precise), but alternatives are not free or uses goelocator via IP addreses and cellular towers. Location got from this can be outside of reality when you are not connected to WiFi. My solution I coded is to use the web browser geolocation (GPS), but before using it, alert the user i may not work. Interesting here is that with that alert it works most of the time (obviously not because what i typed in that alert, but just because of some alert).

## Future

In the future I will probably redesign the home page and also the forecast style.

Maybe some new features such as adding some places to your favourite, so it will display on the home page, but this would be really huge and take a lot of time to implement.


<br>

# Instalation
The web app is already hosted on [Netlify](https://my-weather-app-01.netlify.app/)

If you want to change the source code on your machine, follow next steps:

1. Clone the repository using terminal:
    ```bash
    git clone git@github.com:kopeclu/whatsTheWeather.git
    ```
2. Go to the project repository by typing 
    ```bash
    cd whatsTheWeather
    ```
3. Install all dependencies by typing
    ```bash
    npm install
    ```
    Make sure you have node.js installed.

4. Start the website on your machine by typing
    ```bash
    npm run start
    ```
5. Your default web browser should open your page, if not, visit *localhost:3000*.


<br>
<br>

# Usage

<br>

## Searching options

You can search for any place on the earth you want by typing the name of the place in the input bar and press *Enter* or the *magnifying glass icon*. If you want to get the information about the place you are right now, just press the *locator icon*. This feature works on computer devices, but on mobile devices, there is a chance the request time out. This is a well known problem but not solved for years. Alternatives exists, but they are not precise (especially when you are not connected to a WiFi). My solution to this is described [here](#users-location-on-mobile-devices).

## URL understanding

My app have several URLs.

<code>/</code> for home page,

<code>/city/*longtitude*/*latitude*</code> (where *longtitude* and *latitude* are numbers - coordinates) for forecast,

<code>/*</code> for everything else. It redirects you to 404 error page, because other paths than the previous two don't exist.

So you can find the forecast just by typing for example <code>/city/51/0</code> to see the forecast for London. This works, but not on my hosted version on Netflify. I don't really know why they don't support this. But if you host it on your machine (localhost:3000) or you pay for web hosting, it will work correctly.

## Limiting usage

As I wrote in the [beggining](#technology-i-used), I use the free bundle of API calls, so when somebody spams a lot of places for a long time, it can happen the minute/monthly limit is reached. In this case you have to wait a minute or a month, based on what limit you reached.