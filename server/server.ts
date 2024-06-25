//all logic of server.js is wrapped in app.js file wchich is imported here. This allowes to run test suite on app without need to start up server
import app from './app';
const port = process.env.PORT as string;

// listen to the requests
const server = app.listen(port, (): void => {
    console.info(`Server is on port ${port}`);
});

export default server;
