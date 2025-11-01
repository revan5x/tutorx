import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

function Bannar() {
  return (
    <div className="w-full h-[70vh] bg-gray-100 mb-10 z-10 rounded-lg">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        className="h-full rounded-lg z-10"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full z-10 rounded-lg">
            <img
              src="https://i.ibb.co.com/WyXdyhH/jerry-wang-KV9-F7-Ypl2-N0-unsplash.jpg"
              alt="Language Learning"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
              <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
                Learn New Languages
              </h1>
              <p className="text-white text-lg md:text-2xl mb-6">
                Connect with expert tutors to master the language of your
                choice.
              </p>
              <Link
                // to="/find-tutors"
                to={"#"}
                id="view1"
                className="btn mt-4 border-none bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Find Tutors
              </Link>
              <Tooltip
                anchorSelect="#view1"
                content="Explore tutors for different languages"
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full z-10 rounded-lg">
            <img
              src="https://i.ibb.co.com/tY4JyqL/asia-businessmen-businesswomen-meeting-brainstorming-ideas-conducting-business-presentation-project.jpg"
              alt="Personalized Guidance"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
              <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
                Personalized Tutoring
              </h1>
              <p className="text-white text-lg md:text-2xl mb-6">
                Get one-on-one guidance to achieve your academic and personal
                goals.
              </p>
              <Link
                // to="/find-tutors"
                to={"#"}
                id="view2"
                className="btn mt-4 border-none bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Find Your Guide
              </Link>
              <Tooltip
                anchorSelect="#view2"
                content="Find tutors who can offer personal guidance"
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full h-full z-10 rounded-lg">
            <img
              src="https://i.ibb.co.com/7pMTv6g/skills-intelligence-job-occupation-recruitment-concept.jpg"
              alt="Skill Development"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
              <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
                Enhance Your Skills
              </h1>
              <p className="text-white text-lg md:text-2xl mb-6">
                Learn in-demand skills with experienced tutors to excel in life.
              </p>
              <Link
                // to="/find-tutors"
                to={"#"}
                id="view3"
                className="btn mt-4 border-none bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Explore Now
              </Link>
              <Tooltip
                anchorSelect="#view3"
                content="Explore skill development opportunities"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Bannar;
