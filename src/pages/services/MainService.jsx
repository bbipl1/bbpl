import React, { useState } from 'react';
import developmentImage from '../../assets/services/Development.jpg';
import financeImage from '../../assets/services/finance.jpg';
import civilImage from '../../assets/services/construction.jpg';
import webDevImage from '../../assets/services/webDevelopment.jpg';
import softwareDesignImage from '../../assets/services/softwareDesign.jpg';
import appDevImage from '../../assets/services/applicationdevelopment.png';
import homeLoanImage from '../../assets/services/homeloan.jpg';
import personalLoanImage from '../../assets/services/personalloan.jpg';
import carLoanImage from '../../assets/services/carloan.jpg';
import constructionImage from '../../assets/services/constructionServices.jpg';
import buttonLoanImage from '../../assets/services/busisnessLoan.jpg';
import creditCardImage from '../../assets/services/creditcard.jpg';

const ServicesPage = () => {
    const [selectedService, setSelectedService] = useState(null);
  
    const services = [
      {
        id: 'development',
        title: 'Development Services',
        imageUrl: developmentImage,
        items: [
          { title: 'Web Development', imageUrl: webDevImage },
          { title: 'Software Design', imageUrl: softwareDesignImage },
          { title: 'Application Development', imageUrl: appDevImage },
        ],
      },
      {
        id: 'finance',
        title: 'Financial Services',
        imageUrl: financeImage,
        items: [
          { title: 'Home Loan', imageUrl: homeLoanImage },
          { title: 'Personal Loan', imageUrl: personalLoanImage },
          { title: 'Car Loan', imageUrl: carLoanImage },
          { title: 'Business Loan', imageUrl: buttonLoanImage },
          { title: 'Credit Card Services', imageUrl: creditCardImage },
        ],
      },
      {
        id: 'civil',
        title: 'Construction Services',
        imageUrl: civilImage,
        items: [
          { title: 'Construction Work', imageUrl: constructionImage },
        ],
      },
    ];
  
    const handleServiceClick = (service) => {
      setSelectedService(service);
    };
  
    const goBack = () => {
      setSelectedService(null);
    };
  
    return (
      <div className="bg-white py-20">
        {!selectedService ? (
          <>
            {/* Hero Section */}
            {/* <section className="text-center  sm:py-20 bg-gray-800 text-white">
              <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 sm:mb-6">Welcome to Our Services</h1>
              <p className="text-base sm:text-xl max-w-lg sm:max-w-2xl mx-auto mb-6 sm:mb-8">
                Discover a wide range of professional services tailored to meet your needs. Explore, choose, and connect with us.
              </p>
            </section> */}
  
            {/* Services Section */}
            {/* <div className='mt-10 bg-gray-100'>

            </div> */}
            <section className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  className="bg-white shadow-xl rounded-lg p-4 sm:p-6 transition-transform transform hover:scale-105 hover:shadow-2xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-40 sm:h-52 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-blue-600 border-b-2 border-blue-300">
                    {service.title}
                  </h2>
                </div>
              ))}
            </section>
          </>
        ) : (
          <>
            {/* Sub-Service Section */}
            <div className="p-4 sm:p-6 bg-white  shadow-lg rounded-lg mb-6 border border-spacing-1 m-2">
              <h2 className="text-2xl sm:text-4xl font-bold text-black mb-4">{selectedService.title}</h2>
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {selectedService.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-xl rounded-lg p-4 sm:p-6 transition-transform transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-40 sm:h-52 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-base sm:text-xl font-semibold text-gray-800">{item.title}</h3>
                  </div>
                ))}
              </section>
              <button
                onClick={goBack}
                className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600  text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
              >
                Go Back
              </button>
            </div>
          </>
        )}
  
       
      </div>
    );
  };
  
  export default ServicesPage;