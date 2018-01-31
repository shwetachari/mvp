## Don't Delay ##

## Flight Delay History Statistics and Visualization ##

![Don't Delay Screencast](https://github.com/shwetachari/mvp/blob/master/images/dontdelay.gif)

## Usage ##
Before proceeding with either of the following options to load the client, run ```npm install``` from the root directory to make sure that all dependencies are downloaded. To compile all static files, run ```npm run babel```. For the database, before running the application, make sure a local MongoDB server is running. You can use ```mongod``` to start the server. To start the node server and watch for changes in server files, run ```npm start``` from the root directory. Follow with either of the options below (Standard points to the actual static application served by the running node server, and Live Server provides a developer-friendly environment that watches for changes in client-side code and auto-refreshes as required).
### Standard ###
  - Client: Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.
### Live Server ###
  - Client: From the app/static directory, run ```live-server``` in the terminal to load the client (which refreshes whenever changes are made to the client code).

## Summary ##
  The product enables a user to track the flight delay statistics from 2003-2016 of any domestic (within the U.S.) airport and/or airline. Being able to anticipate flight delays allows a traveler more control over their plans. They will be able to reduce the risk of missing connecting flights and make more informed decisions about their choice of airline/airport when booking flight tickets.

## Problem ##
  Flight delays are, unfortunately, not uncommon and are a huge inconvenience to travelers with connecting flights or itineraries.

## Solution ##
  This app will give travelers more insight into the frequency of and reasons for flight delays by specific airports and/or airlines so that they might be better able to avoid this inconvenience. It will provide summary statistics that take into account the average statistics across all airlines/airports within the database.

## Quote from You ##
  "Because I, too, hate waiting 4 extra hours for a flight only for it to be cancelled." - Shweta

## How to Get Started ##
  A user simply selects and Airport and/or Airline and receives information about their specific selection.

## Closing and Call to Action ##
  Go plan that well-deserved vacation. Don't Delay has your back.
