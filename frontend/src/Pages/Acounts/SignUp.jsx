import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "./../../AuthProvider/AuthProvider";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { createUser, handleGoogleAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);

  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();
    const photo = event.target.photo.value.trim();

    const userData = { name, photo, email };
    fetch("https://tutor-sphere-server-side.vercel.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).catch(() => {
      toast.error("Failed to add user to database");
    });

    let tempErrors = {};

    if (!name) {
      tempErrors.name = "Name is required!";
    }

    if (!validateEmail(email)) {
      tempErrors.email = "Invalid email address!";
    }

    if (!validatePassword(password)) {
      tempErrors.password =
        "Password must be at least 6 characters long and include at least one uppercase letter and one number!";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setErrors({});

    createUser(email, password)
      .then(() => {
        toast.success("Successfully Signed Up!");
        navigate(`/`);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleGoogleSignUp = () => {
    handleGoogleAuth()
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const userData = { name: displayName, email, photo: photoURL };

        fetch("https://tutor-sphere-server-side.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }).catch(() => {
          // toast.error("Failed to add user to database");
        });

        navigate("/");
      })
      .catch((error) => {
          // console.log(error);
        toast.error("Google Sign-In failed");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="flex flex-col md:flex-row rounded-xl shadow-lg max-w-4xl overflow-hidden">
        <div className="md:w-1/2 w-full p-10">
          <form onSubmit={handleRegister} className="space-y-5">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-gray-500">Create your account to get started.</p>

            <div>
              <label className="block text-sm font-medium ">Full Name</label>
              <input
                type="text"
                name="name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium ">Profile Picture</label>
              <input
                type="text"
                name="photo"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Photo URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium ">Email</label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium ">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            onClick={handleGoogleSignUp}
            className="w-full mt-6 py-2 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
          >
            <FcGoogle className="mr-3" /> Sign Up with Google
          </button>

          <p className="text-center mt-6 ">
            Already have an account?{' '}
            <Link to="/signIn" className="text-blue-500 font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <div className="hidden md:flex md:w-1/2 bg-blue-500 items-center justify-center ">
          <div className="text-center">
            <h2 className="text-3xl text-white font-bold">Welcome to Equipify</h2>
            <p className="mt-4 text-gray-200 text-sm">
              Start managing and organizing your sports equipment efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
