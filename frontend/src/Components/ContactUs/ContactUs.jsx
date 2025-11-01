import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="pt-12" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mt-5  mb-6">
          Contact Us
        </h2>
        <p className="text-center   mb-8">
          Have questions or need more information? Get in touch with us!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className=" dark:border-gray-700 p-6 rounded-lg shadow">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium  "
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm   focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium  "
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm  d   focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium  "
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300  rounded-lg shadow-sm  d   focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Type your message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full  text-white py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="p-6">
            <h3 className="text-xl font-semibold  mb-4">
              Get In Touch
            </h3>
            <p className="  mb-4">
              If you'd prefer to reach us directly, use the following contact
              information.
            </p>
            <ul className="space-y-2">
              <li>
                <strong className="">Phone:</strong>
                <span className=" ">
                  {" "}
                  +1 (123) 456-7890
                </span>
              </li>
              <li>
                <strong className="">Email:</strong>
                <span className=" ">
                  {" "}
                  TutorX@gmail.com
                </span>
              </li>
              <li>
                <strong className="">Address:</strong>
                <span className=" ">
                  {" "}
                  123 Tutors Lane, Knowledge City, Educationville
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
