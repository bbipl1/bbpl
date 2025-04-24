
import React, { useEffect, useState } from "react";
import ImageSlider from "../../../../../components/ImageSlider";
import ShowQR from "../../../../admin/ShowQR";
import { X } from "lucide-react";

const ShowReportDetails = ({ report, isOpen, open }) => {
  const [ssURLS, SetSSURLS] = useState([]);
  const [workProgressPhotosURLS, SetWorkProgressPhotosURLS] = useState([]);
  const [workProgressVideosURLS, SetworkProgressVideosURLS] = useState([]);
  const [isQROpen, setIsQROpen] = useState(false);
  const [QRURL,SetQRURL]=useState(false);

  useEffect(() => {
    const ssurls = report?.paymentScreenshots?.map((ss) => ss?.url);
    SetSSURLS(ssurls ? ssurls : []);
    const wppurls = report?.photos?.map((ss) => ss?.url);
    SetWorkProgressPhotosURLS(wppurls ? wppurls : []);
    const wpvurls = report?.videos?.map((ss) => ss?.url);
    SetworkProgressVideosURLS(wpvurls ? wpvurls : []);
    console.log("ss", ssurls);
  }, [report]);

  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No data available to display.</p>
      </div>
    );
  }

  console.log(report);

  return (
    <div className="w-full h-100 absolute top-24 md:top-16 lg:top-12 mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
       
      <button
        onClick={() => {
          isOpen(false);
        }}
        className="  absolute right-0 mr-4 md:mr-8 lg:mr-12 w-12 bg-red-200 hover:bg-red-300 text-red-600 p-2 rounded-md border-2 border-red-400 font-bold text-lg"
      >
        <X className="mx-auto" size={24} />
      </button>
      {/* {isQROpen && (
        <>
          <ShowQR item={report} isQROpen={setIsQROpen}  url={QRURL}/>
        </>
      )} */}
      <h1 className="text-2xl font-bold mb-4 text-gray-700 text-center">
        Daily Progress Report
      </h1>
      <hr />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
        {/* General Info */}
        <div>
          <h2 className="font-bold text-lg text-gray-600">General Info</h2>
          <p>ID: {report.id}</p>
          <p>Name: {report.name}</p>
          <p>Site Name: {report.siteName}</p>
          <p>Work Type: {report.workType}</p>
        </div>

        <div className="">
          <h2 className="font-bold text-lg text-gray-600">Date & Time</h2>
          <p className="mt-2">Date: {report.date}</p>
          <p>Time: {report.time}</p>
          <p>Day: {report.day}</p>
        </div>

        {/* Today's Work */}
        <div>
          <h2 className="font-bold text-lg text-gray-600">Today's Work</h2>
          <ul className="list-disc list-inside">
            {report.todaysWork?.map((work, index) => (
              <li key={index}>{work}</li>
            ))}
          </ul>
        </div>

        {/* Expenses */}
        <div>
          <h2 className="font-bold text-lg text-gray-600">Expenses</h2>
          <p>Category: {report.expenses.Category?.join(", ") || "N/A"}</p>
          <p>Required Amount: RS {report.expenses.required} /-</p>
          <p>Received Amount: RS {report.expenses.received || "N/A"} /-</p>
          <p>
            pending Amount: RS{" "}
            {report.expenses.required - report.expenses.received || "N/A"} /-
          </p>
          <p className=" mt-1">
          Status:{" "}
          <span
            className={`${
              report.expenses.status === "Paid"
                ? "text-green-500"
                : report.expenses.status === "PartialPaid"
                ? "text-blue-500"
                : "text-red-500"
            }`}
          >
            {report.expenses.status}
          </span>
        </p>
        </div>

        {/* Machinery Used */}
        <div>
          <h2 className="font-bold text-lg text-gray-600">Machinery Used</h2>
          <ul className="list-disc list-inside mt-2">
            {report.machinaryUsed?.map((machinery, index) => (
              <li key={index}>{machinery}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Date & Time */}

      <div className=" mt-8">
        
        <h2 className="font-semibold text-lg text-gray-600">Remarks</h2>
        <ul className=" ">
          <p>{report.remarks}</p>
        </ul>
      </div>

      {/* <hr /> */}
      <div className="w-full flex flex-col md:flex-col lg:flex-row justify-center align-center gap-1 mt-8">
        <div className="w-full lg:w-1/4">
          <h2 className="font-bold text-lg text-gray-600 text-center">QR </h2>
          <img onClick={()=>{  setIsQROpen(true);SetQRURL(report?.expenses?.qrURL)}} className="w-96 h-96 mt-6 border-2 border-blue-100" src={report?.expenses?.qrURL} alt="" />
        </div>
        <div className="w-full lg:w-1/4">
          <h2 className="font-bold text-lg text-gray-600 text-center mb-6 ">
            Payment Screenshots
          </h2>
          {/* <img className="w-96 h-96 mt-6" src={report?.paymentScreenshots[0]?.url} alt="" /> */}
          {/* <ImageSlider w={96} h={96} urls={ssURLS} /> */}
           <ImageSlider styles={`w-96 h-96 object-cover rounded-lg shadow-lg`} urls={ssURLS} />
        </div>
        <div className="w-full lg:w-1/4">
          <h2 className="font-bold text-lg text-gray-600 text-center mb-6">
            Progress Report Images
          </h2>
          {/* <img className="w-96 h-96 mt-6" src={report?.photos[0]?.url} alt="" /> */}
          {/* <ImageSlider w={96} h={96} urls={workProgressPhotosURLS} /> */}
           <ImageSlider styles={`w-96 h-96 object-cover rounded-lg shadow-lg`} urls={workProgressPhotosURLS} />
        </div>
        <div className="w-full lg:w-1/4">
          <h2 className="font-bold text-lg text-gray-600 text-center mb-6">
            Progress Report Videoes
          </h2>
          {/* <video autoPlay muted className="w-96 h-96 mt-6" src={report?.videos[0]?.url} alt="" /> */}
           <ImageSlider styles={`w-96 h-96 object-cover rounded-lg shadow-lg`} urls={workProgressVideosURLS} />
        </div>
      </div>
     
    </div>
  );
};

export default ShowReportDetails;
