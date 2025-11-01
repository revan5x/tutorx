import React, { useContext } from "react";
import Bannar from "./../../Components/Bannar/Bannar";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

import Stats from './../../Components/Stats/Stats';
import TopTutors from './../../Components/TopTutors/TopTutors';
import Testimonials from './../../Components/Testimonial/Testimonials';
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import FAQSection from "../../Components/FAQSection/FAQSection";
import ContactUs from "../../Components/ContactUs/ContactUs";

function Home() {
  const { loading } = useContext(AuthContext);
  const languegesCategory = useLoaderData();
  if (loading || !languegesCategory || !Array.isArray(languegesCategory)) {
    return (
      <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="relative flex items-center justify-center">
          <div class="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-dotted"></div>
        </div>
      </div>
    );
  }
  // console.log(languegesCategory);
  return (
    <div className="min-h-screen">
      <Bannar></Bannar>
      <Stats></Stats>
     
      <TopTutors></TopTutors>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
      <ContactUs></ContactUs>
      <FAQSection></FAQSection>
    </div>
  );
}

export default Home;
