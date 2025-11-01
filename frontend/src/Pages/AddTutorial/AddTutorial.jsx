import React, { useContext, useState, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { FaCamera, FaVideo, FaLink } from "react-icons/fa";

function AddTutorial() {
  const { user, loading } = useContext(AuthContext);
  const users = useLoaderData();


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
    "Arabic",
    "Portuguese",
    "Russian",
    "Urdu",
    "Turkish",
    "Swahili",
  ];

  // Loading or invalid data handling
  if (loading || !users || !Array.isArray(users)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-dotted"></div>
          <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-gradient-to-r from-green-400 to-blue-500"></div>
        </div>
      </div>
    );
  }

  // Find the matched user
  const currentUser = users.find((u) => u.email === user?.email) || null;

  const [formData, setFormData] = useState({
    title: "",
    tutorName: user?.displayName || currentUser?.name || "",
    image: "",
    language: "",
    price: "",
    description: "",
    review: 0,
    video: "",
    videoLink: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [useImageUpload, setUseImageUpload] = useState(true); // Default to upload mode
  const [useVideoUpload, setUseVideoUpload] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle image file selection
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB for images)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: "Error!",
          text: "Image file size must be less than 5MB",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      setImageFile(file);
      const base64 = await fileToBase64(file);
      setImagePreview(base64);
      setFormData({ ...formData, image: base64 });
      setUseImageUpload(true);
    }
  };

  // Handle video file selection
  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 50MB for videos)
      if (file.size > 50 * 1024 * 1024) {
        Swal.fire({
          title: "Error!",
          text: "Video file size must be less than 50MB",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      setVideoFile(file);
      const base64 = await fileToBase64(file);
      setFormData({ ...formData, video: base64, videoLink: "" });
      setUseVideoUpload(true);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine image source
    let imageData = formData.image;
    if (useImageUpload && imageFile) {
      // Image already converted to base64 in handleImageChange
      imageData = formData.image;
    }

    // Determine video source - prefer link over file
    let videoData = "";
    let videoLinkData = "";
    if (formData.videoLink) {
      videoLinkData = formData.videoLink;
    } else if (useVideoUpload && videoFile) {
      videoData = formData.video;
    }

    // Validate required fields
    if (!formData.title.trim()) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a tutorial title.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!formData.tutorName.trim()) {
      Swal.fire({
        title: "Error!",
        text: "Please enter tutor name.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!imageData.trim()) {
      Swal.fire({
        title: "Error!",
        text: "Please upload an image or provide an image URL.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const tutorialData = {
      title: formData.title,
      tutorName: formData.tutorName,
      email: user?.email || currentUser?.email || "", // Add email for filtering
      image: imageData,
      language: formData.language,
      price: parseFloat(formData.price),
      description: formData.description,
      review: parseFloat(formData.review) || 0,
      video: videoData,
      videoLink: videoLinkData,
    };

    // Use local backend in development, external in production
    const API_URL = import.meta.env.DEV 
      ? "http://localhost:5000/tutors" 
      : "https://tutor-sphere-server-side.vercel.app/tutors";

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tutorialData),
    })
      .then(async (res) => {
        // Check if response is ok
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Server error: ${res.status} - ${errorText}`);
        }
        // Check if response is JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(`Expected JSON but got: ${contentType}`);
        }
        return res.json();
      })
      .then((response) => {
        // Check if response has ok field or if tutor was created
        if (response.ok || response.tutor || response._id) {
          Swal.fire({
            title: "Success!",
            text: "Tutorial added successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            // Reset form
            setFormData({
              title: "",
              tutorName: user?.displayName || currentUser?.name || "",
              image: "",
              language: "",
              price: "",
              description: "",
              review: 0,
              video: "",
              videoLink: "",
            });
            setImagePreview("");
            setImageFile(null);
            setVideoFile(null);
            setUseImageUpload(true);
            setUseVideoUpload(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
            if (videoInputRef.current) videoInputRef.current.value = "";
            e.target.reset();
          });
        } else {
          Swal.fire({
            title: "Success!",
            text: "Tutorial added successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error("Error adding Tutorial:", error);
        let errorMessage = "An error occurred while adding the Tutorial.";
        
        if (error.message.includes("404")) {
          errorMessage = "Server not found. Please make sure the backend server is running on port 5000.";
        } else if (error.message.includes("Failed to fetch")) {
          errorMessage = "Cannot connect to server. Please check if the backend is running.";
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 space-y-6">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          Add a New Tutorial
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Tutorial Title */}
          <div className="form-group grid grid-cols-1 gap-3">
            <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Tutorial Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white"
              placeholder="Enter tutorial title"
              required
            />
          </div>

          {/* Tutor Name */}
          <div className="form-group grid grid-cols-1 gap-3">
            <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Tutor Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="tutorName"
              value={formData.tutorName}
              onChange={(e) =>
                setFormData({ ...formData, tutorName: e.target.value })
              }
              className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white"
              placeholder="Enter tutor name"
              required
            />
          </div>

          {/* Image Upload with Camera Icon */}
          <div className="form-group grid grid-cols-1 gap-3">
            <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Tutorial Image <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {useImageUpload ? (
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="file"
                      ref={fileInputRef}
                      name="imageFile"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {imagePreview ? (
                        <div className="w-full h-full relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-xl"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all rounded-xl flex items-center justify-center">
                            <FaCamera className="text-white text-3xl opacity-0 hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FaCamera className="text-6xl text-gray-400 dark:text-gray-500 mb-4" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG, GIF up to 5MB
                            </p>
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUseImageUpload(false);
                      setImagePreview("");
                      setImageFile(null);
                      setFormData({ ...formData, image: "" });
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                  >
                    <FaLink className="text-xs" /> Or use image URL instead
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white w-full"
                    placeholder="Enter tutorial image URL"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setUseImageUpload(true);
                      setFormData({ ...formData, image: "" });
                    }}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                  >
                    <FaCamera className="text-xs" /> Or upload from computer
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Language Selection */}
          <div className="form-group grid grid-cols-1 gap-3">
            <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Language <span className="text-red-500">*</span>
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={(e) =>
                setFormData({ ...formData, language: e.target.value })
              }
              className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select language</option>
              {languages.map((language, index) => (
                <option key={index} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="form-group grid grid-cols-1 gap-3">
            <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group grid grid-cols-1 gap-3">
            <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="4"
              className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white resize-none"
              placeholder="Enter tutorial description"
            />
          </div>

          {/* Review */}
          <div className="form-group grid grid-cols-1 gap-3">
            <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Review (Optional)
            </label>
            <input
              type="number"
              name="review"
              value={formData.review}
              onChange={(e) =>
                setFormData({ ...formData, review: e.target.value })
              }
              className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white"
              placeholder="Review (default 0)"
              min="0"
              max="5"
            />
          </div>

          {/* Video */}
          <div className="form-group grid grid-cols-1 gap-3">
            <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Video Content (Optional)
            </label>
            <div className="space-y-3">
              {useVideoUpload ? (
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="file"
                      ref={videoInputRef}
                      name="videoFile"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaVideo className="text-4xl text-gray-400 dark:text-gray-500 mb-2" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload video</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          MP4, AVI, MOV up to 50MB
                        </p>
                      </div>
                    </label>
                  </div>
                  {videoFile && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Selected:</strong> {videoFile.name} (
                        {(videoFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setUseVideoUpload(false);
                      setVideoFile(null);
                      setFormData({ ...formData, video: "" });
                      if (videoInputRef.current) videoInputRef.current.value = "";
                    }}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                  >
                    <FaLink className="text-xs" /> Or use video link instead
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="videoLink"
                    value={formData.videoLink}
                    onChange={(e) =>
                      setFormData({ ...formData, videoLink: e.target.value, video: "" })
                    }
                    className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white w-full"
                    placeholder="Enter YouTube/Vimeo video link"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setUseVideoUpload(true);
                      setFormData({ ...formData, videoLink: "" });
                    }}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                  >
                    <FaVideo className="text-xs" /> Or upload video from computer
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r transition duration-300 ease-in-out from-blue-600 via-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Submit Tutorial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTutorial;
