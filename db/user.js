const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    id:       String,
    name:     String,
	email:    String,
	password: String,
//	avatar: {type: String, default:'/images/user.jpg'},
	bio: String,
	time_join: String
},{
    collection: 'accountModel'
});
const accountModel = mongoose.model('accountModel', accountSchema);

module.exports = accountModel;