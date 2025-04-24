import { useState } from "react";
import React from "react";

const initialState = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

const Contact = (props) => {
  const [submitText, setSubmitText] = useState("Submit");
  const [{ name, phone, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubmitText("Submit");
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverUrl = process.env.REACT_APP_SERVER_URL; // Fetch server URL from .env

    const requestData = { name, phone, email, message };

    try {
      const response = await fetch(`${serverUrl}/api/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log("Message sent successfully!");
        clearState();
        setSubmitText("Submitted successfully");
      } else {
        const phoneNumberLen = phone.length;
        if (phoneNumberLen !== 10) {
          alert("Please enter a valid phone Number");
        } else if (!(email.endsWith("com") || email.endsWith("in"))) {
          alert("Email is not valid.");
        }
        console.error("Failed to send message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <div id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="section-title  flex justify-items-center flex-col items-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-800">
              Get In Touch
            </h2>
            <p className="text-gray-600 mt-4">
              Please fill out the form below to send us an email, and we will
              get back to you as soon as possible.
            </p>
          </div>
          <div className="lg:flex lg:space-x-8 ">
            {/* Form Section */}
            <div className="lg:w-2/3 ">
              <form name="contactForm" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className="block text-gray-600 font-semibold mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter your name"
                      required
                      value={name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label
                      htmlFor="phone"
                      className="block text-gray-600 font-semibold mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter your phone number"
                      required
                      value={phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-group mt-6">
                  <label
                    htmlFor="email"
                    className="block text-gray-600 font-semibold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>

                {/* Message */}
                <div className="form-group mt-6">
                  <label
                    htmlFor="message"
                    className="block text-gray-600 font-semibold mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    rows="4"
                    placeholder="Enter your message"
                    required
                    value={message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                >
                  {submitText}
                </button>
              </form>
            </div>

            {/* Contact Info Section */}
            <div className="lg:w-1/3 my-6 flex justify-center items-start flex-col">
              <div className="contact-item">
                <h3 className="text-2xl my-2 font-semibold text-gray-800">
                  Contact Info
                </h3>
                <p className="text-gray-600">
                  <span className="font-semibold">Address:</span>{" "}
                  {props.data
                    ? props.data.address
                    : "vibhutikhand, gomti nagar lucknow"}
                </p>
              </div>
              <div className="contact-item">
                <p className="text-gray-600">
                  <span className="font-semibold">Phone:</span>{" "}
                  {props.data ? props.data.phone : "+91 75036 77953"}
                </p>
              </div>
              <div className="contact-item">
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span>{" "}
                  {props.data ? props.data.email : "Rakesh@businessbasket.in"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
