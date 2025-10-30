import React from "react";

const FAQSection = () => {
  return (
    <div id="FAQSection" className="py-16 px-4 md:px-12 lg:px-20 ">
      <h2 className="text-center text-4xl mt-5 font-bold mb-10 ">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="faq-accordion" defaultChecked />
          <div className="collapse-title  text-xl font-medium">
            What is TutorX?
          </div>
          <div className="collapse-content">
            <p>
              TutorX is an online platform that connects students with
              expert tutors in various subjects, helping them achieve academic
              success through personalized guidance.
            </p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title  text-xl font-medium">
            How do I book a session with a tutor?
          </div>
          <div className="collapse-content">
            <p>
              Booking a session is simple. Sign up or log in to your account,
              browse through our list of expert tutors, and schedule a session
              at your convenience.
            </p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title  text-xl font-medium">
            Are the tutoring sessions personalized?
          </div>
          <div className="collapse-content">
            <p>
              Yes, our tutoring sessions are designed to meet the unique needs
              of each student, ensuring they receive tailored lessons and
              resources.
            </p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-xl  font-medium">
            What subjects do you offer tutoring in?
          </div>
          <div className="collapse-content">
            <p>
              We offer tutoring in a wide range of subjects including math,
              science, languages, and more. You can view all available subjects
              on our platform.
            </p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title  text-xl font-medium">
            How can I contact customer support?
          </div>
          <div className="collapse-content">
            <p>
              You can contact our customer support team anytime via email or
              live chat on our website. We are here to assist you 24/7.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
