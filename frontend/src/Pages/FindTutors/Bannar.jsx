import React from "react";

const Bannar = () => {
  return (
    <div className="w-full h-[70vh] bg-gray-100 mb-10 z-10 rounded-lg">
      <div
        className="hero h-full"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/m6CvK8r/kenny-eliason-z-FSo6bn-ZJTw-unsplash.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl text-white font-bold"> Welcome to Our Tutors</h1>
            <p className="mb-5 text-xl text-gray-100">
              Get personalized learning experiences with industry-leading
              experts who will guide you through your learning journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bannar;
