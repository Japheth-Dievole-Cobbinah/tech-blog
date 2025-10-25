import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Make sure the model name matches exactly "Blog"
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
