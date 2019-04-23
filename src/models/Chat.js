const moongose = require('mongoose');
const {Schema} = moongose;

const ChatSchema = new Schema({
    nick: String,
    msg: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = moongose.model('Chat', ChatSchema);