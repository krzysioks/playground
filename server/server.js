require('./config/config');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname, '../dist');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

// handling middleware (parsing post body got from client)
app.use(bodyParser.json());

app.get('/test', (req, res) => {
    console.log('req, res: ', req, res);
    //res.send() - sends server response to provided url (i.e.: what will be shown in browser window)
    res.send({
        name: 'Andrew',
        helloString: 'Hello Express',
        likes: ['biking', 'tennis', 'basketball']
    });
});

// listen to the requests
app.listen(port, () => {
    console.info(`Server is on port ${port}`);
});
