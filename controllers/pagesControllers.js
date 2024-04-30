const { Page } = require('../models');

const getPages = async (req, res, next) => {
  try {
    const pages = await Page.find({}, '-createdAt -updatedAt');
    res.json(pages);
  } catch (error) {
    next(error);
  }
};

const addPage = async (req, res, next) => {
  try {
    const { _doc } = await Page.create(req.body);
    const { createdAt, updatedAt, ...page } = _doc;
    res.status(201).json(page);
  } catch (error) {
    next(error);
  }
};

const updatePage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const page = await Page.findByIdAndUpdate(id, req.body, { new: true });

    res.json(page);
  } catch (error) {
    next(error);
  }
};

const deletePage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const page = await Page.findByIdAndDelete(id);

    res.json(page);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPages,
  addPage,
  updatePage,
  deletePage,
};
