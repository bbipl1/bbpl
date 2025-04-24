import React from 'react';

function Services() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600">Web Development</h3>
            <p className="text-gray-600 mt-2">We build responsive, user-friendly websites to help you grow your online presence.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600">Digital Marketing</h3>
            <p className="text-gray-600 mt-2">Our digital marketing strategies will help you reach your target audience effectively and grow your business.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600">Consulting</h3>
            <p className="text-gray-600 mt-2">We offer professional consulting services to help businesses with strategy, operations, and more.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
