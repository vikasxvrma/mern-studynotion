import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CTAButton from "../HomePage/CTAButton";
import { apiConnector } from "../../../services/apiconnector";
import { contactusendpoints } from "../../../services/apis";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../slices/authSlice";
import { useNavigate } from "react-router-dom";

const countryCodedata = [
  {
    country: "India",
    code: "+91",
  },
  {
    country: "Afghanistan",
    code: "+93",
  },
  {
    country: "Albania",
    code: "+355",
  },
  {
    country: "Algeria",
    code: "+213",
  },
  {
    country: "Andorra",
    code: "+376",
  },
  {
    country: "Angola",
    code: "+244",
  },
  {
    country: "Antigua and Barbuda",
    code: "+1-268",
  },
  {
    country: "Argentina",
    code: "+54",
  },
  {
    country: "Armenia",
    code: "+374",
  },
  {
    country: "Australia",
    code: "+61",
  },
  {
    country: "Austria",
    code: "+43",
  },
  {
    country: "Azerbaijan",
    code: "+994",
  },
  {
    country: "Bahamas",
    code: "+1-242",
  },
  {
    country: "Bahrain",
    code: "+973",
  },
  {
    country: "Bangladesh",
    code: "+880",
  },
  {
    country: "Barbados",
    code: "+1-246",
  },
  {
    country: "Belarus",
    code: "+375",
  },
  {
    country: "Belgium",
    code: "+32",
  },
  {
    country: "Belize",
    code: "+501",
  },
  {
    country: "Benin",
    code: "+229",
  },
  {
    country: "Bhutan",
    code: "+975",
  },
  {
    country: "Bolivia",
    code: "+591",
  },
  {
    country: "Bosnia and Herzegovina",
    code: "+387",
  },
  {
    country: "Botswana",
    code: "+267",
  },
  {
    country: "Brazil",
    code: "+55",
  },
  {
    country: "Brunei",
    code: "+673",
  },
  {
    country: "Bulgaria",
    code: "+359",
  },
  {
    country: "Burkina Faso",
    code: "+226",
  },
  {
    country: "Burundi",
    code: "+257",
  },
  {
    country: "Cambodia",
    code: "+855",
  },
  {
    country: "Cameroon",
    code: "+237",
  },
  {
    country: "Canada",
    code: "+1",
  },
  {
    country: "Cape Verde",
    code: "+238",
  },
  {
    country: "Central African Republic",
    code: "+236",
  },
  {
    country: "Chad",
    code: "+235",
  },
  {
    country: "Chile",
    code: "+56",
  },
  {
    country: "China",
    code: "+86",
  },
  {
    country: "Colombia",
    code: "+57",
  },
  {
    country: "Comoros",
    code: "+269",
  },
  {
    country: "Congo",
    code: "+242",
  },
  {
    country: "Costa Rica",
    code: "+506",
  },
  {
    country: "Croatia",
    code: "+385",
  },
  {
    country: "Cuba",
    code: "+53",
  },
  {
    country: "Cyprus",
    code: "+357",
  },
  {
    country: "Czech Republic",
    code: "+420",
  },
  {
    country: "Denmark",
    code: "+45",
  },
  {
    country: "Djibouti",
    code: "+253",
  },
  {
    country: "Dominica",
    code: "+1-767",
  },
  {
    country: "Dominican Republic",
    code: "+1-809, +1-829, +1-849",
  },
  {
    country: "East Timor",
    code: "+670",
  },
  {
    country: "Ecuador",
    code: "+593",
  },
  {
    country: "Egypt",
    code: "+20",
  },
  {
    country: "El Salvador",
    code: "+503",
  },
  {
    country: "Equatorial Guinea",
    code: "+240",
  },
  {
    country: "Eritrea",
    code: "+291",
  },
  {
    country: "Estonia",
    code: "+372",
  },
  {
    country: "Ethiopia",
    code: "+251",
  },
  {
    country: "Fiji",
    code: "+679",
  },
  {
    country: "Finland",
    code: "+358",
  },
  {
    country: "France",
    code: "+33",
  },
  {
    country: "Gabon",
    code: "+241",
  },
  {
    country: "Gambia",
    code: "+220",
  },
  {
    country: "Georgia",
    code: "+995",
  },
  {
    country: "Germany",
    code: "+49",
  },
  {
    country: "Ghana",
    code: "+233",
  },
  {
    country: "Greece",
    code: "+30",
  },
  {
    country: "Grenada",
    code: "+1-473",
  },
  {
    country: "Guatemala",
    code: "+502",
  },
  {
    country: "Guinea",
    code: "+224",
  },
  {
    country: "Guinea-Bissau",
    code: "+245",
  },
  {
    country: "Guyana",
    code: "+592",
  },
  {
    country: "Haiti",
    code: "+509",
  },
  {
    country: "Honduras",
    code: "+504",
  },
  {
    country: "Hungary",
    code: "+36",
  },
  {
    country: "Iceland",
    code: "+354",
  },
  {
    country: "India",
    code: "+91",
  },
  {
    country: "Indonesia",
    code: "+62",
  },
  {
    country: "Iran",
    code: "+98",
  },
  {
    country: "Iraq",
    code: "+964",
  },
  {
    country: "Ireland",
    code: "+353",
  },
  {
    country: "Israel",
    code: "+972",
  },
  {
    country: "Italy",
    code: "+39",
  },
  {
    country: "Jamaica",
    code: "+1-876",
  },
  {
    country: "Japan",
    code: "+81",
  },
  {
    country: "Jordan",
    code: "+962",
  },
  {
    country: "Kazakhstan",
    code: "+7",
  },
  {
    country: "Kenya",
    code: "+254",
  },
  {
    country: "Kiribati",
    code: "+686",
  },
  {
    country: "Kosovo",
    code: "+383",
  },
  {
    country: "Kuwait",
    code: "+965",
  },
  {
    country: "Kyrgyzstan",
    code: "+996",
  },
  {
    country: "Laos",
    code: "+856",
  },
  {
    country: "Latvia",
    code: "+371",
  },
  {
    country: "Lebanon",
    code: "+961",
  },
  {
    country: "Lesotho",
    code: "+266",
  },
  {
    country: "Liberia",
    code: "+231",
  },
  {
    country: "Libya",
    code: "+218",
  },
  {
    country: "Liechtenstein",
    code: "+423",
  },
  {
    country: "Lithuania",
    code: "+370",
  },
  {
    country: "Luxembourg",
    code: "+352",
  },
  {
    country: "Macedonia",
    code: "+389",
  },
  {
    country: "Madagascar",
    code: "+261",
  },
  {
    country: "Malawi",
    code: "+265",
  },
  {
    country: "Malaysia",
    code: "+60",
  },
  {
    country: "Maldives",
    code: "+960",
  },
  {
    country: "Mali",
    code: "+223",
  },
  {
    country: "Malta",
    code: "+356",
  },
  {
    country: "Marshall Islands",
    code: "+692",
  },
  {
    country: "Mauritania",
    code: "+222",
  },
  {
    country: "Mauritius",
    code: "+230",
  },
  {
    country: "Mexico",
    code: "+52",
  },
  {
    country: "Micronesia",
    code: "+691",
  },
  {
    country: "Moldova",
    code: "+373",
  },
  {
    country: "Monaco",
    code: "+377",
  },
  {
    country: "Mongolia",
    code: "+976",
  },
  {
    country: "Montenegro",
    code: "+382",
  },
  {
    country: "Morocco",
    code: "+212",
  },
  {
    country: "Mozambique",
    code: "+258",
  },
  {
    country: "Myanmar",
    code: "+95",
  },
  {
    country: "Namibia",
    code: "+264",
  },
  {
    country: "Nauru",
    code: "+674",
  },
  {
    country: "Nepal",
    code: "+977",
  },
  {
    country: "Netherlands",
    code: "+31",
  },
  {
    country: "New Zealand",
    code: "+64",
  },
  {
    country: "Nicaragua",
    code: "+505",
  },
  {
    country: "Niger",
    code: "+227",
  },
  {
    country: "Nigeria",
    code: "+234",
  },
  {
    country: "North Korea",
    code: "+850",
  },
  {
    country: "Norway",
    code: "+47",
  },
  {
    country: "Oman",
    code: "+968",
  },
  {
    country: "Pakistan",
    code: "+92",
  },
  {
    country: "Palau",
    code: "+680",
  },
  {
    country: "Palestine",
    code: "+970",
  },
  {
    country: "Panama",
    code: "+507",
  },
  {
    country: "Papua New Guinea",
    code: "+675",
  },
  {
    country: "Paraguay",
    code: "+595",
  },
  {
    country: "Peru",
    code: "+51",
  },
  {
    country: "Philippines",
    code: "+63",
  },
  {
    country: "Poland",
    code: "+48",
  },
  {
    country: "Portugal",
    code: "+351",
  },
  {
    country: "Qatar",
    code: "+974",
  },
  {
    country: "Romania",
    code: "+40",
  },
  {
    country: "Russia",
    code: "+7",
  },
  {
    country: "Rwanda",
    code: "+250",
  },
  {
    country: "Saint Kitts and Nevis",
    code: "+1-869",
  },
  {
    country: "Saint Lucia",
    code: "+1-758",
  },
  {
    country: "Saint Vincent and the Grenadines",
    code: "+1-784",
  },
  {
    country: "Samoa",
    code: "+685",
  },
  {
    country: "San Marino",
    code: "+378",
  },
  {
    country: "Sao Tome and Principe",
    code: "+239",
  },
  {
    country: "Saudi Arabia",
    code: "+966",
  },
  {
    country: "Senegal",
    code: "+221",
  },
  {
    country: "Serbia",
    code: "+381",
  },
  {
    country: "Seychelles",
    code: "+248",
  },
  {
    country: "Sierra Leone",
    code: "+232",
  },
  {
    country: "Singapore",
    code: "+65",
  },
  {
    country: "Slovakia",
    code: "+421",
  },
  {
    country: "Slovenia",
    code: "+386",
  },
  {
    country: "Solomon Islands",
    code: "+677",
  },
  {
    country: "Somalia",
    code: "+252",
  },
  {
    country: "South Africa",
    code: "+27",
  },
  {
    country: "South Korea",
    code: "+82",
  },
  {
    country: "South Sudan",
    code: "+211",
  },
  {
    country: "Spain",
    code: "+34",
  },
  {
    country: "Sri Lanka",
    code: "+94",
  },
  {
    country: "Sudan",
    code: "+249",
  },
  {
    country: "Suriname",
    code: "+597",
  },
  {
    country: "Swaziland",
    code: "+268",
  },
  {
    country: "Sweden",
    code: "+46",
  },
  {
    country: "Switzerland",
    code: "+41",
  },
  {
    country: "Syria",
    code: "+963",
  },
  {
    country: "Taiwan",
    code: "+886",
  },
  {
    country: "Tajikistan",
    code: "+992",
  },
  {
    country: "Tanzania",
    code: "+255",
  },
  {
    country: "Thailand",
    code: "+66",
  },
  {
    country: "Togo",
    code: "+228",
  },
  {
    country: "Tonga",
    code: "+676",
  },
  {
    country: "Trinidad and Tobago",
    code: "+1-868",
  },
  {
    country: "Tunisia",
    code: "+216",
  },
  {
    country: "Turkey",
    code: "+90",
  },
  {
    country: "Turkmenistan",
    code: "+993",
  },
  {
    country: "Tuvalu",
    code: "+688",
  },
  {
    country: "Uganda",
    code: "+256",
  },
  {
    country: "Ukraine",
    code: "+380",
  },
  {
    country: "United Arab Emirates",
    code: "+971",
  },
  {
    country: "United Kingdom",
    code: "+44",
  },
  {
    country: "United States",
    code: "+1",
  },
  {
    country: "Uruguay",
    code: "+598",
  },
  {
    country: "Uzbekistan",
    code: "+998",
  },
  {
    country: "Vanuatu",
    code: "+678",
  },
  {
    country: "Vatican City",
    code: "+39-06, +379",
  },
  {
    country: "Venezuela",
    code: "+58",
  },
  {
    country: "Vietnam",
    code: "+84",
  },
  {
    country: "Yemen",
    code: "+967",
  },
  {
    country: "Zambia",
    code: "+260",
  },
  {
    country: "Zimbabwe",
    code: "+263",
  },
];

const ContactForm = () => {
  const navigate = useNavigate();
  // i am using common loader for whole
  const dispatch = useDispatch();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessfull },
  } = useForm();

  //    function when submit is clicked
  const submitFormHandle = async (data) => {
    dispatch(setLoading(true));
    const { email, firstName, lastName, phone, message } = data;
    console.log(data);
    try {
      const response = await apiConnector(
        "POST",
        contactusendpoints.CONTACTUS_API,
        { email, firstName, lastName, message, phonenumber: phone }
      );

      if (!response.data.success) {
        throw new Error("Error in contacting Us");
      }

      toast.success("You will be contacted Soon ");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (isSubmitSuccessfull) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        countryCode: "",
        phone: "",
      });
    }
  }, [reset, isSubmitSuccessfull]);

  return (
    <form
      onSubmit={handleSubmit(submitFormHandle)}
      className="flex flex-col gap-5 w-full mx-auto sm:w-10/12 lg:w-8/12"
    >
      {/* Names */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* First Name */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-white text-md">First Name</label>
          <input
            type="text"
            name="firstName"
            className="bg-richblack-800 p-3 rounded-md text-white"
            placeholder="Enter First Name"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && <span>please enter your first name </span>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-white text-md">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="bg-richblack-800 p-3 rounded-md text-white"
            placeholder="Enter Last Name"
            {...register("lastName")}
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="text-white text-md">
          Email Address <sup className="text-red-600">*</sup>
        </label>
        <input
          type="email"
          name="email"
          className="bg-richblack-800 p-3 w-full  rounded-md text-white"
          placeholder="xyz@gmail.com"
          {...register("email", { required: true })}
        />
        {errors.email && <span>please enter your email address </span>}
      </div>
      <div className="flex flex-col gap-2 ">
        <label className="text-white text-sm">Phone Number</label>
        <div className="flex justify-between gap-2">
          <select
            name="countryCode"
            className=" w-[150px] bg-richblack-800 px-3 py-3 text-white outline-none cursor-pointer"
            {...register("countryCode", { required: "true" })}
          >
            {errors.countryCode && <span>please select country code </span>}
            {countryCodedata.map((cont, index) => {
              return (
                <option className="" key={index} value={cont.code}>
                  {cont.country} {cont.code}
                </option>
              );
            })}
          </select>

          <input
            type="tel"
            name="phone"
            placeholder="9876543210"
            maxLength={10}
            className="bg-richblack-800 p-3 w-full rounded-md text-white"
            {...register("phone", { required: true })}
          />
          {errors.phone && <span>please enter your phone number </span>}
        </div>
      </div>

      <label htmlFor="message" className="text-white text-md">
        Message
      </label>

      <textarea
        name="message"
        rows={6} // or remove and use tailwind height
        className="bg-richblack-800 p-3 rounded-md text-white placeholder:text-richblack-400 
             resize-none min-h-[200px] outline-none"
        placeholder="Enter your message here..."
        {...register("message", { required: true, minLength: 5 })}
      ></textarea>
      {errors.message && <span>Please enter your message !!</span>}
      {/* SUBMIT */}
      <div className="w-full mx-auto sm:w-6/12">
        <CTAButton active={true} type="submit">
          <div className="min-w-[150px] mx-auto">Send Message </div>
        </CTAButton>
      </div>
    </form>
  );
};

export default ContactForm;
