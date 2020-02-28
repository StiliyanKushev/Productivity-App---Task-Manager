const mongoose = require('mongoose');

const DatabaseConfig = function(){
    mongoose.connect("mongodb://localhost:27017/task-manager");
    let dbEvent = mongoose.connection;

    dbEvent.once('open',err => {
        if(err) throw err;

        console.log('MongoDB ready!');
    });

    dbEvent.on('error', err => console.log('Database error: ' + err));
}

module.exports = DatabaseConfig;