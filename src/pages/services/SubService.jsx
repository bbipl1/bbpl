// import React from 'react';
// import { useParams } from 'react-router-dom';

// const serviceDetails = {
//   development: {
//     title: 'Development Services',
//     items: ['Web Development', 'Software Design', 'Application Development'],
//   },
//   finance: {
//     title: 'Finance',
//     items: ['Home Loan', 'Personal Loan', 'Car Loan', 'Business Loan', 'Credit Card Services'],
//   },
//   civil: {
//     title: 'Civil',
//     items: ['Construction Work'],
//   },
// };

// const ServiceDetail = () => {
//   const { serviceId } = useParams();
//   const service = serviceDetails[serviceId];

// //   if (!service) {
// //     return <div className="text-center text-red-500">Service not found!</div>;
// //   }

//   return (
//     <div className="p-8">
//       <h1 className="text-4xl font-bold text-blue-600">{service?.title}</h1>
//       {/* <ul className="mt-4 list-disc pl-6 text-gray-100">
//         {service?.items?.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul> */}
//     </div>
//   );
// };

// export default ServiceDetail;
