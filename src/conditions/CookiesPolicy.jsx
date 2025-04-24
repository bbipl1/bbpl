import React from "react";

const CookiesPolicy = () => {
  return (
    <div className="p-6 w-full min-h-screen mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Cookies Policy</h1>
      <p className="mb-4">
        This Cookies Policy explains how we use cookies and similar technologies to recognize you when you visit our website. 
        It explains what these technologies are and why we use them, as well as your rights to control their use.
      </p>

      <h2 className="text-xl font-semibold mb-2">What Are Cookies?</h2>
      <p className="mb-4">
        Cookies are small data files that are placed on your device when you visit a website. They help us understand user behavior 
        and improve our services.
      </p>

      <h2 className="text-xl font-semibold mb-2">How We Use Cookies</h2>
      <p className="mb-4">
        We use cookies to enhance your experience by:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Recognizing when you return to our website</li>
        <li>Understanding how you interact with our content</li>
        <li>Improving website performance and security</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Types of Cookies We Use</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Essential Cookies:</strong> Necessary for website functionality.</li>
        {/* <li><strong>Analytics Cookies:</strong> Help us understand user behavior.</li> */}
        {/* <li><strong>Marketing Cookies:</strong> Used for advertising purposes.</li> */}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Managing Cookies</h2>
      <p className="mb-4">
        You have the right to accept or reject cookies. Most browsers allow you to control cookies through their settings.
      </p>

      <h2 className="text-xl font-semibold mb-2">Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Cookies Policy from time to time. Any changes will be posted on this page.
      </p>

      <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
      <p>
        If you have any questions about our Cookies Policy, please contact us at <strong>support@businessbasket.in </strong>
      </p>
    </div>
  );
};

export default CookiesPolicy;
