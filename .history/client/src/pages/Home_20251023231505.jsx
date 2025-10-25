import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import BlogList from "../components/BlogList";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white via-primary/5 to-white">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <section id="header" className="mb-10">
        <Header />
      </section>

      {/* Blog List */}
      <section id="blogs" className="flex-grow">
        <BlogList />
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="mt-12 bg-primary/5 py-12">
        <Newsletter />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Home;
