const mongoose = require('mongoose'),
 schema = mongoose.Schema,

 chatSchema = new schema({
 	userName: { type: String, required: true },
	userID: { type: String, required: true },
	msg: { type: String, required: true },
	crAt: { type: Date, default: Date.now }
 });

module.exports = {chat: mongoose.model('chats',chatSchema)}