import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaGraduationCap, FaBook, FaStar, FaLanguage, FaDollarSign } from "react-icons/fa";
import Swal from "sweetalert2";

function Profile() {
  const { user, currentUserFromDB } = useContext(AuthContext);
  const [bookedTutorials, setBookedTutorials] = useState([]);
  const [uploadedTutorials, setUploadedTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState("");

  // Fetch user data and tutorials
  useEffect(() => {
    if (user && user.email) {
      // Fetch booked tutorials
      axios
        .get(`https://tutor-sphere-server-side.vercel.app/booked-tutors`)
        .then((response) => {
          const filteredData = response.data.filter(
            (tutor) => tutor.userEmail === user.email
          );
          setBookedTutorials(filteredData);
        })
        .catch((error) => {
          console.error("Error fetching booked tutors:", error);
        });

      // Fetch uploaded tutorials - prioritize local backend
      const userEmail = user.email.toLowerCase().trim();
      const encodedEmail = encodeURIComponent(userEmail);
      
      const fetchTutorials = async () => {
        const localUrl = `http://localhost:5000/tutors/email/${encodedEmail}`;
        const localAllUrl = `http://localhost:5000/tutors`;
        
        // Try local backend endpoint first
        try {
          console.log("🔍 Profile: Trying local backend endpoint:", localUrl);
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 8000);
          
          const res = await fetch(localUrl, { signal: controller.signal });
          clearTimeout(timeoutId);
          
          if (res.ok) {
            const data = await res.json();
            const tutorialsData = Array.isArray(data) ? data : [];
            console.log(`✅ Profile: Found ${tutorialsData.length} tutorials from local endpoint`);
            setUploadedTutorials(tutorialsData);
            return;
          }
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.log("⚠️ Profile: Local endpoint not available, trying fetch all");
          }
        }

        // Fallback: Fetch all from local and filter
        try {
          console.log("🔍 Profile: Fetching all from local and filtering...");
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 8000);
          
          const res = await fetch(localAllUrl, { signal: controller.signal });
          clearTimeout(timeoutId);
          
          if (res.ok) {
            const data = await res.json();
            const allTutorials = Array.isArray(data) ? data : [];
            
            // Improved filtering
            const filtered = allTutorials.filter((t) => {
              const tutorialEmail = (t.email || "").toLowerCase().trim();
              const tutorialTutorName = (t.tutorName || t.name || "").toLowerCase().trim();
              const userDisplayName = (user.displayName || "").toLowerCase().trim();
              
              return (
                tutorialEmail === userEmail ||
                tutorialEmail === user.email ||
                (tutorialTutorName && userDisplayName && tutorialTutorName === userDisplayName)
              );
            });
            
            console.log(`✅ Profile: Filtered ${filtered.length} tutorials from ${allTutorials.length} total`);
            setUploadedTutorials(filtered);
            return;
          }
        } catch (error) {
          console.warn("⚠️ Profile: Local backend unavailable. Please start local backend server.");
          setUploadedTutorials([]);
        }
      };

      fetchTutorials();

      // Fetch user bio
      axios
        .get(`https://tutor-sphere-server-side.vercel.app/users`)
        .then((response) => {
          const currentUser = response.data.find((u) => u.email === user.email);
          if (currentUser) {
            setBio(currentUser.bio || "");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user, user?.email]);

  // Handle bio update
  const handleBioUpdate = () => {
    if (!user?.email) return;

    const userData = {
      email: user.email,
      bio: bio,
    };

    // Try PUT first, if that fails try PATCH
    const API_URL = `https://tutor-sphere-server-side.vercel.app/users/${user.email}`;
    
    axios
      .put(API_URL, userData)
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: "Bio updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setEditingBio(false);
      })
      .catch(() => {
        // If PUT fails, try PATCH
        axios
          .patch(API_URL, userData)
          .then((response) => {
            Swal.fire({
              title: "Success!",
              text: "Bio updated successfully!",
              icon: "success",
              confirmButtonText: "OK",
            });
            setEditingBio(false);
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to update bio. The API might not support bio updates yet.",
              icon: "error",
              confirmButtonText: "OK",
            });
            console.error("Error updating bio:", error);
          });
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-dotted"></div>
        </div>
      </div>
    );
  }

  const displayName = user?.displayName || currentUserFromDB?.name || "User";
  const userEmail = user?.email || "";
  const userPhoto = user?.photoURL || currentUserFromDB?.photo || "https://via.placeholder.com/150";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 h-32"></div>
          <div className="px-8 pb-8 -mt-16">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="relative">
                <img
                  src={userPhoto}
                  alt={displayName}
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-lg object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                  {displayName}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{userEmail}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <FaBook className="text-blue-600" />
                    <span className="font-semibold">{uploadedTutorials.length}</span>
                    <span className="text-sm">Tutorials Created</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <FaGraduationCap className="text-purple-600" />
                    <span className="font-semibold">{bookedTutorials.length}</span>
                    <span className="text-sm">Booked Tutorials</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bio Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Bio
                </h2>
                <button
                  onClick={() => {
                    if (editingBio) {
                      handleBioUpdate();
                    } else {
                      setEditingBio(true);
                    }
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title={editingBio ? "Save Bio" : "Edit Bio"}
                >
                  <FaEdit />
                </button>
              </div>
              {editingBio ? (
                <div className="space-y-3">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white resize-none"
                    rows="6"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleBioUpdate}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingBio(false);
                        // Reset bio to original
                        axios
                          .get(`https://tutor-sphere-server-side.vercel.app/users`)
                          .then((response) => {
                            const currentUser = response.data.find((u) => u.email === user.email);
                            if (currentUser) {
                              setBio(currentUser.bio || "");
                            }
                          });
                      }}
                      className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {bio || "No bio available. Click edit to add your bio."}
                </p>
              )}
            </div>
          </div>

          {/* Tutorials Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Uploaded Tutorials */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <FaBook className="text-blue-600" />
                  My Uploaded Tutorials
                </h2>
                <Link
                  to="/myTutorial"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-semibold"
                >
                  View All →
                </Link>
              </div>
              {uploadedTutorials.length === 0 ? (
                <div className="text-center py-12">
                  <FaBook className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    You haven't uploaded any tutorials yet.
                  </p>
                  <Link
                    to="/addTutorial"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Your First Tutorial
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {uploadedTutorials.slice(0, 4).map((tutorial) => (
                    <Link
                      key={tutorial._id}
                      to={`/details/${tutorial._id}`}
                      className="group border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-500"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={tutorial.image || "https://via.placeholder.com/300"}
                          alt={tutorial.title || tutorial.name || "Tutorial"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 line-clamp-1">
                          {tutorial.title || tutorial.name || "Untitled Tutorial"}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                          <span className="flex items-center gap-1">
                            <FaLanguage className="text-blue-600" />
                            {tutorial.language || "N/A"}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaDollarSign className="text-green-600" />
                            {tutorial.price || "Free"}
                          </span>
                          {tutorial.review > 0 && (
                            <span className="flex items-center gap-1">
                              <FaStar className="text-yellow-500" />
                              {tutorial.review}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Booked Tutorials */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <FaGraduationCap className="text-purple-600" />
                  My Booked Tutorials
                </h2>
                <Link
                  to="/myBookedTutors"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-semibold"
                >
                  View All →
                </Link>
              </div>
              {bookedTutorials.length === 0 ? (
                <div className="text-center py-12">
                  <FaGraduationCap className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    You haven't booked any tutorials yet.
                  </p>
                  <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Browse Tutorials
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookedTutorials.slice(0, 4).map((tutorial, index) => (
                    <Link
                      key={index}
                      to={`/details/${tutorial._id}`}
                      className="group border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-purple-500"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={tutorial.image || "https://via.placeholder.com/300"}
                          alt={tutorial.title || tutorial.name || "Tutorial"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 line-clamp-1">
                          {tutorial.title || tutorial.name || "Tutorial"}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                          <span className="flex items-center gap-1">
                            <FaLanguage className="text-blue-600" />
                            {tutorial.language || "N/A"}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaDollarSign className="text-green-600" />
                            {tutorial.price || "Free"}
                          </span>
                          {tutorial.review > 0 && (
                            <span className="flex items-center gap-1">
                              <FaStar className="text-yellow-500" />
                              {tutorial.review}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

