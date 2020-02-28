const bodyParser = require('body-parser');
const cors = require('cors');

function ExpressConfig(app){
    app.use(bodyParser.urlencoded({extended: false, useNewUrlParser: true })); // only look at url parsed data and use querystring
    app.use(bodyParser.json()); // parse application/json
    app.use(cors()); // enable cross origin requests/resources

    console.log('Express ready!');
}

module.exports = ExpressConfig;