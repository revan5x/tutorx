import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateTutorial() {
  const { user, currentUserFromDB } = useContext(AuthContext);
  const tutorial = useLoaderData();
  // console.log(tutorial);
  const hundleUpdateForm = (e) => {
    e.preventDefault();
    const form = e.target;

    const updateData = {
        name: form.name.value,
        email: form.email.value,
        image: form.image.value,
        language: form.language.value,
        price: parseFloat(form.price.value),
        description: form.description.value,
        review: parseFloat(form.review)
    }
    // console.log('Please update the data', updateData);

    // Send PUT request to update the product
    fetch(`https://tutor-sphere-server-side.vercel.app/tutorial/${tutorial._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: "Tutorial updated successfully!",
              icon: "success",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              title: "Info",
              text: "No changes made to the tutorial.",
              icon: "info",
              confirmButtonText: "OK",
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text: "Failed to update tutorial. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
          console.error(err);
        });
      
      

  };
  // Language options
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Japanese",
    "Korean",
    "Italian",
    "Hindi",
    "Bengali",
    "Arabi",
    "Portuguese",
    "Russian",
    "Urdu",
    "Turkish",
    "Swahili",
  ];
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-xl mx-auto  rounded-lg shadow-md p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Update Tutorial
        </h2>

        <form onSubmit={hundleUpdateForm} className="space-y-6">
          {/* Name */}
          <div className="form-group grid grid-cols-1 gap-3">
            <label className="text-lg font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName || currentUserFromDB?.name}
              disabled
              className="p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div className="form-group grid grid-cols-1 gap-3">
            <label className="text-lg font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email || currentUserFromDB?.email}
              disabled
              className="p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your email"
            />
          </div>

          {/* Image */}
          <div className="form-group grid grid-cols-1 gap-3">
            <label className="text-lg font-medium text-gray-600">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              defaultValue={tutorial.image}
              className="p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter tutorial image URL"
            />
          </div>

          {/* Language Selection */}
          <div className="form-group grid grid-cols-1 gap-3">
            <label className="text-lg font-medium text-gray-600">
              Language
            </label>
            <select
              name="language"
              defaultValue={tutorial.language}
              className="p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option defaultValue="">Select language</option>
              {languages.map((language, index) => (
                <option key={index} defaultValue={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="form-group grid grid-cols-1 gap-3">
            <label className="text-lg font-medium text-gray-600">Price</label>
            <input
              type="number"
              name="price"
              defaultValue={tutorial.price}
              className="p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter price"
            />
          </div>

          {/* Description */}
          <div className="form-group grid grid-cols-1 gap-3">
            <label className="text-lg font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={tutorial.description}
              className="p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter tutorial description"
            />
          </div>

          {/* Review */}
          <div className="form-group grid grid-cols-1 gap-3">
            <label className="text-lg font-medium text-gray-600">Review</label>
            <input
              type="number"
              name="review"
              defaultValue={tutorial.review}
              disabled
              className="p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Review (default 0)"
            />
          </div>
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r transition duration-300 ease-in-out from-blue-400 to-gray-500 text-white font-semibold rounded-xl hover:from-gray-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Submit Tutorial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTutorial;
