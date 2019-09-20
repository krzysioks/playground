require('./config/config');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname, '../dist');
const testRoute = require('./routes/testRoute');

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

// handling middleware (parsing post body got from client)
app.use(bodyParser.json());

// REST API handler is pushed to separate file, where express.Router() is used to define the API. Then it is imported in main server.js (testRoute) and registered. It is usefull to organize code and keep different routes in separate files
app.use(testRoute);

// app.get('/test', (req, res) => {
//     console.log('req, res: ', req.body);
//     //res.send() - sends server response to provided url (i.e.: what will be shown in browser window)
//     res.send({
//         name: 'Andrew',
//         helloString: 'Hello Express',
//         likes: ['biking', 'tennis', 'basketball']
//     });
// });

// listen to the requests
app.listen(port, () => {
    console.info(`Server is on port ${port}`);
});
