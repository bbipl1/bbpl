import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { serverURL } from "../../../../../../utility/URL";
import axios from "axios";
import FullScreenLoading from "../../../../../../loading/FullScreenLoading";
import UpdateHDDMeter from "./UpdateHDDMeter";

const UpdateHDD = ({ doc, handleClose, refresh, setRefresh }) => {
  const [clientEditText, setClientText] = useState("Edit");
  const [siteNameEditText, setsiteNameText] = useState("Edit");
  const [salesAmountEditText, setSalesAmountText] = useState("Edit");
  const [clientName, setClientName] = useState(null);
  const [siteName, setSiteName] = useState(null);
  const [salesAmount, setSalesAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentRecFromClient, setPaymentRecFromClient] = useState(0);
  const [paymentRecFromClientText, setPaymentRecFromClientText] =
    useState("Edit");

  useEffect(() => {
    if (doc) {
      console.log(doc);
      setClientName(doc?.paymentReceivedFromClient?.clientName);
      setSalesAmount(doc?.paymentReceivedFromCompany?.amount);
      setPaymentRecFromClient(doc?.paymentReceivedFromClient?.amount);
      setSiteName(doc?.siteName);
    }
  }, [doc]);

  const handleEditOrUpdateForSalesAmount = (text) => {
    // alert(text);
    if (text === "Update") {
      setIsLoading(true);
      const url = `${serverURL}/api/admin/official-users/construction/site-eng/hdd-report/update-payment-received-from-bbipl`;
      const payload = {
        docId: doc._id,
        salesAmount,
      };
      const headers = { "Content-Type": "application/json" };
      setSalesAmountText("Updating");
      axios
        .put(url, payload, headers)
        .then((res) => {
          alert(res?.data?.message);
          setRefresh(refresh + 1);
          setSalesAmountText("Updated");
        })
        .catch((err) => {
          console.log(err);
          alert(err?.response?.data?.message);
        })
        .finally((final) => {
          setIsLoading(false);
        });
    } else if (text === "Edit") {
      setSalesAmountText("Update");
    }
  };

  const handleEditOrUpdateForSiteName = (text) => {
    // alert(text);
    if (text === "Update") {
      setIsLoading(true);
      const url = `${serverURL}/api/admin/official-users/construction/site-eng/hdd-report/update-site-name`;
      const payload = {
        docId: doc._id,
        siteName,
      };
      const headers = { "Content-Type": "application/json" };
      setsiteNameText("Updating");
      axios
        .put(url, payload, headers)
        .then((res) => {
          alert(res?.data?.message);
          setRefresh(refresh + 1);
          setsiteNameText("Updated");
        })
        .catch((err) => {
          console.log(err);
          alert(err?.response?.data?.message);
        })
        .finally((final) => {
          setIsLoading(false);
        });
    } else if (text === "Edit") {
      setsiteNameText("Update");
    }
  };

  const handleEditOrUpdateForClientName = (text) => {
    // alert(text)
    if (text === "Update") {
      setIsLoading(true);
      const url = `${serverURL}/api/admin/official-users/construction/site-eng/hdd-report/update-client-name`;
      const payload = {
        docId: doc._id,
        clientName,
      };
      const headers = { "Content-Type": "application/json" };
      setClientText("Updating");
      axios
        .put(url, payload, headers)
        .then((res) => {
          alert(res?.data?.message);
          setRefresh(refresh + 1);
          setClientText("Updated");
        })
        .catch((err) => {
          console.log(err);
          alert(err?.response?.data?.message);
        })
        .finally((final) => {
          setIsLoading(false);
        });
    } else if (text === "Edit") {
      setClientText("Update");
    }
  };
  const handleEditOrUpdateForClientAmount = (text) => {
    // alert(text)
    if (text === "Update") {
      setIsLoading(true);
      const url = `${serverURL}/api/admin/official-users/construction/site-eng/hdd-report/update-amount-received-from-client`;
      const payload = {
        docId: doc._id,
        paymentRecFromClient,
      };
      const headers = { "Content-Type": "application/json" };
      setPaymentRecFromClientText("Updating...");
      axios
        .put(url, payload, headers)
        .then((res) => {
          alert(res?.data?.message);
          setRefresh(refresh + 1);
          setPaymentRecFromClientText("Updated");
        })
        .catch((err) => {
          console.log(err);
          alert(err?.response?.data?.message);
        })
        .finally((final) => {
          setIsLoading(false);
        });
    } else if (text === "Edit") {
      setPaymentRecFromClientText("Update");
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 w-screen h-screen bg-white overflow-y-auto">
      {isLoading && <FullScreenLoading />}

      <div className="w-full">
        <div className="flex justify-end w-full">
          <div
            onClick={() => {
              handleClose(null);
            }}
            className="bg-red-500 text-white rounded-md mr-8 mt-4 p-1"
          >
            <X className="cursor-pointer" size={32} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
          <div className="flex flex-col justify-center items-center">
            <div className="ml-8 md:ml-12 lg:ml-20">
              <p className="font-blod">User id: {doc.siteEngObjId.siteEngId}</p>
              <p className="font-blod">User name: {doc.siteEngObjId.siteEngObjId.name}</p>
              <p className="font-blod">Client name: {doc.clientName}</p>
              <p className="font-blod">Site name: {doc.siteName}</p>
              <p className="font-blod">Sales amount: {doc.salesAmount}</p>
              <p className="font-blod">Remarks: {doc.remarks}</p>
            </div>
          </div>

          <div className="m-4 w-full">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="">
                <label className="block" htmlFor="clientName">
                  {" "}
                  client Name
                </label>
                <input
                  onChange={(e) => {
                    setClientName(e.target.value);
                  }}
                  className={`p-1 border-2 rounded-md ${
                    clientEditText === "Edit"
                      ? "cursor-not-allowed"
                      : "cursor-default"
                  }`}
                  id="clientName"
                  name="clientName"
                  type="text"
                  value={clientName}
                  disabled={clientEditText === "Edit"}
                />
                <button
                  onClick={() => {
                    handleEditOrUpdateForClientName(clientEditText);
                  }}
                  className="m-1 p-1 bg-blue-500 hover:bg-blue-600 text-white w-24 rounded-md"
                >
                  {clientEditText}
                </button>
              </div>
              <div>
                <label className="block" htmlFor="siteName">
                  {" "}
                  siteName
                </label>
                <input
                  onChange={(e) => {
                    setSiteName(e.target.value);
                  }}
                  className={`p-1 border-2 rounded-md ${
                    siteNameEditText === "Edit"
                      ? "cursor-not-allowed"
                      : "cursor-default"
                  }`}
                  id="siteName"
                  name="siteName"
                  type="text"
                  value={siteName}
                  disabled={siteNameEditText === "Edit"}
                />
                <button
                  onClick={() => {
                    handleEditOrUpdateForSiteName(siteNameEditText);
                  }}
                  className="m-1 p-1 bg-blue-500 hover:bg-blue-600 text-white w-24 rounded-md"
                >
                  {siteNameEditText}
                </button>
              </div>
              <div>
                <label className="block" htmlFor="salesAmount">
                  {" "}
                  payment received from company{" "}
                </label>
                <input
                  onChange={(e) => {
                    setSalesAmount(e.target.value);
                  }}
                  className={`p-1 border-2 rounded-md ${
                    salesAmountEditText === "Edit"
                      ? "cursor-not-allowed"
                      : "cursor-default"
                  }`}
                  id="salesAmount"
                  name="salesAmount"
                  type="Number"
                  value={salesAmount}
                  disabled={salesAmountEditText === "Edit"}
                />
                <button
                  onClick={() => {
                    handleEditOrUpdateForSalesAmount(salesAmountEditText);
                  }}
                  className="m-1 p-1 bg-blue-500 hover:bg-blue-600 text-white w-24 rounded-md"
                >
                  {salesAmountEditText}
                </button>
              </div>
              <div>
                <label className="block" htmlFor="salesAmount">
                  {" "}
                  payment received from client{" "}
                </label>
                <input
                  onChange={(e) => {
                    setPaymentRecFromClient(e.target.value);
                  }}
                  className={`p-1 border-2 rounded-md ${
                    paymentRecFromClientText === "Edit"
                      ? "cursor-not-allowed"
                      : "cursor-default"
                  }`}
                  id="salesAmount"
                  name="salesAmount"
                  type="Number"
                  value={paymentRecFromClient}
                  disabled={paymentRecFromClientText === "Edit"}
                />
                <button
                  onClick={() => {
                    handleEditOrUpdateForClientAmount(paymentRecFromClientText);
                  }}
                  className="m-1 p-1 bg-blue-500 hover:bg-blue-600 text-white w-24 rounded-md"
                >
                  {paymentRecFromClientText}
                </button>
              </div>
            </div>
          </div>
          <div>
            <UpdateHDDMeter refresh={refresh} setRefresh={setRefresh} doc={doc} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateHDD;
