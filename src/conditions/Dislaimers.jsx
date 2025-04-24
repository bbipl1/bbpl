import React from "react";

const Disclaimer = () => {
  return (
    <div className="p-6 w-full min-h-screen mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Disclaimer</h1>
      <p className="mb-4">
        The information provided on this website is for general informational purposes only. All information is provided in good faith, 
        however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, 
        reliability, availability, or completeness of any information on the site.
      </p>

      <h2 className="text-xl font-semibold mb-2">External Links Disclaimer</h2>
      <p className="mb-4">
        Our website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, 
        relevance, timeliness, or completeness of any information on these external websites.
      </p>

      <h2 className="text-xl font-semibold mb-2">Professional Advice Disclaimer</h2>
      <p className="mb-4">
        The information provided on this website is not intended as a substitute for professional advice. Always seek the advice of a qualified 
        professional before making any decisions based on the content available on our website.
      </p>

      <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
      <p className="mb-4">
        We shall not be held responsible for any damages or losses resulting from the use of our website or reliance on any information provided herein.
      </p>

      <h2 className="text-xl font-semibold mb-2">Changes to This Disclaimer</h2>
      <p className="mb-4">
        We reserve the right to modify this disclaimer at any time. Any updates will be posted on this page.
      </p>

      <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
      <p>
        If you have any questions about this disclaimer, please contact us at <strong>support@businessbasket.in </strong>.
      </p>
    </div>
  );
};

export default Disclaimer;
