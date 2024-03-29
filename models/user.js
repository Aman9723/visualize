const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { vsersionKey: true, timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
