const authRoutes = require('../routes/auth.js');
const feedRoutes = require ('../routes/feed.js');

function RoutesConfig(app){
    app.use('/auth', authRoutes);
    app.use('/feed', feedRoutes);
}

module.exports = RoutesConfig;