/**
 * Created by christoffer on 26/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

exports.userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    }
});
exports.User = mongoose.model('User',exports.userSchema);
