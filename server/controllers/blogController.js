import fs from 'fs';
import imageKit from '../config/imageKit.js';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';
import main from '../config/gemini.js';
import jwt from 'jsonwebtoken';

/**
 * Add a new blog
 */
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog || '{}');
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, description, category, or image",
      });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const uploadResponse = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/blogs/',
    });

    const optimizedImageUrl = imageKit.url({
      path: uploadResponse.filePath,
      transformation: [{ quality: 'auto' }, { format: 'webp' }, { width: '1280' }],
    });

    const newBlog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished: isPublished ?? false,
    });

    fs.unlink(imageFile.path, (err) => {
      if (err) console.error('Error deleting temp file:', err);
    });

    return res.status(201).json({
      success: true,
      message: 'Blog added successfully',
      data: newBlog,
    });
  } catch (error) {
    console.error('Error adding blog:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while adding blog',
      error: error.message,
    });
  }
};

/**
 * Get all published blogs
 */
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a single blog by ID
 */
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a blog and its comments
 */
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    await Comment.deleteMany({ blog: id });

    res.json({ success: true, message: 'Blog and its comments deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Toggle publish status of a blog
 */
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);

    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({ success: true, message: `Blog is now ${blog.isPublished ? 'published' : 'unpublished'}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Add a comment for review
 */
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    if (!blog || !name || !content) {
      return res.status(400).json({ success: false, message: 'Blog, name, and content are required' });
    }

    const comment = await Comment.create({ blog, name, content });
    res.status(201).json({ success: true, message: 'Comment added for review', comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get approved comments for a blog
 */
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    if (!blogId) return res.status(400).json({ success: false, message: 'Blog ID is required' });

    const comments = await Comment.find({ blog: blogId, isApproved: true })
      .sort({ createdAt: -1 })
      .populate('blog', 'title');

    res.json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Generate AI content for blog
 * Requires valid JWT token
 */
export const generateContent = async (req, res) => {
  try {
    // ✅ Check Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ success: false, message: "Prompt is required" });

    const content = await main(prompt + ' Generate a blog content for this topic in simple text format');

    res.json({ success: true, content });
  } catch (error) {
    console.error('Generate content error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
