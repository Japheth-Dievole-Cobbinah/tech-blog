import React from "react";
import assets from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const blogDate = new Date(createdAt);
  const { axios } = useAppContext();

  // ✅ Delete blog handler
  const deleteBlog = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }

      const { data } = await axios.post(
        "/api/blog/delete",
        { id: blog._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message || "Blog deleted successfully!");
        await fetchBlogs();
      } else {
        toast.error(data.message || "Failed to delete blog.");
      }
    } catch (error) {
      console.error("Delete blog error:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // ✅ Toggle publish handler
  const togglePublish = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }

      const { data } = await axios.post(
        "/api/blog/toggle-publish",
        { id: blog._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message || "Publish status updated!");
        await fetchBlogs();
      } else {
        toast.error(data.message || "Failed to update publish status.");
      }
    } catch (error) {
      console.error("Toggle publish error:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300 hover:bg-gray-50 transition-colors duration-200">
      {/* Index */}
      <th className="px-3 py-3 text-center text-sm font-medium text-gray-700">{index}</th>

      {/* Title */}
      <td className="px-3 py-3 text-sm text-gray-800 break-words">{title}</td>

      {/* Date - hidden on small screens */}
      <td className="px-3 py-3 text-sm text-gray-600 max-sm:hidden whitespace-nowrap">
        {blogDate.toLocaleDateString()}
      </td>

      {/* Status - hidden on small screens */}
      <td className="px-3 py-3 text-sm max-sm:hidden whitespace-nowrap">
        <p className={blog.isPublished ? "text-green-600" : "text-red-600"}>
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>

      {/* Actions */}
      <td className="px-3 py-3 flex items-center gap-2 justify-center text-xs sm:text-sm">
        <button
          onClick={togglePublish}
          className={`border px-2 py-1 rounded cursor-pointer transition-colors hover:bg-gray-200 ${
            blog.isPublished
              ? "border-red-500 text-red-600"
              : "border-green-500 text-green-600"
          }`}
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          onClick={deleteBlog}
          src={assets.cross_icon}
          alt="Delete"
          className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
