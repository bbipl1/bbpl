import axios from "axios";
import React, { useEffect, useState } from "react";
import { X,PencilIcon,EyeIcon } from "lucide-react";
import UpdatePaymentReceivedFromClient from "./update/UpdatePaymentReceivedFromClient";
import UpdatePaymentReceivedFromCompany from "./update/UpdatePaymentReceivedFromCompany";
import UploadPaymentReceipt from "./update/UploadPaymentReceipt";
import UploadWorkProgressPhotoOrVideo from "./update/UploadWorkProgressPhotoOrVideo";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const ShowAllForms = ({ siteEngineerId }) => {
  const [allForms, setAllForms] = useState();
  const [id, setId] = useState();
  const [viewHdd, setViewHdd] = useState(null);
  const [viewUpdate, setViewUpdate] = useState(false);
  const [viewUpdateFormId, setViewUpdateFormId] = useState(null);

  useEffect(() => {
    if (id) {
      const url = `${serverUrl}/api/constructions/site-engineers/get-hdd-forms?id=${id}`;

      const header = {
        header: "application/json",
      };
      axios
        .get(url, header)
        .then((res) => {
          console.log("res", res.data.data);
          setAllForms(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  useEffect(() => {
    console.log(siteEngineerId.id);
    setId(siteEngineerId.id);
  }, [siteEngineerId]);

  const viewSingleHDD = (hdd) => {
    let totalExp = 0;
    let totalMtrBill = 0;

    totalExp = hdd?.expenses?.reduce((acc, hd) => {
      return acc + Number(hd?.value);
    }, 0);

    totalMtrBill = hdd?.hddDetails?.reduce((acc, hd) => {
      return acc + Number(hd.rate) * Number(hd.meter);
    }, 0);

    return (
      <div className="fixed left-0 top-24 w-full h-full bg-slate-100 p-8">
        <div className="flex flex-row justify-end relative">
          <div className=" absolute left-0 top-8  w-full flex justify-center items-center ">
            <p className="text-xl font-bold"> HDD Form Details.</p>
          </div>

          <div onClick={() => setViewHdd(null)}>
            <X
              className="m-1 bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer"
              size={32}
            />
          </div>
        </div>
        <div className="mt-8">
          {hdd && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="mb-4">
                  <h1 className="text-lg font-bold">General details.</h1>
                  <p>Name: {hdd?.siteEngObjId?.siteEngObjId?.name}</p>
                  <p>Date: {hdd?.date}</p>
                  <p>
                    Payment received from company:{" "}
                    {hdd?.paymentReceivedFromCompany?.companyName}
                  </p>
                  <p>
                    Payment received amount: Rs.
                    {hdd?.paymentReceivedFromCompany?.amount}/-
                  </p>
                  <p>
                    Payment done by: {hdd?.paymentReceivedFromCompany?.paidBy}
                  </p>
                  <p>
                    Date of Requirement (YYYY-MM-DD): {hdd?.dateOfRequirements}
                  </p>
                  <p>
                    Client Name: {hdd?.paymentReceivedFromClient?.clientName}
                  </p>
                  <p>
                    Payment received from client:{" "}
                    {hdd?.paymentReceivedFromClient?.amount}
                  </p>
                  <p className="font-bold">Remarks: {hdd?.remarks}</p>
                </div>

                <div className="mb-4">
                  {hdd?.hddDetails.length > 0 ? (
                    <>
                      <div>
                        <h1 className="text-lg font-bold">
                          HDD machine used details.
                        </h1>
                        <table>
                          <thead>
                            <tr>
                              <th className="border-2 p-1">S/R</th>
                              <th className="border-2 p-1">Diameter (mtr)</th>
                              <th className="border-2 p-1">Length (mtr)</th>
                              <th className="border-2 p-1">Rate/mtr (INR)</th>
                              <th className="border-2 p-1">Total Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {hdd &&
                              hdd.hddDetails &&
                              hdd.hddDetails.map((hd, ind) => {
                                return (
                                  <tr>
                                    <td className="border-2 p-1">{++ind}</td>
                                    <td className="border-2 p-1">{hd?.dia}</td>
                                    <td className="border-2 p-1">
                                      {hd?.meter}
                                    </td>
                                    <td className="border-2 p-1">{hd?.rate}</td>
                                    <td className="border-2 p-1">
                                      Rs.{Number(hd?.meter) * Number(hd?.rate)}
                                      /-
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        <h1 className="font-bold">
                          Total amount: Rs.{totalMtrBill}/-
                        </h1>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p>HDD meter data is not available.</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="mb-4">
                  {hdd?.hddDetails.length > 0 ? (
                    <>
                      <div className="">
                        <div>
                          <h1 className="text-lg font-bold">Expenses.</h1>
                          {hdd &&
                            hdd.expenses &&
                            hdd.expenses.map((exp, ind) => {
                              return (
                                <>
                                  <div>
                                    <p>
                                      {++ind}) {exp?.name}: Rs.{exp?.value}/-
                                    </p>
                                  </div>
                                </>
                              );
                            })}
                          <h1 className="font-bold">
                            Total expenses: Rs.{totalExp}/-
                          </h1>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p>HDD meter data is not available.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const viewUpdateForm = (docId, close) => {
    return (
      <>
        <div className="fixed left-0 top-0 bg-cyan-50  w-screen h-screen z-50 pt-12 overflow-y-auto">
          <div className="w-full absolute left-0 top-0 flex justify-end mr-12 my-4">
            <button
              onClick={() => {
                setViewUpdate(false);
              }}
              className="m-1 p-1 w-24 text-red-500 hover:text-red-600 rounded-md"
            >
              <X size={32}/>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="">
              <UpdatePaymentReceivedFromClient docId={viewUpdateFormId} />
            </div>
            <div>
              <UpdatePaymentReceivedFromCompany docId={viewUpdateFormId} />
            </div>
            <div className="w-full my-8">
              <div className="w-full flex justify-center">
                <h1 className="text-xl font-bold mb-4">Upload files here</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                <div>
                  <UploadPaymentReceipt docId={docId} />
                </div>
                <div>
                  <UploadWorkProgressPhotoOrVideo docId={docId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="w-full">
      {viewHdd && viewSingleHDD(viewHdd)}
      {viewUpdate && viewUpdateForm(viewUpdateFormId)}
      {allForms && Array.isArray(allForms) ? (
        <>
          <div className="w-full">
            <div></div>
            <div className="w-full overflow-x-auto">
              <table className="w-full border-2 border-gray-100">
                <thead className="w-full">
                  <tr>
                    <th className="border-2 p-1">Date of work</th>
                    <th className="border-2 p-1"> Client name</th>
                    <th className="border-2 p-1"> Site name</th>
                    <th className="border-2 p-1">DIA (mtr)</th>
                    <th className="border-2 p-1">Rate/mtr (INR)</th>
                    <th className="border-2 p-1">Length (mtr)</th>
                    <th className="border-2 p-1">Total Amount (INR)</th>
                    <th className="border-2 p-1">Expenses</th>
                    <th className="border-2 p-1">
                      Payment received from BBIPL
                    </th>
                    <th className="border-2 p-1">
                      {" "}
                      Amount received from client
                    </th>
                    <th className="border-2 p-1">Remarks</th>
                    <th className="border-2 p-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allForms?.map((expense, i) => {
                    return (
                      <>
                        <tr
                          className={`w-full ${
                            i % 2 === 0 ? "bg-white" : "bg-blue-50"
                          }`}
                        >
                          {/* <td className="border-2 p-1">{expense?.date}</td> */}
                          {/* <td className="border-2 p-1">
                            {expense?.siteEngObjId?.siteEngObjId?.name}
                          </td> */}
                          <td className="border-2 p-1">
                            {expense?.dateOfRequirements}
                          </td>
                          <td className="border-2 p-1">
                            {expense?.paymentReceivedFromClient?.clientName}
                          </td>
                          <td className="border-2 p-1">{expense?.siteName}</td>
                          <td className="border-2">
                            {expense &&
                              expense?.hddDetails?.map((ex, ind) => {
                                return (
                                  <>
                                    <p className="flex justify-start border-b-2">
                                      {++ind}) {ex.dia}
                                    </p>
                                    {/* <hr className="bg-gray-600 w-full "/> */}
                                  </>
                                );
                              })}
                          </td>
                          <td className="border-2">
                            {expense &&
                              expense?.hddDetails?.map((ex, ind) => {
                                return (
                                  <>
                                    <p className="flex justify-start pl-4  border-b-2">
                                      {ex.meter}
                                    </p>
                                  </>
                                );
                              })}
                          </td>
                          <td className="border-2">
                            {expense &&
                              expense?.hddDetails?.map((ex, ind) => {
                                return (
                                  <>
                                    <p className="flex justify-start pl-4  border-b-2">
                                      {ex.rate}
                                    </p>
                                  </>
                                );
                              })}
                          </td>

                          <td className="border-2">
                            {expense &&
                              expense?.hddDetails?.map((ex, ind) => {
                                return (
                                  <>
                                    <p className="flex justify-start pl-4 border-b-2">
                                      RS. {Number(ex.rate) * Number(ex.meter)}/-
                                    </p>
                                  </>
                                );
                              })}
                          </td>

                          <td className="border-2 p-1">
                            {expense?.expenses?.map((ex) => {
                              return (
                                <>
                                  <p>
                                    {ex.name}: {ex.value}
                                  </p>
                                </>
                              );
                            })}
                          </td>

                          <td className="border-2 p-1">
                            {expense?.paymentReceivedFromCompany?.amount}
                          </td>

                          <td className="border-2 p-1">
                            {expense?.paymentReceivedFromClient?.amount}
                          </td>

                          <td className="border-2 p-1">{expense?.remarks}</td>

                          <td className="border-2 p-1">
                            <div className="flex justify-center">
                              <button
                                onClick={() => {
                                  setViewUpdateFormId(expense._id);
                                  setViewUpdate(true);
                                }}
                                className="text-green-500 hover:text-green-600 px-1rounded-md w-12 m-1"
                              >
                                <PencilIcon size={24}/>
                              </button>
                              <button
                                onClick={() => {
                                  setViewHdd(expense);
                                }}
                                className="text-blue-500 hover:text-blue-600 px-1 rounded-md w-12 m-1"
                              >
                                <EyeIcon size={24}/>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="flex justify-center pt-16">
              ----------------------------------------------------------------------------------------
            </div>
            <div className="flex justify-center pb-20">
              <p>
                <span className="text-red-500 font-bold">NOTE:-</span> Amount is
                calculated as Rate*Length
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full ">
            <h1>Form not found.</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowAllForms;
