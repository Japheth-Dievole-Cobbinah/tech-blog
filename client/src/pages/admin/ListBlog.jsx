import React, { useEffect, useState } from 'react';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      // ✅ Get token from localStorage (or context if you store it there)
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('No token found. Please log in again.');
        return;
      }

      // ✅ Send token in Authorization header
      const { data } = await axios.get('/api/admin/blogs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message || 'Failed to load blogs.');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized — please log in again.');
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 p-6 sm:pt-12 sm:pl-16 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">All Blogs</h1>

      <div className="relative overflow-x-auto shadow-lg rounded-lg bg-white border border-gray-200">
        <table className="w-full min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 xl:px-6 text-left font-medium text-gray-600">#</th>
              <th className="px-4 py-3 xl:px-6 text-left font-medium text-gray-600">Blog Title</th>
              <th className="px-4 py-3 xl:px-6 text-left font-medium text-gray-600 max-sm:hidden">Date</th>
              <th className="px-4 py-3 xl:px-6 text-left font-medium text-gray-600 max-sm:hidden">Status</th>
              <th className="px-4 py-3 xl:px-6 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
