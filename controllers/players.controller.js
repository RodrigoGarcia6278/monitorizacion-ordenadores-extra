const fs = require('fs');

const os = require('os');

exports.addPlayerPage = (req, res) => {
    res.render('add-player.ejs', {
        title: "Monitorizacion de Ordenadores | Agregar",
        message: ''
    });
};

exports.addPlayer = (req, res) => {

    var mem = (os.totalmem()) / 1000000000;

    let message = '';
    let first_name = req.body.first_name;
    let last_name = os.hostname();
    let position = os.type();
    let number = os.cpus()[0].model;
    let username = ((os.totalmem()) / 1000000000);
    //let uploadedFile = ;
    let image_name = os.arch();
    //let fileExtension = uploadedFile.mimetype.split('/')[1];
    //image_name = username + '.' + fileExtension;

    let usernameQuery = "SELECT * FROM `players` WHERE user_name = '" + username + "'";

    db.query(usernameQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            message = 'Username already exists';
            res.render('add-player.ejs', {
                message,
                title: "Monitorizacion de Ordenadores | Agregar"
            });
        } else {
                    let query = "INSERT INTO `players` (first_name, last_name, position, number, image, user_name) VALUES ('" +
                        first_name + "', '" + last_name + "', '" + position + "', '" + number + "', '" + image_name + "', '" + username + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/');
                    });
        }
    });
}

exports.editPlayerPage = (req, res) => {
    let playerId = req.params.id;
    let query = "SELECT * FROM `players` WHERE id = '" + playerId + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('edit-player.ejs', {
            title: "Edit  Player",
            player: result[0],
            message: ''
        });
    });
}

exports.editPlayer = (req, res) => {
    let playerId = req.params.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let position = req.body.position;
    let number = req.body.number;

    let query = "UPDATE `players` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `players`.`id` = '" + playerId + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

exports.deletePlayer = (req, res) => {
    let playerId = req.params.id;
    let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
    let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';

    db.query(getImageQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        let image = result[0].image;

        fs.unlink(`public/assets/img/${image}`, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(deleteUserQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        });
    });
}
