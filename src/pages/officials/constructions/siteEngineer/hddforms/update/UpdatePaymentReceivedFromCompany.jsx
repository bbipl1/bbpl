import React, { useState } from "react";
import { serverURL } from "../../../../../../utility/URL";
import axios from "axios";
import { LoaderCircle } from "lucide-react";

const UpdatePaymentReceivedFromCompany = ({ docId }) => {
  const [companyName, setCompanyName] = useState(null);
  const [paymentRecFromCompany, setPaymentRecFromCompany] = useState(null);
  const [paidBy, setPaidBy] = useState();
  const [isLoading, setIsLoading] = useState(false);
   const [updateText,setUpdateText]=useState("Update")

  const handleSubmitPaymentRecFromCompany = () => {
    if (!companyName || !paymentRecFromCompany || !paidBy) {
      return alert("All field are required.");
    }
    const url = `${serverURL}/api/official-users/construction/site-engineers/hdd-form/update-payment-received-from-company`;
    const headers = {
      "Content-Type": "application/json",
    };

    const payLoad = {docId,companyName,paymentRecFromCompany,paidBy};

    setIsLoading(true);
    setUpdateText("updating...")
    axios
      .put(url, payLoad, headers)
      .then((res) => {
        alert(res?.data?.message);
        setUpdateText("updated")
      })
      .catch((err) => {
        alert(err?.response?.data?.message);
        setUpdateText("Failed.")
        console.log(err);
      })
      .finally((final) => {
        console.log(final);
        setIsLoading(false);
      });
  };
  return (
    <>
      <div>
        <div className="flex justify-center">
          <h1 className="text-xl font-bold my-4">
            Update payment received from company
          </h1>
        </div>
        <div className="grid grid-cols-1">
          <div className="flex flex-col m-4">
            <label htmlFor="company">Company*</label>
            <select
              name="company"
              id="company"
              className="m-1 p-1 rounded-md border-2"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
            >
              <option value="">Select</option>
              <option value="businessBasketInfratech-pvt-ltd">
                Business Basket Infratech .Pvt .Ltd
              </option>
            </select>
          </div>
          <div className="flex flex-col m-4">
            <label htmlFor="amountFromComapany">
              Payment received from company*
            </label>
            <input
              type="number"
              id="amountFromComapany"
              name="amountFromComapany"
              className="m-1 p-1 rounded-md border-2"
              value={paymentRecFromCompany}
              onChange={(e) => {
                setPaymentRecFromCompany(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col m-4">
            <label htmlFor="paidBy">Paid by*</label>
            <select
              name="paidBy"
              id="paidBy"
              value={paidBy}
              onChange={(e) => {
                setPaidBy(e.target.value);
              }}
              className="m-1 p-1 rounded-md border-2"
            >
              <option value="">Select</option>
              <option value="rakeshKumar">Rakesh Kumar</option>
              <option value="avneshkumar">Avnesh kumar</option>
              <option value="ashokKumar">Ashok kumar</option>
            </select>
          </div>

          <div className="flex justify-self-center">
            <div className="relative w-32">
              {isLoading && <LoaderCircle className=" animate-spin mx-auto" />}
              <button
                onClick={handleSubmitPaymentRecFromCompany}
                className="m-1 p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-28"
              >
                {updateText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePaymentReceivedFromCompany;
