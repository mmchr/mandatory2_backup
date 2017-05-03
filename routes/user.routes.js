/**
 * Created by christoffer on 26/04/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/user.model');
var database = require('../model/database');

/* POST single user */
router.post('/post', function(req, res, next) {
    var instance = new schema.User(req.body);
    req.session.username = req.body.username;
    /** Example post body:
     {
       "username": "Christoffer"
     }
     **/
    instance.save(function (err, User) {
        console.log(User);
        result = err?err:User;
        res.send(result);
        console.log(result);
        return result;
    });
});

router.get('/get', function(req, res, next) {
    schema.User.find({}).exec(function (err, users) {
        if (err)
            return console.error(err);
        console.log("Load success: ", users);
        res.send(users);
    });

});

router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
    router.notifyclients(client);
};

router.notifyclients = function (client) {
    schema.User.find({}).exec(function (err, users) {
        if (err)
            return console.error(err);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('refresh', users);
        })
    });
}

//export the router
module.exports = router;