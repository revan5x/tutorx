import React, { useContext } from "react";
import Navbar from "./../Components/Navbar/Navbar";
import { Outlet, useFetcher, useLoaderData } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import { AuthContext } from "../AuthProvider/AuthProvider";

function Layout() {
  const { user, loading } = useContext(AuthContext);
  const users = useLoaderData();
  // Loading or invalid data handling
  if (loading || !users || !Array.isArray(users)) {
    return (
      <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="relative flex items-center justify-center">
          <div class="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-dotted"></div>
          <div class="absolute inset-0 h-12 w-12 rounded-full border-4 border-gradient-to-r from-green-400 to-blue-500"></div>
        </div>
      </div>
    );
  }

  // Find the matched user
  const currentUser = users.find((u) => u.email === user?.email) || null;
  // console.log('hey Juabyer your current users', currentUser);
  return (
    <div>
      <Navbar currentUser={currentUser}></Navbar>
      <Outlet />
      <Footer></Footer>
    </div>
  );
}

export default Layout;
