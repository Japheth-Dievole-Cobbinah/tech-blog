import React, { useEffect, useState } from "react";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const [loading, setLoading] = useState(false);

  const { axios, navigate } = useAppContext();

  const fetchComments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in");
        navigate("/admin/login");
        return;
      }

      const { data } = await axios.get("/api/admin/comments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        // Ensure every comment has a blog object to prevent frontend crashes
        const safeComments = data.comments.map((c) => ({
          ...c,
          blog: c.blog || { title: "Deleted Blog" },
        }));
        setComments(safeComments);
      } else {
        toast.error(data.message || "Failed to fetch comments");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/admin/login");
      } else {
        toast.error(
          error?.response?.data?.message || error.message || "Something went wrong"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const filteredComments = comments.filter((comment) =>
    filter === "Approved" ? comment.isApproved : !comment.isApproved
  );

  return (
    <div className="flex-1 pt-5 sm:pt-12 sm:px-16 bg-blue-50/50 min-h-screen">
      <div className="flex justify-between items-center max-w-3xl mb-4">
        <h1 className="text-xl font-semibold">Comments</h1>
        <div className="flex gap-4">
          {["Approved", "Not Approved"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
                filter === status ? "text-primary" : "text-gray-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading comments...</p>
      ) : filteredComments.length === 0 ? (
        <p className="text-gray-500">No comments found</p>
      ) : (
        <div className="relative max-w-3xl h-4/5 overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-700 text-left uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Blog Title & Comment
                </th>
                <th scope="col" className="px-6 py-3 max-sm:hidden">Date</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComments.map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Comments;
