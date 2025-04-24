import React, { useEffect, useState } from "react";
import ImageSlider from "../../components/ImageSlider";
import ShowQR from "./ShowQR";
import { X } from "lucide-react";
import { header } from "framer-motion/client";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Trash2 } from "lucide-react";

const serverURL = process.env.REACT_APP_SERVER_URL;

const ShowProRepInDetail = ({ report, isOpen, open }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ssURLS, SetSSURLS] = useState([]);
  const [workProgressPhotosURLS, SetWorkProgressPhotosURLS] = useState([]);
  const [workProgressVideosURLS, SetworkProgressVideosURLS] = useState([]);
  const [isQROpen, setIsQROpen] = useState(false);
  const [QRURL, SetQRURL] = useState(false);
  const [deleted,setDeleted]=useState(0);

  useEffect(() => {
    const ssurls = report?.paymentScreenshots?.map((ss) => ss?.url);
    SetSSURLS(ssurls ? ssurls : []);
    const wppurls = report?.photos?.map((ss) => ss?.url);
    SetWorkProgressPhotosURLS(wppurls ? wppurls : []);
    const wpvurls = report?.videos?.map((ss) => ss?.url);
    SetworkProgressVideosURLS(wpvurls ? wpvurls : []);
    // console.log("ss", ssurls);
  }, [report,deleted]);

  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No data available to display.</p>
      </div>
    );
  }

  // console.log(report);

  //handle delete all details

  const handleDelete = () => {
    const userRes = window.confirm(
      "Are you sure? All data will be deleted permanently."
    );
    if (!userRes) {
      return;
    }
    // alert("Coming soon");
    setIsLoading(true);

    const id = report._id;
    if (!id) {
      return alert("Document is not found to delete.");
    }
    const url = `${serverURL}/api/constructions/site-engineers/delete-daily-progress-report?id=${id}`;
    const header = {
      header: "application/json",
    };

    axios
      .delete(url, header)
      .then((res) => {
        console.log(res);
        alert(res?.data?.message);
        setDeleted(deleted+1);
      })
      .catch((err) => {
        alert(err?.response?.data?.message);
      })
      .finally((final) => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full h-100 absolute top-24 md:top-16 lg:top-12 mx-auto my-8 p-6 bg-white shadow-lg rounded-lg ">
      <div className="flex  items-center justify-end">
        {isLoading && (
          <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-opacity-80 bg-slate-500 flex justify-center items-center ">
            <div>
              <ClipLoader color="#ffffff" loading={isLoading} size={50} />
            </div>
          </div>
        )}
        <button
          onClick={handleDelete}
          className="m-2 p-1 text-red-600 rounded-lg hover:text-red-700 "
        >
          <Trash2 size={32}/>
        </button>
        <button
          onClick={() => {
            isOpen(false);
          }}
          className="text-red-600  font-bold "
        >
          <X className="mx-auto" size={32} />
        </button>
      </div>
      {isQROpen && (
        <>
          <ShowQR item={report} isQROpen={setIsQROpen} url={QRURL} />
        </>
      )}
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
            {Number(report.expenses.required) - Number(report.expenses.received)} /-
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
      <div className="w-full grid grid-cols-4 gap-1">
        <div className="">
          <h2 className="font-bold text-lg text-gray-600 text-center">QR </h2>
          <img
            onClick={() => {
              setIsQROpen(true);
              SetQRURL(report?.expenses?.qrURL);
            }}
            className="w-96 h-96 mt-6 border-2 border-blue-100"
            src={report?.expenses?.qrURL}
            alt=""
          />
        </div>
        <div className="w-full">
          <h2 className="font-bold text-lg text-gray-600 text-center mb-6 ">
            Payment Screenshots
          </h2>
          {/* <img className="w-96 h-96 mt-6" src={report?.paymentScreenshots[0]?.url} alt="" /> */}
          <ImageSlider
            styles={`w-96 h-96 object-cover rounded-lg shadow-lg`}
            urls={ssURLS}
          />
        </div>
        <div className="w-full">
          <h2 className="font-bold text-lg text-gray-600 text-center mb-6">
            Progress Report Images
          </h2>
          {/* <img className="w-96 h-96 mt-6" src={report?.photos[0]?.url} alt="" /> */}
          <ImageSlider
            styles={`w-96 h-96 object-cover rounded-lg shadow-lg`}
            urls={workProgressPhotosURLS}
          />
        </div>
        <div className="w-full">
          <h2 className="font-bold text-lg text-gray-600 text-center mb-6">
            Progress Report Videoes
          </h2>
          {/* <video autoPlay muted className="w-96 h-96 mt-6" src={report?.videos[0]?.url} alt="" /> */}
          <ImageSlider
            styles={`w-96 h-96 object-cover rounded-lg shadow-lg`}
            urls={workProgressVideosURLS}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowProRepInDetail;
