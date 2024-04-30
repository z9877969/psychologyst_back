const { Blog } = require('../models');

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}, '-createdAt -updatedAt');
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

const addBlog = async (req, res, next) => {
  try {
    const { _doc } = await Blog.create(req.body);
    const { createdAt, updatedAt, ...blog } = _doc;
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });

    res.json(blog);
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    res.json(blog);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
};
