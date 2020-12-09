const JWTService = require("../services/JWTService");

module.exports = async (req, res, next) => {
    if(!req.headers || !req.headers.authorization) {
        return res.badRequest({err: 'authorization header is missing'});
    }

    const token = req.headers.authorization;
    
    const decodedToken = JWTService.verify(token);
    
    const user = await User.findOne({id: decodedToken.user});

    if(!user) {
        return next({err: 'invalid credentials provided'});
    }

    req.user = user.id;
    next();
}