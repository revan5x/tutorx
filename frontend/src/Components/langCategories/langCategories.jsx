import React from "react";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";

function LangCategories({ languegesCategory }) {
  return (
    <div>
      <div>
        <h1 className="text-center text-4xl mt-4 font-bold">Language Categories</h1>
      </div>
      <div className="w-11/12 my-14 lg:w-11/12 mx-auto grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {languegesCategory.map((languege) => (
          <div
            key={languege._id}
            className=" flex justify-between items-center px-5 py-4 hover:bg-blue-100 border border-gray-200  rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            {/* Logo with Grayscale Hover */}
            <div className="w-20 h-20  rounded-full overflow-hidden">
              <img
                src={languege.logo || "https://via.placeholder.com/150"}
                alt={languege.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title and Total Tutors */}
            <div className="text-center">
              <h1 className="text-xl font-bold ">
                {languege.title}
              </h1>
              <p className="text-sm text-gray-500">
                Tutors: {languege.totalTutors}+
              </p>
            </div>

            {/* Hover Arrow Icon */}
            <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 cursor-pointer">
              <Link to={`/findTutors/${languege.category}`}>
                <SlArrowRight
                  className="text-gray-600 hover:text-black"
                  size={20}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LangCategories;
