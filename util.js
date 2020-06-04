const jwt = require('jsonwebtoken');
const config = require ('./config');

exports.getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    },
        config.JWT_SECRET, {
        expiresIn: '48h'
    })
}

exports.isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
            if(err) {
                return res.status(401).send({ msg: 'Invalid Token.'});
            }
            req.user = token;
            next();
            return
        });
    }
    return res.status(401).send({ msg: 'Token is not supplied.'});
}

exports.isAdmin = (req, res, next) => {
    if(req.user && req.isAdmin) {
        return next();
    }
    return res.status(401).send({ msg: 'Admin Token is not valid.'});
}

// module.exports = getToken;
