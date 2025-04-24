import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="p-6 w-full min-h-screen mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        This Privacy Policy explains how we collect, use, store, and protect your personal data.
      </p>

      <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Name</li>
        <li>Email Address</li>
        <li>Phone Number</li>
        <li>Aadhaar Number</li>
        <li>PAN Card Details</li>
        <li>Personal Photos</li>
        <li>Other Photos and Videos</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
      <p className="mb-4">
        We use the collected data to provide and improve our services, communicate with you, ensure security, and comply with legal obligations.
      </p>

      <h2 className="text-xl font-semibold mb-2">Data Protection</h2>
      <p className="mb-4">
        We implement security measures to protect your data. However, no method of transmission over the Internet is 100% secure.
      </p>

      <h2 className="text-xl font-semibold mb-2">Third-Party Sharing</h2>
      <p className="mb-4">
        We do not share your personal information with third parties except as required by law or with your explicit consent.
      </p>

      <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal data. Contact us for any requests.
      </p>

      <h2 className="text-xl font-semibold mb-2">Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be posted on this page.
      </p>

      <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
      <p>
        If you have any questions, please contact us at <strong>support@businessbasket.in </strong>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
