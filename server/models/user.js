const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true, minlength: 3 },
    last_name: { type: String, required: true, minlength: 6 },
    age: { type: Number, required:true,  min: 1, max: 150 },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

UserSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email.text); // Assuming email has a text attribute
 }, 'The e-mail field cannot be empty.')

const User = mongoose.model('User', UserSchema);

module.exports = {
    User,
};