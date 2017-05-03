/**
 * Created by christoffer on 26/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

exports.messageSchema = new Schema({
    message: {
        type: String,
        unique: false,
        required: true
    },
    author: String,
    send: {
        type: Date,
        default: Date.now
    },
    roomName: String
});
exports.Message = mongoose.model('Message',exports.messageSchema);
