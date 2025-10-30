import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import ThemeToggler from './../ThemeToggler/ThemeToggler';

function Navbar({ currentUser }) {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        // console.log("Sign-out successful.");
        toast.success("Sign-out successful.");
        navigate("/signIn");
      })
      .catch((error) => {
        // console.log("An error happened.", error);
        toast.error("An error happened.");
      });
  };

  const linkCenter = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-lg font-bold text-blue-500 hover:text-blue-600"
              : "text-lg hover:bg-blue-100  font-semibold hover:text-blue-500 hover:underline"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/findTutors/:category"
          className={({ isActive }) =>
            isActive
              ? "text-lg font-bold text-blue-500 hover:text-blue-600"
              : "text-lg hover:bg-blue-100  font-semibold hover:text-blue-500 hover:underline"
          }
        >
          Find Tutors
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addTutorial"
          className={({ isActive }) =>
            isActive
              ? "text-lg font-bold text-blue-500 hover:text-blue-600"
              : "text-lg hover:bg-blue-100  font-semibold hover:text-blue-500 hover:underline"
          }
        >
          Add Tutorial
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myTutorial"
          className={({ isActive }) =>
            isActive
              ? "text-lg font-bold text-blue-500 hover:text-blue-600"
              : "text-lg hover:bg-blue-100  font-semibold hover:text-blue-500 hover:underline"
          }
        >
          My Tutorial
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myBookedTutors"
          className={({ isActive }) =>
            isActive
              ? "text-lg font-bold text-blue-500 hover:text-blue-600"
              : "text-lg hover:bg-blue-100  font-semibold hover:text-blue-500 hover:underline"
          }
        >
          My Booked Tutors
        </NavLink>
      </li>
      <li>
        <p
        className="text-lg font-bold">
          <ThemeToggler></ThemeToggler>
        </p>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 shadow-2xl">
      <div className="navbar bg-base-100 xl:px-14 lg:px-7 shadow-2xl xl:py-4 py-2">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {linkCenter}
            </ul>
          </div>
          <a className="font-bold  text-2xl">TutorX</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{linkCenter}</ul>
        </div>
        <div className="navbar-end items-center space-x-1">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:bg-blue-600 relative group"
            >
              <div className="w-14 rounded-full">
                <img
                  src={
                    user?.photoURL ||
                    currentUser?.photo ||
                    "https://via.placeholder.com/150"
                  }
                  alt="User"
                />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[10px] px-3 py-1 text-sm font-medium text-white/80 rounded opacity-0 group-hover:opacity-100 transition">
                  {user?.displayName || currentUser?.name || "Guest User"}
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link>
                  {user?.displayName || currentUser?.name || "Guest User"}
                </Link>
              </li>
              <li>
                <Link to="#">Profile</Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                {/* <button onClick={handleSignOut}>Sign Out</button> */}
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="text-xl font-semibold underline transition text-blue-500 rounded-md py-1 px-3  border-blue-600 hover:bg-blue-100"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to={"/signIn"}
                    className="text-xl font-semibold underline transition text-blue-500  rounded-md py-1 px-3 border-blue-600 hover:bg-blue-100"
                  >
                    Sign In
                  </Link>
                )}
              </li>
            </ul>
          </div>
          {user ? (
            <button
              onClick={handleSignOut}
              className="text-xl font-semibold underline transition text-blue-500 border-2 rounded-md py-2 px-4 border-blue-600 hover:bg-blue-100"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to={"/signIn"}
              className="text-xl font-semibold underline transition text-blue-500 border-2 rounded-md py-2 px-4 border-blue-600 hover:bg-blue-100"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
