import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Bannar from "./Bannar";

function FindTutors() {
  const { user } = useContext(AuthContext);
  const categoriesTutors = useLoaderData();
  const [tutors, setTutors] = useState(categoriesTutors || []);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user && user.email) {
      axiosSecure.get(`/tutors/email/${user.email}`).then((res) => {
        // You can handle responses here if needed
      });
    }
  }, [user, user.email]);

  useEffect(() => {
    // Only fetch all tutors if categoriesTutors is empty
    if (!categoriesTutors || categoriesTutors.length === 0) {
      setLoading(true);
      fetch(`http://localhost:5000/api/tutors`)
        .then((res) => res.json())
        .then((data) => {
          setTutors(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [categoriesTutors]);

  useEffect(() => {
    if (search) {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        fetch(`http://localhost:5000/api/tutors?search=${search}`)
          .then((res) => res.json())
          .then((data) => {
            setTutors(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [search]);

  return (
    <div>
      <Bannar />
      <div className="min-h-[450px] p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          {categoriesTutors && categoriesTutors.length > 0
            ? "Tutors by Category"
            : "All Tutors"}
        </h1>
        {/* Search Bar */}
        <div className="w-[330px] mx-auto my-5">
          <label className="input input-bordered flex items-center gap-2 mt-8 mb-16">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="grow"
              placeholder="Search for a tutor by language"
              aria-label="Search tutors by language"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        {/* Tutors List */}
        <div className="my-14 grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 2xl:gap-10">
          {loading ? (
            <div className="flex col-span-12 items-center justify-center h-screen">
              <div className="relative flex items-center justify-center">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-dotted"></div>
              </div>
            </div>
          ) : tutors.length > 0 ? (
            tutors.map((tutor) => (
              <div
                key={tutor?._id}
                className="flex items-center border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <img
                    src={tutor?.image || "https://via.placeholder.com/100"}
                    alt={tutor?.UserName || "Tutor"}
                    className=" h-16 w-20 rounded-sm border-2 border-gray-200"
                  />
                </div>

                {/* Details */}
                <div className="ml-4 flex-grow">
                  <h2 className="text-md font-semibold">{"Tutor Name"}</h2>
                  <div className="flex flex-col justify-between text-sm mt-1">
                    <p>🌐 Language: {tutor?.language || "N/A"}</p>
                    <p>💰 {tutor?.price ? `₹${tutor.price}` : "Free"}</p>
                    <p>Review: {tutor?.review || "No reviews yet"}</p>
                  </div>
                  <p className="text-sm  mt-1">
                    {tutor?.description
                      ? tutor.description.length > 50
                        ? tutor.description.slice(0, 50) + "..."
                        : tutor.description
                      : "No description provided."}
                  </p>
                </div>

                {/* Buttons */}
                <div className="ml-4 flex justify-end flex-col">
                  <Link
                    to={`/details/${tutor._id}`}
                    className="bg-blue-500 text-white text-sm py-1 px-3 rounded-lg hover:bg-blue-600"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No tutors found for your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FindTutors;
