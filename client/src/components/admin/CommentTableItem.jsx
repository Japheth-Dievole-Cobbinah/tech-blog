import React from "react";
import assets from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { axios } = useAppContext();
  const token = localStorage.getItem("token");
  const BlogDate = new Date(comment.createdAt);

  // Approve comment
  const handleApprove = async () => {
    if (!token) {
      toast.error("Session expired. Please log in.");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/admin/approve-comment",
        { id: comment._id }, // payload
        { headers: { Authorization: `Bearer ${token}` } } // headers
      );

      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message || "Failed to approve comment");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Delete comment
  const handleDelete = async () => {
    if (!token) {
      toast.error("Session expired. Please log in.");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/admin/delete-comment",
        { id: comment._id }, // payload
        { headers: { Authorization: `Bearer ${token}` } } // headers
      );

      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message || "Failed to delete comment");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <tr className="border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog:</b>{" "}
        {comment.blog?.title || "Deleted Blog"} <br />
        <br />
        <b className="font-medium text-gray-600">Name:</b> {comment.name || "N/A"} <br />
        <br />
        <b className="font-medium text-gray-600">Comment:</b> {comment.content || comment.message || "N/A"}
      </td>
      <td className="px-6 py-4 max-sm:hidden">{BlogDate.toLocaleDateString()}</td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              src={assets.tick_icon}
              alt="Approve"
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              onClick={handleApprove}
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <img
            src={assets.bin_icon}
            alt="Delete"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
