import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import assets from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  // ✅ Fetch Blog Data
  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Fetch Comments
  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", { blogId: id });
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Add Comment
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });
      if (data.success) {
        toast.success("Comment added!");
        setName("");
        setContent("");
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Share Function
  const handleShare = (platform) => {
    if (!data) return;

    const postUrl = encodeURIComponent(window.location.href);
    const postTitle = encodeURIComponent(data.title);
    const postDescription = encodeURIComponent(data.subTitle || "");
    const postImage = encodeURIComponent(data.image || "");

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}&quote=${postTitle}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${postUrl}&text=${postTitle}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}&title=${postTitle}&summary=${postDescription}&source=CommITConnect`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${postTitle}%20-%20${postDescription}%20${postUrl}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <div className="relative">
      {/* ✅ Dynamic SEO & Social Meta Tags */}
      <Helmet>
        <title>{`${data.title} | CommIT Connect`}</title>
        <meta name="description" content={data.subTitle || data.title} />
        <meta name="author" content="CommIT Connect" />
        <meta name="keywords" content={`technology, culture, lifestyle, ${data.title}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.subTitle || data.title} />
        <meta property="og:image" content={data.image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="CommIT Connect" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.subTitle || data.title} />
        <meta name="twitter:image" content={data.image} />
      </Helmet>

      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
      <Navbar />

      {/* Blog Header */}
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on: {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          Japheth Dievole Cobbinah
        </p>
      </div>

      {/* Blog Body */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt={data.title} className="rounded-3xl mb-5" />

        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comments Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="" className="w-6" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">{item.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add a Comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Comment"
              className="w-full p-2 border border-gray-300 rounded outline-none h-48"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-primary text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

        {/* 🟢 Share Buttons */}
        <div className="my-24 max-w-3xl mx-auto text-center">
          <p className="font-semibold my-4 text-gray-800">Share this post:</p>
          <div className="flex justify-center gap-6 mt-3">
            {[
              { name: "facebook", icon: assets.facebook_icon, label: "Facebook" },
              { name: "twitter", icon: assets.twitter_icon, label: "Twitter" },
              { name: "linkedin", icon: assets.whatsapp_icon, label: "LinkedIn" },
              { name: "whatsapp", icon: assets.whatsapp, label: "WhatsApp" },
            ].map((platform) => (
              <div key={platform.name} className="relative group">
                <img
                  src={platform.icon}
                  width={45}
                  alt={platform.label}
                  className="cursor-pointer hover:opacity-80 transition-transform duration-200 hover:scale-110"
                  onClick={() => handleShare(platform.name)}
                />
                {/* Tooltip */}
                <span
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs text-white bg-gray-800 px-2 py-1 rounded opacity-0 translate-y-2 
                  group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out shadow-md"
                >
                  {platform.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
