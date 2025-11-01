import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-200 dark:from-gray-800 dark:to-gray-900 text-center">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-2xl max-w-md">
        <h1 className="text-8xl font-extrabold text-orange-500 dark:text-yellow-400 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Oops! You’re Lost!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Looks like you took a wrong turn. Don’t worry, it happens to the best
          of us.
        </p>
        <img
          src="https://celtathens.com/wp-content/uploads/2024/02/errors.jpg"
          alt="Funny Lost Robot"
          className="w-64 mx-auto mb-6"
        />
        <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-4">
          "Wait, where’s the internet?!" - Someone lost, probably you.
        </p>
        <Link
          to="/"
          className="bg-orange-500 hover:bg-orange-600 text-white dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-black font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
        >
          🏠 Take Me Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
