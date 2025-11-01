import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

function MyTutorials() {
  const { user } = useContext(AuthContext);
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  
  useEffect(() => {
    if (user && user.email) {
      setLoading(true);
      const userEmail = user.email.toLowerCase().trim();
      const encodedEmail = encodeURIComponent(userEmail);
      
      const fetchTutorials = async () => {
        // ALWAYS try local backend first (where tutorials are actually saved)
        const localUrl = `http://localhost:5000/tutors/email/${encodedEmail}`;
        const localAllUrl = `http://localhost:5000/tutors`;
        
        try {
          console.log("🔍 MyTutorials: Trying local backend endpoint:", localUrl);
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 8000);
          
          const res = await fetch(localUrl, { signal: controller.signal });
          clearTimeout(timeoutId);
          
          if (res.ok) {
            const data = await res.json();
            const tutorialsData = Array.isArray(data) ? data : [];
            console.log(`✅ MyTutorials: Found ${tutorialsData.length} tutorials from local endpoint`);
            setTutorials(tutorialsData);
            setLoading(false);
            return;
          } else {
            console.log(`⚠️ Local endpoint returned ${res.status}, trying fetch all + filter`);
          }
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.log("⚠️ Local endpoint not available, trying fetch all:", error.message);
          }
        }

        // Fallback: Fetch all from local and filter
        try {
          console.log("🔍 MyTutorials: Fetching all from local and filtering...");
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 8000);
          
          const res = await fetch(localAllUrl, { signal: controller.signal });
          clearTimeout(timeoutId);
          
          if (res.ok) {
            const data = await res.json();
            const allTutorials = Array.isArray(data) ? data : [];
            
            // Improved filtering - check multiple email formats
            const filtered = allTutorials.filter((t) => {
              const tutorialEmail = (t.email || "").toLowerCase().trim();
              const tutorialTutorName = (t.tutorName || t.name || "").toLowerCase().trim();
              const userDisplayName = (user.displayName || "").toLowerCase().trim();
              
              return (
                tutorialEmail === userEmail ||
                tutorialEmail === user.email || // Original case
                (tutorialTutorName && userDisplayName && tutorialTutorName === userDisplayName)
              );
            });
            
            console.log(`✅ MyTutorials: Filtered ${filtered.length} tutorials from ${allTutorials.length} total`);
            console.log(`📧 Searching for email: "${userEmail}"`);
            console.log(`📋 All emails in DB:`, allTutorials.map(t => t.email).filter(Boolean));
            
            setTutorials(filtered);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.warn("⚠️ Local backend fetch all failed:", error.message);
        }

        // Local backend not available
        console.warn("⚠️ Local backend unavailable. Please start your backend server:");
        console.warn("   1. cd backend");
        console.warn("   2. npm start");
        setTutorials([]);
        setLoading(false);
      };

      fetchTutorials();
    } else {
      setLoading(false);
    }
  }, [user, user?.email]);

  const hundleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      // Show loading state
      Swal.fire({
        title: "Deleting...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Use local backend to delete from MongoDB
      const deleteUrl = `http://localhost:5000/tutorial/${_id}`;
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const res = await fetch(deleteUrl, {
          method: "DELETE",
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        const data = await res.json();

        if (res.ok && (data.deletedCount > 0 || data._id || data.deletedId)) {
          // Remove from state immediately for instant UI update
          setTutorials(tutorials.filter((tutorial) => tutorial._id !== _id));
          
          Swal.fire({
            title: "Deleted!",
            text: "Your tutorial has been deleted successfully from MongoDB.",
            icon: "success",
            confirmButtonText: "OK",
          });
          console.log(`✅ Tutorial deleted: ${_id}`);
        } else {
          throw new Error(data.error || "Failed to delete tutorial");
        }
      } catch (error) {
        console.error("❌ Error deleting tutorial:", error);
        
        let errorMessage = "Failed to delete tutorial.";
        if (error.name === 'AbortError') {
          errorMessage = "Request timed out. Please try again.";
        } else if (error.message.includes("fetch")) {
          errorMessage = "Cannot connect to backend server. Make sure it's running on port 5000.";
        } else {
          errorMessage = error.message || errorMessage;
        }
        
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="min-h-[420px] p-6 ">
      <h2 className="text-3xl font-extrabold text-start my-8 ">My Tutorials ({tutorials.length})</h2>
      {loading ? (
        <div className="flex items-center justify-center h-screen ">
          <div className="relative flex items-center justify-center">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-dotted"></div>
          </div>
        </div>
      ) : tutorials.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl mb-4">No tutorials found.</p>
          <div className="space-y-4">
            <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                💡 Make sure your backend server is running on port 5000
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-2">
                Run: <code className="bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded">cd backend && npm start</code>
              </p>
            </div>
            <Link
              to="/addTutorial"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Tutorial
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto my-10">
          <table className="w-full table-auto border-collapse border-gray-300 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                <th className="p-4 text-left text-sm font-semibold">Image</th>
                <th className="p-4 text-left text-sm font-semibold">Name</th>
                <th className="p-4 text-left text-sm font-semibold">
                  Language
                </th>
                <th className="p-4 text-left text-sm font-semibold">Price</th>
                <th className="p-4 text-left text-sm font-semibold">
                  Description
                </th>
                <th className="p-4 text-left text-sm font-semibold">Review</th>
                <th className="p-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.map((tutorial) => (
                <tr
                  key={tutorial._id}
                  className=" hover:bg-blue-50"
                >
                  <td className="p-4">
                    <img
                      src={tutorial.image}
                      alt="Tutorial"
                      className="w-20 h-20 rounded-md object-cover border"
                    />
                  </td>
                  <td className="p-4 font-medium ">{tutorial.title || tutorial.name || "Untitled Tutorial"}</td>
                  <td className="p-4 font-medium ">{tutorial.language}</td>
                  <td className="p-4 font-medium ">${tutorial.price}</td>
                  <td className="p-4 ">
                    {tutorial.description ? (tutorial.description.length > 70 ? tutorial.description.slice(0, 70) + "..." : tutorial.description) : "No description"}
                  </td>
                  <td className="p-4 ">{tutorial.review}</td>
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={() => hundleDelete(tutorial._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/updateTutorial/${tutorial._id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyTutorials;
