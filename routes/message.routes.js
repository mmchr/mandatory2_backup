/**
 * Created by christoffer on 26/04/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/message.model');
var database = require('../model/database');

/* POST single message */
router.post('/post', function(req, res, next) {
    var instance = new schema.Message(req.body);

    instance.save(function (err, Message) {
        result = err?err:Message;
        res.send(result);
        router.addMessage(req.body.roomName);
        return result;
    });
});

router.get('/get', function(req, res, next) {
    schema.Message.find({}).exec(function (err, messages) {
        if (err)
            return console.error(err);
        console.log("Load success: ", messages);
        res.send(messages);
    });
});

router.get('/get/:roomName', function(req, res, next) {
    schema.Message.find({roomName: req.params.roomName}).exec(function (err, messages) {
        if (err)
            return console.error(err);
        console.log("Load success: ", messages);
        res.send(messages);
    });

});

router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
    //router.notifyclients(client);
};

router.addMessage = function (roomName) {
    router.notifyclients(roomName);
};


router.notifyclients = function (roomName) {
    schema.Message.find({roomName}).exec(function (err, messages) {
        console.log("roomname is: " + roomName);
        if (err)
            return console.error(err);
        router.clients.forEach(function(socket){
            socket.emit('refreshMessages', messages);
        })
    });
}

//export the router
module.exports = router;