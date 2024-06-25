import express, { Express, NextFunction, Request, Response } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import _ from 'lodash';
//UserModel defines how the document (i.e. record) in database looks like (from what props consist of (i.e. columns)).
// eslint-disable-next-line no-unused-vars
import UserModel from './models/user';

//import db/mongoose.js to connect to database
import connectDb from './db/mongoose';

//REST API routes
import taskRoute from './routes/taskRoute';
import compression from 'compression';

const publicPath: string = path.join(__dirname, '../dist');
connectDb().catch(err => console.error(err));

const app: Express = express();
app.use(compression());
app.use(express.static(publicPath));

// handling middleware (parsing post body got from client)
app.use(bodyParser.json());

// This code makes sure that any request that does not matches a static file
// in the dist folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
app.use((req: Request, res: Response, next: NextFunction) => {
    const header = _.pick(req.headers, ['content-type']);
    if (/(.ico|.js|.css|.jpg|.png|.map|.json)$/i.test(req.path)) {
        // split to array path string and take last element, which is a file name
        const pathToArray: string[] = req.path.split('/');
        // then send this file from proper dist folder
        res.sendFile(
            path.join(__dirname, '../dist', pathToArray[pathToArray.length - 1])
        );
    } else if (header['content-type'] === 'application/json') {
        // case for REST queries (get, post)
        next();
    } else {
        // case for reload of page or for any unknown route sent index.html
        res.header(
            'Cache-Control',
            'private, no-cache, no-store, must-revalidate'
        );
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, '../dist', 'index.html'));
    }
});

// REST API handler is pushed to separate file, where express.Router() is used to define the API. Then it is imported in main server.js (testRoute) and registered. It is usefull to organize code and keep different routes in separate files
app.use(taskRoute);

export default app;
