const validator = require('validator');
const User = require('../models/user');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();

        if (!validator.isEmail(email) || !password) {
            return res.status(400).send('Invalid credential');
        }

        const user = new User({ email, password: await argon2.hash(password) });
        await user.save();

        res.status(201).send('User created');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        if (!(await argon2.verify(user.password, password))) {
            return res.status(403).send('Invalid email or password');
        }

        const token = jwt.sign(
            { id: user.id, name: user.email },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '24h',
            }
        );

        return res.status(200).json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
