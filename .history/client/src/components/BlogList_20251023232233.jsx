import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  // Filter blogs by search and category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      input === "" ||
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.category.toLowerCase().includes(input.toLowerCase());

    const matchesCategory = menu === "All" || blog.category === menu;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="relative">
      {/* --- Category Filter Menu --- */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 my-10">
        {blogCategories.map((item) => {
          const isActive = menu === item;
          return (
            <button
              key={item}
              onClick={() => setMenu(item)}
              className={`relative px-5 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 
                ${
                  isActive
                    ? "bg-primary text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"
                }`}
            >
              {item}
              {/* Animated blue background highlight */}
              {isActive && (
                <motion.div
                  layoutId="categoryHighlight"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* --- Blog Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-10">
            No blogs found for “{input || menu}”.
          </p>
        )}
      </div>
    </section>
  );
};

export default BlogList;
