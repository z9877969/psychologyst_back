const { User } = require('../models');
const { SECRET_KEY } = require('../envConfigs');
const { credentialTools: tools, createError } = require('../helpers');

const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    console.log('before Bearer');

    if (bearer !== 'Bearer' || !token) {
      throw createError(401);
    }

    const { id } = tools.token.verify(token, SECRET_KEY);

    if (!id) {
      throw createError(401);
    }

    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      console.log('auth');
      throw createError(401);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
