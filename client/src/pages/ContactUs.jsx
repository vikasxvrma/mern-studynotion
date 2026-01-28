import React from "react";
import { BiChat } from "react-icons/bi";
import { FaEarthAfrica, FaPhone } from "react-icons/fa6";

import ContactForm from "../components/core/About/ContactForm";
import Footer from "../components/common/Footer";

const ContactUs = () => {
  return (
    <section className="w-full bg-richblack-900 overflow-x-hidden">
      <div className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* ================= LEFT INFO ================= */}
          <div className="flex flex-col bg-richblack-700 gap-6 rounded-lg px-6 py-6 w-full lg:w-[40%]">
            {/* Chat */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center text-lg sm:text-xl text-white font-semibold">
                <BiChat /> Chat with us
              </div>
              <p className="text-white text-sm opacity-70">
                Our friendly team is here to help.
              </p>
              <p className="text-white text-sm opacity-70">
                info@studynotion.com
              </p>
            </div>

            {/* Visit */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center text-lg sm:text-xl text-white font-semibold">
                <FaEarthAfrica /> Visit us
              </div>
              <p className="text-white text-sm opacity-70">
                Come and say hello at our office HQ.
              </p>
              <p className="text-white text-sm opacity-70">
                Akshya Nagar 1st Block 1st Cross,
                Rammurthy Nagar, Bangalore-560016
              </p>
            </div>

            {/* Call */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center text-lg sm:text-xl text-white font-semibold">
                <FaPhone /> Call us
              </div>
              <p className="text-white text-sm opacity-70">
                Mon – Fri, 8am to 5pm
              </p>
              <p className="text-white text-sm opacity-70">
                +123 456 7869
              </p>
            </div>
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="flex flex-col gap-6 px-6 py-6 border border-white/20 rounded-lg w-full lg:w-[60%]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold">
              Got an idea? We’ve got the skills.
              <br className="hidden sm:block" />
              Let’s team up
            </h2>

            <p className="text-sm sm:text-md text-white opacity-70">
              Tell us more about yourself and what you’ve got in mind.
            </p>

            <ContactForm />
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default ContactUs;
