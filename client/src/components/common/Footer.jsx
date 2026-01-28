import React from "react";
import smlogo from "../../Asset/Logo/Logo-Small-Light.png";
import "../../App.css";

const Footer = () => {
  return (
    <footer className="w-full bg-richblack-800">
      <div className="w-11/12 sm:w-10/12 lg:w-9/12 mx-auto">

        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row gap-12 justify-between pt-12">
          
          {/* LEFT COLUMNS */}
          <div className="flex flex-col sm:flex-row gap-12">
            {/* Company */}
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <div className="flex gap-2 items-center justify-center sm:justify-start">
                <img src={smlogo} className="h-6" alt="logo" />
                <h3 className="text-white font-bold text-xl">StudyNotion</h3>
              </div>
              <p className="text-white">Company</p>
              <p className="footerLink">About</p>
              <p className="footerLink">Careers</p>
              <p className="footerLink">Affiliates</p>
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <p className="footerTitle">Resources</p>
              <p className="footerLink">Articles</p>
              <p className="footerLink">Chart Sheet</p>
              <p className="footerLink">Code Challenges</p>
              <p className="footerLink">Docs</p>
              <p className="footerLink">Projects</p>
              <p className="footerLink">Videos</p>
              <p className="footerLink">Workspaces</p>

              <p className="footerTitle mt-6">Support</p>
              <p className="footerLink">Help Centre</p>
            </div>

            {/* Plans */}
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <p className="footerTitle">Plans</p>
              <p className="footerLink">Paid memberships</p>
              <p className="footerLink">For students</p>
              <p className="footerLink">Business solutions</p>

              <p className="footerTitle mt-6">Community</p>
              <p className="footerLink">Forums</p>
              <p className="footerLink">Chapters</p>
              <p className="footerLink">Events</p>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="hidden lg:block w-[1px] bg-white opacity-10" />

          {/* RIGHT COLUMNS */}
          <div className="flex flex-col sm:flex-row gap-12 text-center sm:text-left">
            {/* Subjects */}
            <div className="flex flex-col gap-2">
              <p className="footerTitle">Subjects</p>
              <p className="footerLink">AI</p>
              <p className="footerLink">Cloud Computing</p>
              <p className="footerLink">Code Foundations</p>
              <p className="footerLink">Computer Science</p>
              <p className="footerLink">Cybersecurity</p>
              <p className="footerLink">Data Analytics</p>
              <p className="footerLink">Data Science</p>
              <p className="footerLink">Data Visualization</p>
              <p className="footerLink">Developer Tools</p>
              <p className="footerLink">DevOps</p>
              <p className="footerLink">Game Development</p>
              <p className="footerLink">Machine Learning</p>
              <p className="footerLink">Math</p>
              <p className="footerLink">Mobile Development</p>
              <p className="footerLink">Web Design</p>
              <p className="footerLink">Web Development</p>
            </div>

            {/* Languages */}
            <div className="flex flex-col gap-2">
              <p className="footerTitle">Languages</p>
              <p className="footerLink">Bash</p>
              <p className="footerLink">C++</p>
              <p className="footerLink">C#</p>
              <p className="footerLink">Go</p>
              <p className="footerLink">HTML & CSS</p>
              <p className="footerLink">Java</p>
              <p className="footerLink">JavaScript</p>
              <p className="footerLink">Kotlin</p>
              <p className="footerLink">PHP</p>
              <p className="footerLink">Python</p>
              <p className="footerLink">R</p>
              <p className="footerLink">SQL</p>
              <p className="footerLink">Swift</p>
            </div>

            {/* Career */}
            <div className="flex flex-col gap-2">
              <p className="footerTitle">Career Building</p>
              <p className="footerLink">Career Paths</p>
              <p className="footerLink">Career Services</p>
              <p className="footerLink">Interview Prep</p>
              <p className="footerLink">Professional Certification</p>
              <p className="footerLink">Full Catalog</p>
              <p className="footerLink">Beta Content</p>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-[1px] bg-white opacity-10 mt-10"></div>

        {/* BOTTOM BAR */}
        <div className="min-h-[120px] flex flex-col sm:flex-row justify-between items-center gap-4 py-6">
          <div className="flex flex-wrap gap-2 justify-center text-white opacity-30 text-sm">
            <p>Privacy Policy</p>
            <span>|</span>
            <p>Cookie Policy</p>
            <span>|</span>
            <p>Terms & Conditions</p>
          </div>

          <p className="text-white opacity-30 text-center text-sm">
            Made with <span className="opacity-100">❤️</span> VikasWorks © 2025 StudyNotion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
