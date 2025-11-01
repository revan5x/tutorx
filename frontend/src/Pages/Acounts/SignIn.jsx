import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from './../../AuthProvider/AuthProvider';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, handleGoogleAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);

  const handleSignIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();

    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 6 characters long and include one uppercase, one lowercase, one digit, and one special character."
      );
      return;
    }

    signInUser(email, password)
      .then(() => {
        navigate(location?.state ? location.state : "/");
        navigate('/')
      })
      .catch((err) => {
        if (
          err.code === "auth/wrong-password" ||
          err.code === "auth/user-not-found"
        ) {
          toast.error("Invalid email or password!");
        } else {
          toast.error("Something went wrong. Please try again!");
        }
      });
  };
  // import axios from "axios";

  // const handleGoogleSignIn = () => {
  //   handleGoogleAuth()
  //     .then((result) => {
  //       const { displayName, email, photoURL } = result.user;
  
  //       const userData = {
  //         name: displayName,
  //         email: email,
  //         photo: photoURL,
  //       };
  
  //       axios
  //         .post("https://tutor-sphere-server-side.vercel.app/users", userData)
  //         .then(() => {
  //           navigate(location?.state ? location.state : "/");
  //         })
  //         .catch(() => {
  //           toast.error("Failed to add user to database.");
  //         });
  //     })
  //     .catch(() => {
  //       toast.error("Google Sign-In failed.");
  //     });
  // };
  
  const handleGoogleSignIn = () => {
    handleGoogleAuth()
      .then((result) => {
        const { displayName, email, photoURL } = result.user;

        const userData = {
          name: displayName,
          email: email,
          photo: photoURL,
        };

        fetch("https://tutor-sphere-server-side.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then(() => {
            navigate(location?.state ? location.state : "/");
          })
          .catch(() => {
            // toast.error("Failed to add user to database.");
          });
        navigate(location?.state ? location.state : "/");
      })
      .catch(() => {
        // toast.error("Google Sign-In failed.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl  shadow-lg rounded-lg overflow-hidden">
        {/* Info Section */}
        <div className="lg:w-1/2 w-full bg-blue-500 text-white flex flex-col justify-center items-center py-10 px-8">
          <h2 className="text-4xl font-bold">Welcome Back!</h2>
          <p className="text-sm mt-4 text-center">
            Sign in to <span className="font-bold">TutorX</span> and continue your journey of learning. If you don’t have an account, register now!
          </p>
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 w-full py-10 px-8">
          <form onSubmit={handleSignIn} className="space-y-6">
            <h1 className="text-3xl font-bold ">Sign In</h1>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className=" font-semibold">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2 relative">
              <label htmlFor="password" className=" font-semibold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 text-sm text-blue-500 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center mt-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-sm text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Sign-In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 mt-4 border border-gray-300  rounded-lg flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <FcGoogle className="mr-3 text-2xl" /> Sign In with Google
          </button>

          {/* Redirect to Sign Up */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Don’t have an account?{' '}
            <Link to={'/signUp'} className="text-blue-500 font-semibold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
