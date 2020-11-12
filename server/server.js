//all logic of server.js is wrapped in app.js file wchich is imported here. This allowes to run test suite on app without need to start up server
const app = require('./app');
const port = process.env.PORT;

// listen to the requests
const server = app.listen(port, () => {
	console.info(`Server is on port ${port}`);
});

module.exports = server;
