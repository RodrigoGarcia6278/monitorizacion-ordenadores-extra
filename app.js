const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

const playerRoutes = require('./routes/player.routes');
const homeRoutes = require('./routes/index.routes');
//const port = 2000;
app.set('port', process.env.port || 2000); // set express to use this app.set('host', process.env.DB_HOST || 'localhost');
app.set('user', process.env.DB_USER || 'root');
app.set('password', process.env.DB_PASSWORD || 'spyXfam_11');
app.set('database', process.env.DB_NAME || 'socka');


// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: app.get('host'),
    user: app.get('user'),
    password: app.get('password'),
    database: app.get('database')
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app
app.use('/', homeRoutes);
app.use('/player', playerRoutes);
app.get('*', function(req, res, next){
    res.status(404);

    res.render('404.ejs', {
        title: "Page Not Found",
    });

});

// set the app to listen on the port
/*app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});*/
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});