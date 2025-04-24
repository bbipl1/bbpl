import axios from "axios";
import React, { useEffect, useState } from "react";
import { getLocalStorageData } from "../../../../../utility/LocalStorage";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const UpdateHDDForm = ({ form }) => {
  const [formData, setFormData] = useState();
  const [siteEngId, setSiteEngId] = useState();
  const [siteEngObjId,setSiteEngObjId]=useState();

  useEffect(() => {
    if(form){
        setFormData(form);
        const siteEng=getLocalStorageData("SiteEnguser");
    }
  }, [form]);


  return (
    <div className="w-full">
      {formData && Array.isArray(formData) ? (
        <>
          <div className="w-full">
            <div></div>
            <div className="w-full">
              <table className="w-full border-2 border-gray-100">
                <thead className="w-full">
                  <tr>
                    <th className="border-2 p-1">Date</th>
                    <th className="border-2 p-1">Name</th>
                    <th className="border-2 p-1">Date of Req...</th>
                    <th className="border-2 p-1">DIA (mtr)</th>
                    {/* <th  className="border-2 p-1">No Of Jobs</th> */}
                    <th className="border-2 p-1">Length (mtr)</th>
                    <th className="border-2 p-1">Rate/mtr (INR)</th>
                    <th className="border-2 p-1">Amount (INR)</th>
                    <th className="border-2 p-1">payment</th>
                    <th className="border-2 p-1">Expenses</th>
                    <th className="border-2 p-1">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {formData?.map((expense, i) => {
                    return (
                      <>
                        <tr
                          className={`w-full ${
                            i % 2 === 0 ? "bg-white" : "bg-blue-50"
                          }`}
                        >
                          <td className="border-2 p-1">{expense?.date}</td>
                          <td className="border-2 p-1">
                            {expense?.siteEngObjId?.siteEngObjId?.name}
                          </td>
                          <td className="border-2 p-1">
                            {expense?.dateOfRequirements}
                          </td>
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
                            {expense.paymentRec.status}/Rs.
                            {expense.paymentRec.amount}/-
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
                          <td className="border-2 p-1">{expense.remarks}</td>
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

export default UpdateHDDForm;
