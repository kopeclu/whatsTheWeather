# MyWeatherApp

## Table of content
- [Description](#description)
- [Instalation](#instalation)
- [Explanation](#explanation)

<br>
<br>

# Description
A simple weather app created as a personal project to showcase author's skill in web development and data visualization. This app was created by **npx create-react-app** script.

<br>

# Instalation
The webpage is already hosted on [Netlify](https://my-weather-app-01.netlify.app/)
If you want to change the source code on your machine, follow next steps:

1. Clone the repository using terminal: <code>**git clone git@github.com:kopeclu/whatsTheWeather.git**</code>,
2. Go to the project repository by typing <code>**cd whatsTheWeather**</code>,
3. Install all dependencies by typing <code>**npm install**</code>,
4. Start the website on your machine by typing <code>**npm run start**</code>,
5. Your default web browser should open your page, if not, visit *localhost:3000*.

<br>
<br>

# Explanation
**In this section it is explained the structure of repository**

<br>

## 1. JSON and .env files
In those files you can find description of the project (name, dependencies, versions...).
File *package.json* is essential while installing the node_modules directory (see [Instalation](#instalation)).

The .env files should be by hidden from user (there should be sensitive data that no user should be able to see), but in this case, it is necessary to be visible for every user seeing this repository, because this repository is already hosted (see [Instalation](#instalation)), so if it wouldn't be visible here, the hosted page would not work correctly. 

In file .env there are stored two API keys, one from OpenWeather, second from Google Maps.

<br>

## 2. /public directory
The most important file here is *index.html*, which can the user see on a web (that is logic, when the directory's name is *public*). This file start all the logic behind (that the user is not able to see) by including the *root* div.
Other files here are not important, they were created by default when the app was declared (see [Description](#description)).

<br>

## 3. /src directory
Let's make some groups here, so the explanation is clear.

### **/img directory**
  <code>In this directory there is only one image that is used in the Header section.</code>

### **.css files**
  <code>For those files isn't created special folder, because there is only 3 of them and the project is still readable.  This fact is true also thanks to naming of those files.</code>

- **`App.css`**

  In this file you can find styling for all the text and background color of the page, bottom bar section, styling of 404 page, welcome message and map section. It is basically styling of home page, general styling and 404 page.

<br>

- **`Forecast.css`**

  You can find here all the styling for all secions that display something connected with the forecast

<br>

- **`Header.css`**

  Here is styling of displayed header (input bar, home button, background of the top section)

<br>

### **.js files**
This section still constains a lot of files, so let's divide it first.


1. #### **Files in the background**
    <code>These files are not visible on the actual page but are crutial for developing and running the App.</code>

    - #### `App.test.js`

      Important file that is testing your app after every save you do and checks if all the components renders correctly and lets you know about warnings and errors in your app.

    - #### `reportWebVitals.js`

      This file allows you to monitor the performance of your React application by capturing important metrics like Cumulative Layout Shift (CLS), First Input Delay (FID), First Contentful Paint (FCP), Largest Contentful Paint (LCP), and Time to First Byte (TTFB).

    - #### `functions.js`

      In this file you can find defined functions that are used more that 1 time or/and functions difficult to read.

    - #### `useFetch.js`

      This is a custom React hook that takes two arguments (longitude, latitude). It fetches the data and returns it with information if the data is already fetched (in case of poor connection) and if there was an error (it also displays in the console, but for the render of the page it is nice to have).

<br>

2. #### Files in the front 
    <code>These are the files containing all the content displayed to the user (but it has also its section hidden to the user).</code>

    - #### `index.js`

      This file is connected to the **/public/index.html** file by rendering the *root* div, more precisely the *App* (App.js).

    - #### `App.js`

      Alpha and omega of your app. You can change here the structure of your page, set the routes etc. In this App there are next 3 routes.

      - <code>**'/'**</code> for Home page.

      - <code>**'/city/longitude/latitude'**</code> for Forecast for a city on given coordinates.

      - <code>**'*'**</code> this cover every other route and it will render the 404 page.

      **Note:** In hosted version on Netlify, this doesn't work as perfect as you could think. If you use the user interface to get to other pages, the URL is shown correcly, but if you know your coordinates and you customize the URL to your preference, you wouldn't get the right render of the page. This error is caused on Netlify's side. But if you host the App on your machine (*localhost:3000*) it works the right way. You can customize the URL and you will get the forecast of the nearest city of give coordinates. The only way you could get 404 is that you give coordinated far away from any civilization.