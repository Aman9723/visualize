// require('dotenv').config(); // allows to set enviornment variables into process
const express = require('express');
const app = express();
const connect = require('./config/db');
const cors = require('cors');

// Middleware
app.use(cors()); // allows to share resource cross origin
app.use(express.urlencoded({ extended: true })); // parse in urlencoded format
app.use(express.json()); // parse in JSON format

// Redirect requests to respective endpoints
app.use('/', require('./routes/auth.routes'));
app.use('/data', require('./routes/data.routes'));
app.get('/', (req, res) => res.send('Server is live 🚀'));

// Listen on port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    try {
        connect();
        console.log(`SERVER IS LISTENING ...`);
    } catch (error) {
        console.log(error);
    }
});
