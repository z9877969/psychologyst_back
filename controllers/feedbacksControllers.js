const { createError } = require('../helpers');
const { Feedback } = require('../models');

const getFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find({}, '-createdAt -updatedAt');
    res.json(feedbacks);
  } catch (error) {
    next(error);
  }
};

const getVisibleFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find(
      { isShow: true },
      '-createdAt -updatedAt -isShow'
    );
    res.json(feedbacks);
  } catch (error) {
    next(error);
  }
};

const addFeedback = async (req, res, next) => {
  try {
    const { _doc } = await Feedback.create(req.body);
    const { createdAt, updatedAt, ...feedback } = _doc;
    res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};

const updateFeedbackShowing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { show } = req.query;
    const isShow = show === 'true' ? true : show === 'false' ? false : null;
    if (!isShow) {
      throw createError(400, 'Bad request show must have any true or false');
    }
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        isShow,
      },
      { new: true, projection: { updatedAt: 0, createdAt: 0 } }
    );

    res.status(200).json(feedback);
  } catch (error) {
    next(error);
  }
};

const deleteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndDelete(id);

    res.json(feedback);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFeedbacks,
  getVisibleFeedbacks,
  addFeedback,
  updateFeedbackShowing,
  deleteFeedback,
};
