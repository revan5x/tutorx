import React, { useEffect, useState } from "react";

function TopTutors() {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetch("tutors.json")
      .then((response) => response.json())
      .then((data) => setTutors(data))
      .catch((error) => console.error("Error fetching tutors data:", error));
  }, []);

  return (
    <div className="w-11/12 mx-auto py-10">
      <h1 className="text-center text-4xl font-bold mb-12">
        Meet Our Top Tutors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            className="relative rounded-xl shadow-lg overflow-hidden border-t-4 border-blue-500 hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-2"
          >
            {/* Image */}
            <div className="overflow-hidden group">
              <img
                src={tutor.image}
                alt={tutor.name}
                className="w-full lg:h-40  2xl:h-56 object-cover transition-transform transform group-hover:scale-110 duration-300"
              />
            </div>

            {/* Card Content */}
            <div className="p-4 flex flex-col items-center text-center">
              <h2 className="text-lg font-semibold  mb-1">
                {tutor.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{tutor.profession}</p>
              <div className="text-sm text-gray-400 mb-3">
                <strong>Language:</strong> {tutor.language}
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[...Array(Math.round(tutor.rating)).keys()].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.953a1 1 0 00.95.691h4.05c.969 0 1.371 1.24.588 1.81l-3.278 2.383a1 1 0 00-.364 1.118l1.286 3.952c.3.922-.755 1.688-1.54 1.118L10 13.177l-3.328 2.383c-.784.57-1.838-.196-1.539-1.118l1.285-3.952a1 1 0 00-.364-1.118l-3.278-2.383c-.783-.57-.38-1.81.588-1.81h4.049a1 1 0 00.95-.691l1.287-3.953z" />
                  </svg>
                ))}
              </div>
              {/* <button className="text-sm bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
                View Profile
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopTutors;
