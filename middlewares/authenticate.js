const { User } = require('../models');
const { SECRET_KEY } = require('../envConfigs');
const { credentialTools: tools, createError } = require('../helpers');

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw createError(400, 'No token provided');
    }

    try {
      const { id } = await tools.token.verify(token, SECRET_KEY);
      if (!id) {
        throw createError(401);
      }

      const user = await User.findById(id);

      if (!user || !user.token || user.token !== token) {
        throw createError(401);
      }

      req.user = user;

      next();
    } catch (error) {
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
