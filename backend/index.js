const app = require( 'express')();

const PORT = 8080;

//configure mongo
require( './config/database.js')();

//configure exress
require( './config/express.js')(app);

//configure the server routes
require( './config/routes.js')(app);

//run server
app.listen(PORT);

console.log(`Server is running on port ${PORT}`);