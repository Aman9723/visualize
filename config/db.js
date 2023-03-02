const mongoose = require('mongoose');

module.exports = () => {
    try {
        mongoose.connect(process.env.DB_URL, (error) => {
            if (error) throw error;
        });
    } catch (error) {
        throw error;
    }
};
