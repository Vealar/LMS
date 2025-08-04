const {register, login} = require("../services/authService");

const registerUser = async (req, res) => {
    try {
        const user = await register(req.body);
        res.status(201).json({message: "Registered", user});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

const loginUser = async (req, res) => {
    try {
        const {token, user} = await login(req.body);
        res.json({token, user});
    } catch (err) {
        res.status(401).json({error: err.message});
    }
};

module.exports = {registerUser, loginUser};
