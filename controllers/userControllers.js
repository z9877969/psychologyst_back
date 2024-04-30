const { User } = require('../models');
const { SECRET_KEY } = require('../envConfigs');
const { createError, credentialTools: tools } = require('../helpers');

const loginUser = async (req, res, next) => {
  try {
    const { email: bodyEmail, password } = req.body;

    const user = await User.findOne({ email: bodyEmail });

    const isPasswordsCompare = user
      ? await tools.password.compare(password, user.password)
      : null;

    if (!user || !isPasswordsCompare) {
      throw createError(403, "Email doesn't exist / Password is wrong");
    }

    const { token } = tools.token.create(
      {
        id: user._id,
      },
      SECRET_KEY,
      '10h'
    );

    const authUser = await User.findByIdAndUpdate(
      user._id,
      { token },
      { new: true }
    );

    res.json({
      token: authUser.token,
    });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const user = await User.create({
      ...req.body,
      password: await tools.password.hash(req.body.password, 10),
    });
    res.status(201).json({ email: user.email });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser, logoutUser, registerUser };
