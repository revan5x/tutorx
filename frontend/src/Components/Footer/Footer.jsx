import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 px-5">
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4">TutorX</h2>
          <p>
            Your trusted platform for finding expert tutors and personalized
            learning experiences. Start your journey to success with us today!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {/* <li>
              <Link
                to="/about"
                className="hover:text-blue-400 transition-colors"
              >
                About Us
              </Link>
            </li> */}
            <li>
              <Link
                to="/findTutors/:category"
                className="hover:text-blue-400 transition-colors"
              >
                Find Tutors
              </Link>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-blue-400 transition-colors"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#FAQSection"
                className="hover:text-blue-400 transition-colors"
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>
            Email: <a href="mailto:support@tutorX.com" className="text-blue-400 hover:underline">support@tutorX.com</a>
          </p>
          <p>Phone: +123 456 7890</p>
          <p>Location: 123 Tutor Lane, Knowledge City</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-blue-400 hover:scale-110 transition-transform">
            <FaFacebook></FaFacebook>
            </a>
            <a href="#" className="text-blue-400 hover:scale-110 transition-transform">
            <FaSquareXTwitter></FaSquareXTwitter>
            </a>
            <a href="#" className="text-blue-400 hover:scale-110 transition-transform">
            <FaLinkedin></FaLinkedin>
            </a>
          </div>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
          <p className="mb-4">Stay updated with the latest news and tutorials.</p>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded mb-4 text-black"
            />
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="mt-10">
        <h3 className="text-center text-xl font-semibold mb-4">What Our Users Say</h3>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-full max-w-3xl mx-auto"
        >
          <SwiperSlide>
            <p className="text-center text-lg">"TutorX has transformed my learning journey! Highly recommend it to everyone."</p>
          </SwiperSlide>
          <SwiperSlide>
            <p className="text-center text-lg">"Finding the right tutor was never this easy! Thank you TutorX!"</p>
          </SwiperSlide>
          <SwiperSlide>
            <p className="text-center text-lg">"Excellent platform with top-notch tutors. Absolutely worth it!"</p>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center">
        <p>&copy; 2024 TutorX. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
