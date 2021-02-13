# Playground to test react hooks

PWA React based application created to play with newset features of React and more. <br/>
Deployed to heroku server at: https://kp-playground-taskapp.herokuapp.com/<br/>
Passing Lighthouse audit:

<p>
    <img src="src/pwa/lighthouseaudit.png" alt="Lighthouse" class="scale" />
</p>

## Built With

-   [React](https://reactjs.org/) - Javascript library for building user interfaces
-   [react-router-dom](https://www.npmjs.com/package/react-router-dom) - application routing
-   [Express as server](https://expressjs.com/)
-   [babel](https://babeljs.io/) - Javascript Compilator to use latest generation of JavaScript
-   [webpack](https://webpack.js.org/) - module bundler
-   [formik](https://github.com/jaredpalmer/formik) - for creating powerful forms easly
-   [yup](https://github.com/jquense/yup) - JavaScript schema builder for form validation
-   [reactstrap](https://reactstrap.github.io/) - bootstrap 4 components for React for creating layout
-   [mongodb/mongoose](https://www.mongodb.com/) - database
-   [jest](https://jestjs.io/) - JavaScript Testing Framework for testing back end

## Prerequisites

In order to develop application on local machine install:

1. Node.js (at least 12.4.0)
2. download and install [mongodb](https://www.mongodb.com/download-center/community) as a local database server
3. [MongoDB Compass](https://www.mongodb.com/products/compass) - gui for managing database

For production deployment it will be needed to setup production version of database. For purpose of this application mongodb atlas free (https://www.mongodb.com/cloud/atlas) has been used.

## Installing and development

### Local development

1. download project
2. run:

```
npm install
```

3. start local database server (for windows users):
   a) open cmd window
   b) navigate to "bin" folder of your mongodb server installation folder (typicly: C:\Program Files\MongoDB\Server\3.6\bin where "3.6" is version of mongodb)
   c) run:

```
mongod.exe --dbpath /Users/<user_name>/mongo-data
```

d) open another cmd window; navigate to "bin" and run:

```
mongo.exe
```

4. start server

```
npm run server:watch
```

5. start local development

```
npm run build:watch
```

### Production version

```
npm run build
```

## Running the tests

To run test suites for back end run:

```
npm run test:watch
```
