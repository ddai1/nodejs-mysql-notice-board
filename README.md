# Node.js MySQL Notice Board

This is a simple notice board website (without user sessions) that enables users to post items and leave reviews for items.

It uses **MySQL** for persistant storage, with the node module **mysql** as the database API (leveraging the MySQL driver). **Jade** is used for the view template engine, **express** for the web framework and also the useful **body-parser** middleware.

Make sure to have MySQL installed on your machine. Installing MySQL CLI is easy on Mac OS X using [brew](http://brew.sh/).

1. if this is your first time running the app - run the `setup.js` script to initialize the database and tables; node setup
2. `cd` into the project directory
3. run `node server`
4. load up http://localhost:3000
5. create a new item and submit a review!

It's a great introduction to Node JS with MySQL!
