import React from "react";

const HowItWorks = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <div className="flex flex-col justify-center space-y-2 my-14">
        <p className="text-center font-semibold text-xl">How it Work</p>
        <h1 className="text-center font-bold text-4xl uppercase">
          Simple Steps to Academic Success
        </h1>
      </div>
      <ul className="timeline pb-14 timeline-vertical">
        <li>
          <div className="timeline-start timeline-box p-5 border rounded-lg">
            <div className="flex flex-wrap md:flex-nowrap items-center space-y-3 md:space-y-0 md:space-x-3">
              <div className="w-full md:w-3/4">
                <h1 className="text-end text-xl font-semibold text-yellow-500">
                  Book a Free Consultation
                </h1>
                <p>
                  Start by booking a free consultation to discuss your
                  educational needs and goals.
                </p>
              </div>
              <img
                className="w-16 h-16"
                src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-consultation-psychology-flaticons-flat-flat-icons.png"
                alt="Consultation"
              />
            </div>
          </div>
          <hr className="my-4" />
        </li>
        <li>
          <div className="timeline-end timeline-box p-5 border rounded-lg">
            <div className="flex flex-wrap md:flex-nowrap items-center space-y-3 md:space-y-0 md:space-x-3">
              <img
                className="w-20 h-20"
                src="https://img.icons8.com/plasticine/100/classroom.png"
                alt="Classroom"
              />
              <div className="w-full md:w-3/4">
                <h1 className="text-start text-xl font-semibold text-yellow-500">
                  Personalized Lesson Plan
                </h1>
                <p>
                  After the consultation, we'll create a tailored lesson plan
                  for you, outlining topics, timeline, and resources.
                </p>
              </div>
            </div>
          </div>
          <hr className="my-4" />
        </li>
        <li>
          <div className="timeline-start timeline-box p-5 border rounded-lg">
            <div className="flex flex-wrap md:flex-nowrap items-center space-y-3 md:space-y-0 md:space-x-3">
              <div className="w-full md:w-3/4">
                <h1 className="text-end text-xl font-semibold text-yellow-500">
                  Match with a Specialist
                </h1>
                <p>
                  We'll connect you with a subject expert to guide your learning
                  journey.
                </p>
              </div>
              <img
                className="w-12 h-12"
                src="https://img.icons8.com/color/48/pull-a-box-skin-type-5.png"
                alt="Specialist"
              />
            </div>
          </div>
          <hr className="my-4" />
        </li>
        <li>
          <div className="timeline-end timeline-box p-5 border rounded-lg">
            <div className="flex flex-wrap md:flex-nowrap items-center space-y-3 md:space-y-0 md:space-x-3">
              <img
                className="w-12 h-12"
                src="https://img.icons8.com/color/48/book-and-pencil.png"
                alt="Start Learning"
              />
              <div className="w-full md:w-3/4">
                <h1 className="text-start text-xl font-semibold text-yellow-500">
                  Start Learning
                </h1>
                <p>
                  Begin interactive and personalized tutoring sessions from the
                  comfort of your home.
                </p>
              </div>
            </div>
          </div>
          <hr className="my-4" />
        </li>
        <li>
          <div className="timeline-start timeline-box p-5 border rounded-lg">
            <div className="flex flex-wrap md:flex-nowrap items-center space-y-3 md:space-y-0 md:space-x-3">
              <div className="w-full md:w-3/4">
                <h1 className="text-end text-xl font-semibold text-yellow-500">
                  Ongoing Support
                </h1>
                <p>
                  Stay in touch with your tutor for prompt clarifications and
                  support.
                </p>
              </div>
              <img
                className="w-16 h-16"
                src="https://img.icons8.com/arcade/64/helping.png"
                alt="Helping"
              />
            </div>
          </div>
          <hr className="my-4" />
        </li>
        <li>
          <div className="timeline-end timeline-box p-5 border rounded-lg">
            <div className="flex flex-wrap md:flex-nowrap items-center space-y-3 md:space-y-0 md:space-x-3">
              <img
                className="w-20 h-20"
                src="https://img.icons8.com/plasticine/100/favorite-window.png"
                alt="Review & Improve"
              />
              <div className="w-full md:w-3/4">
                <h1 className="text-start text-xl font-semibold text-yellow-500">
                  Review & Improve
                </h1>
                <p>
                  Share feedback to help us enhance our services and support
                  your educational journey.
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HowItWorks;
