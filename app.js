const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

const playerRoutes = require('./routes/player.routes');
const homeRoutes = require('./routes/index.routes');
const port = process.env.port | 2000;
const db_host = process.env.db_host | 'localhost';
const db_user = process.env.db_user | 'root';
const db_password = process.env.db_password | 'spyXfam_11';
const db_db = process.env.db_db | 'socka';
const db_port = process.env.db_port | 3306;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: db_host,
    user: db_user,
    port: db_port,
    password: db_password,
    database: db_db
});

// connect to database
db.connect((err) => {
    if (err) {
        console.log('Not connected');
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', port); // set express to use this port
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
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});