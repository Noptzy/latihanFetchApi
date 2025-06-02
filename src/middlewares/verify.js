const responseHandler = require('../utils/resHandler.js');

const verifyKey = (meterinKey) => {
    return meterinKey === process.env.meterinKey;
}

const middleware = (req, res, next) => {
    const meterinKey = req.headers.platformkey;
    
    if (!meterinKey) {
        return res
            .status(400)
            .json(responseHandler
            .error('required key', null)
            .toJSON());  
    }

    const decoded = verifyKey(meterinKey);
    
    if (!decoded) {
        return res
            .status(400)
            .json(responseHandler
            .error('invalid token', null)
            .toJSON());  
    }

    next();
};

module.exports = middleware;
