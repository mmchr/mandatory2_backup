/**
 * Created by christoffer on 26/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

exports.chatRoomSchema = new Schema({
    roomName: {
        type: String,
        unique: true,
        required: true
    }
});
exports.ChatRoom = mongoose.model('ChatRoom',exports.chatRoomSchema);
