import React, { useEffect, useState } from "react";
import assets from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
  const [loading, setLoading] = useState(false);

  const { axios, navigate } = useAppContext();

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in");
        navigate("/admin/login");
        return;
      }

      const { data } = await axios.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message || "Failed to load dashboard data");
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
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="flex flex-wrap gap-6 mb-8">
        {[
          { icon: assets.dashboard_icon_1, count: dashboardData.blogs, label: "Blogs" },
          { icon: assets.dashboard_icon_2, count: dashboardData.comments, label: "Comments" },
          { icon: assets.dashboard_icon_3, count: dashboardData.drafts, label: "Drafts" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white p-6 rounded-lg shadow hover:scale-105 transform transition-transform duration-200 cursor-pointer min-w-[15rem]"
          >
            <img src={item.icon} alt={`${item.label} Icon`} className="w-12 h-12" />
            <div>
              <p className="text-2xl font-semibold text-gray-700">{item.count}</p>
              <p className="text-gray-400 font-light text-sm">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Blogs Header */}
      <div className="flex items-center gap-3 mb-4 text-gray-600">
        <img src={assets.dashboard_icon_4} alt="Recent Blogs Icon" className="w-6 h-6" />
        <p className="text-lg font-medium">
          {dashboardData.recentBlogs.length} Recent Blogs
        </p>
      </div>

      {/* Loading or Empty State */}
      {loading ? (
        <p className="text-gray-500">Loading dashboard data...</p>
      ) : dashboardData.recentBlogs.length === 0 ? (
        <p className="text-gray-500">No recent blogs available</p>
      ) : (
        /* Recent Blogs Table */
        <div className="relative max-w-4xl overflow-x-auto shadow-lg rounded-lg bg-white border border-gray-200">
          <table className="w-full min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 uppercase text-xs text-gray-600">
              <tr>
                <th className="px-4 py-3 xl:px-6 text-left font-medium">#</th>
                <th className="px-4 py-3 xl:px-6 text-left font-medium">Blog Title</th>
                <th className="px-4 py-3 xl:px-6 text-left max-sm:hidden font-medium">Date</th>
                <th className="px-4 py-3 xl:px-6 text-left max-sm:hidden font-medium">Status</th>
                <th className="px-4 py-3 xl:px-6 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboard}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
