const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
            type: String,
            required: true
        },
    email: {
            type: String,
            required: true
        },
     mobile: {
            type: String,
            required: false 
  },
    password: {
            type: String,
            required: true
        },
    date: {
        type: Date,
        default: Date.now
    },
    profileImage: {
        type: String,
        default: "",
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;