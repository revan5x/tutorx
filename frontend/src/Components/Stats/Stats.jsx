import React from "react";
import offer from "../../assets/stats/offer.png";
import review from "../../assets/stats/review.png";
import tutor from "../../assets/stats/tutor-image.png";
import users from "../../assets/stats/users.png";
function Stats() {
  // Static Data
  const tutorsCount = 120;
  const reviewsCount = 456;
  const languagesCount = 100;
  const activeUsersCount = 350;

  return (
    <div className=" w-full 2xl:w-11/12 xl:w-11/12 lg:w-11/12 my-16 mx-auto py-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 overflow-hidden px-5 md:px-0">
      {/* Tutors Count Card */}
      <div className="stat card hover:bg-blue-100/10 hover:shadow-xl shadow-lg p-6 rounded-2xl flex flex-col items-center justify-between border border-gray-200">
        <img src={tutor} alt="" />
        <div className=" text-xl font-semibold ">Total Tutors</div>
        <div className="stat-value text-3xl font-bold mt-2">{tutorsCount}+</div>
        <div className="  mt-2 truncate">Count of all registered tutors</div>
      </div>

      {/* Reviews Count Card */}
      <div className="stat card hover:bg-blue-100/10 hover:shadow-xl  shadow-lg p-6 rounded-2xl flex flex-col items-center justify-between border border-gray-200">
        <img src={review} alt="" />
        <div className=" text-xl font-semibold truncate">Total Reviews</div>
        <div className="stat-value text-3xl font-bold mt-2">
          {reviewsCount}+
        </div>
        <div className=" mt-2 truncate">↗︎ 100 (25%) increase in reviews</div>
      </div>

      {/* Languages Count Card */}
      <div className="stat card  hover:bg-blue-100/10 hover:shadow-xl shadow-lg p-6 rounded-2xl flex flex-col items-center justify-between border border-gray-200">
        <img src={offer} alt="" />
        <div className=" text-xl font-semibold truncate">Languages Offered</div>
        <div className="stat-value text-3xl font-bold mt-2">
          {languagesCount}+
        </div>
        <div className=" mt-2 truncate">
          Languages count available for courses
        </div>
      </div>

      {/* Active Users Count Card */}
      <div className="stat card hover:bg-blue-100/10 hover:shadow-xl  shadow-lg p-6 rounded-2xl flex flex-col items-center justify-between border border-gray-200">
        <img src={users} alt="" />
        <div className=" text-xl font-semibold truncate">Active Users</div>
        <div className="stat-value text-3xl font-bold mt-2">
          {activeUsersCount}+
        </div>
        <div className=" mt-2 truncate">
          ↗︎ 20 (5%) increase in active users
        </div>
      </div>
    </div>
  );
}

export default Stats;
