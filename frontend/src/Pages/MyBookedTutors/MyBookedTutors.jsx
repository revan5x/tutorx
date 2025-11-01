import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

function MyBookedTutors() {
  const { user } = useContext(AuthContext);
  const [booked, setBooked] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (user && user.email) {
      axiosSecure
        .get(`/tutors/email/${user.email}`)
        .then((res) => {
          // console.log(res.data)
        });
    }
  }, [user, user.email]);
  useEffect(() => {
    axios
      .get(`https://tutor-sphere-server-side.vercel.app/booked-tutors`)
      .then((response) => {
        const filteredData = response.data.filter(
          (tutor) => tutor.userEmail === user.email
        );
        setBooked(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching booked tutors:", error);
      });
  }, [user?.email]);
  // /booked-tutors/review/
  // Handle Review Action
  // const handleReview = (tutor) => {
  //   toast.success(`You can now review the tutorial: ${tutor.name}`);
  // };
  const handleReview = (tutor) => {
    axios
      .put(
        `https://tutor-sphere-server-side.vercel.app/booked-tutors/review/${tutor._id}`
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success(`Review added successfully for ${tutor.name}`);
          setBooked((prevBooked) =>
            prevBooked.map((item) =>
              item._id === tutor._id
                ? { ...item, review: (item.review || 0) + 1 }
                : item
            )
          );
        }
      })
      .catch((error) => {
        console.error("Error updating review count:", error);
        toast.error("Failed to update review count");
      });
  };

  return (
    <div className="min-h-[520px] p-6 ">
      <h1 className="text-4xl my-14 font-bold text-center">
        Booked Tutorials ({booked.length})
      </h1>
      {booked.length === 0 ? (
        <div>
          <h1 className="text-center text-2xl font-bold">No Found Data !</h1>
          <div className="flex items-center justify-center h-80 ">
            <div className="relative flex items-center justify-center">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-dotted"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {booked.map((tutor, index) => (
            <div
              key={index}
              className="shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300 ease-in-out"
            >
              <img
                src={tutor.image || "https://via.placeholder.com/150"}
                alt={tutor.name || "Tutor"}
                className="h-40 w-full object-cover rounded-t-lg mb-4"
              />
              <div className="p-2">
                <h2 className="text-xl font-semibold mb-2">
                  {/* {tutor.name || "Turor Name"} */}
                  {"Turor Name"}
                </h2>
                <p className="text-md mb-2">
                  <strong>Language:</strong> {tutor.language || "N/A"}
                </p>
                <p className="text-md  mb-2">
                  <strong>Price:</strong>{" "}
                  {tutor.price ? `BDT ${tutor.price}` : "Free"}
                </p>
                <button
                  onClick={() => handleReview(tutor)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mt-4 hover:bg-blue-600 focus:outline-none"
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookedTutors;
