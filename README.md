# SF Food Truck Finder

## Purpose of this project

Find places to eat (specifically food trucks) in San Francisco based on the type of cuisine you're in the mood for.

## Project setup

This project is built with Node.js, TypeScript, and Express.js on the backend and HTML and Leaflet.js on the frontend.

If you'd like to contribute to this project you can clone it locally on your machine.

`git clone https://github.com/parkervandyk/el-food-truck-finder.git`

Navigate into the local directory on your machine and run `npm install` to install all dependencies.

Run the project with `npm start`

## Additional documentation

There are several tradeoffs and shortcuts I took while creating this and I'd like to explain them below.

- I didn't implement and logging or tests of any kind, this leaves us with A LOT of assumptions and unknows. I would have liked to implement even some simple unit tests just to validate the data recieved from the frontend and backend.
- I also would have liked to spin up a small postgres database to house this data in order to reduce repetitive calls, caching the data daily as a separate service would make sense for this project.
- I'm by no means a frontend engineer so that's why I chose plain html instead of implementing something like react or vue. Those frameworks would have made the site look much cleaner.
- Authentication for the frontend would be fun to implement but not really necessary since this is quite a simple project.
- Having authentication would allow you to 'save' your favorite food trucks so that could be useful.
- Pulling in google maps data to show ratings would also be a great feature int the future.
