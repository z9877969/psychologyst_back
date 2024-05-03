const { Blog, Category } = require('../models');

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}, '-createdAt -updatedAt').populate(
      'category'
    );
    const categories = await Category.find({});
    res.json({ blogs, categories });
  } catch (error) {
    next(error);
  }
};

const addBlog = async (req, res, next) => {
  try {
    // const { _doc } = await Blog.create(req.body).populate('category');
    const createdBlog = await Blog.create(req.body);
    const { _doc } = await createdBlog.populate('category');
    const { createdAt, updatedAt, ...blog } = _doc;
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate('category');

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
