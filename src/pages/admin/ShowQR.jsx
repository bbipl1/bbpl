import axios from "axios";
import { header } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const serverURL = process.env.REACT_APP_SERVER_URL;

const ShowQR = ({ item, isQROpen, url }) => {
  const [showAmt, setShowAmt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [okBtn, setOKBtn] = useState(false);
  const [amount, setAmount] = useState(0);
  const [toPay, setToPay] = useState(0);
  const paymentNotDone = () => {
    isQROpen(false);
  };

  const paymentDone = async () => {
    setShowAmt(true); // Now show the amount input
    // setToPay(toPay+1);
  };

  const doPayment = async () => {
    try {
      // const res = await waitForAmountBtnCheck();

      // console.log("i", item?._id, "a", amount);
      setIsLoading(true);

      if (!item?._id) {
        alert("Something went wrong.");
        return;
      }
      if (amount < 0) {
        return alert("Amount should be greater than 0.");
      }

      const data = {
        objectId: item._id,
        amount,
      };

      const url = `${serverURL}/api/constructions/site-engineers/update-amount-for-daily-progress-report`;

      const headers = {
        headers: { "Content-Type": "application/json" },
      };

      axios
        .put(url, data, headers)
        .then((res) => {
          console.log(res);
          alert(res?.data?.message);
        })
        .catch((err) => {
          console.log(err);
          alert(err?.response?.data?.message);
        })
        .finally((final) => {
          setIsLoading(false);
        });

      // const response = await axios.put(url, data, headers);

      // console.log("Payment status updated successfully:", response?.data);
      // alert("Payment status updated successfully!");
    } catch (error) {
      console.error(
        "Error updating payment status:",
        error?.response?.data || error?.message
      );
      alert(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  // handle amount input

  const waitForAmountBtnCheck = async () => {
    // setShowAmt(true);
    const promise = new Promise((resolve, reject) => {
      const backBtn = document.getElementById("backBtn");
      const okBtn = document.getElementById("oKBtn");
      const timeout = setTimeout(() => {
        reject("Time out.");
        setShowAmt(false);
        clearTimeout(timeout);
        clearLister();
      }, 30000);

      const handleBack = async () => {
        setShowAmt(false);
        resolve("backBtn");
        clearLister();
        clearTimeout(timeout);
      };
      const handleOK = async () => {
        // await doPayment();
        setShowAmt(false);
        resolve("oKBtn");
        clearLister();
        clearTimeout(timeout);
        setToPay(toPay + 1);
        // alert("ok clicked", toPay);
        console.log(toPay);
      };

      const clearLister = () => {
        backBtn?.removeEventListener("click", handleBack);
        okBtn?.removeEventListener("click", handleOK);
      };

      if (backBtn) {
        backBtn?.addEventListener(
          "click",
          () => {
            handleBack();
          },
          { once: true }
        );
      } else {
        alert("Error in backButton");
      }

      if (okBtn) {
        okBtn.addEventListener(
          "click",
          () => {
            handleOK();
          },
          { once: true }
        );
      } else {
        alert("Error in ok button");
      }
    });

    return promise;
  };

  useEffect(() => {
    if (showAmt) {
      waitForAmountBtnCheck()
        .then((res) => {
          if (res === "oKBtn") {
            // setToPay(toPay + 1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showAmt]);

  useEffect(() => {
    const pay = async () => {
      if (toPay === 1) {
        await doPayment();
        setToPay(0);
      }
    };

    console.log("pay", toPay);

    pay();
  }, [toPay]);

  return (
    <div className="bg-slate-100 fixed z-50 left-0 right-0 top-0 bottom-0 flex justify-self-center  self-center flex-col w-11/12 md:w-9/12 lg:w-1/2 h-4/5 p-4 border-2 border-spacing-4 border-blue-600 rounded-lg">
      {showAmt && (
        <>
          <div className="w-full h-full  absolute flex flex-col justify-center items-center">
            <div className="flex flex-col bg-cyan-100 border-2 border-blue-200 py-16 rounded-lg justify-center items-center w-1/2">
              <label htmlFor="amount" className="">
                Amount*
              </label>
              <input
                id="amount"
                name="amount"
                value={amount} // Ensure controlled component
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                className="p-1 rounded-lg"
              />

              <div>
                <button
                  id="backBtn"
                  // onClick={handleBack}
                  className="bg-blue-600 hover:bg-blue-700  text-white w-20 m-2 my-2 p-1 rounded-full"
                >
                  Back
                </button>
                <button
                  id="oKBtn"
                  // onClick={handleOK}
                  className="bg-green-600 hover:bg-green-700  text-white w-20 m-2 my-2 p-1 rounded-full"
                >
                  OK
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </>
      )}
      <div className="flex justify-between content-evenly">
        <span className="text-md font-bold ml-4">{item?.name}</span>
        <span className="text-md font-bold mr-4">
          Requested: Rs. {item?.expenses?.required}/-
        </span>
        <span className="text-md font-bold mr-4">
          Sent: Rs. {item?.expenses?.received}/-
        </span>
        <span className="text-md font-bold mr-4">
          To pay: Rs. {Number(item?.expenses?.required) - Number(item?.expenses?.received)}/-
        </span>
      </div>
      <div className="flex justify-center items-center p-4">
        <img
          className="w-96 h-80 md:h-96 lg:h-96"
          src={`${item?.expenses?.qrURL}`}
          alt={`url`}
        />
      </div>
      <div className="flex items-center justify-center mb-4">
        {isLoading && (
          <ClipLoader color="#4A90E2" loading={isLoading} size={50} />
        )}
      </div>

      <div className=" flex flex-col justify-center items-center gap-4 md:flex-row lg:flex-row">
        <div>
          {item?.expenses?.status === "UnPaid" || item?.expenses?.status === "PartialPaid" ? (
            <div>
              <button
                onClick={() => {
                  paymentNotDone();
                }}
                className="bg-red-500 p-2 rounded-lg w-48 text-white"
              >
                Not Pay
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  paymentNotDone();
                }}
                className="bg-red-500 p-2 rounded-lg w-48 text-white"
              >
                Close
              </button>
            </div>
          )}
        </div>
        <div className="">
          {item?.expenses?.status === "UnPaid" || item?.expenses?.status === "PartialPaid"? (
            <>
              <button
                
                onClick={() => {
                  paymentDone();
                }}
                className={`p-2 rounded-lg w-48 text-white bg-green-500 hover:bg-green-600 cursor-pointer
              }`}
              >
                Pay
              </button>
            </>
          ) : (
            <>
              <button
                disabled
                onClick={() => {
                  paymentDone();
                }}
                className={`p-2 rounded-lg w-48 text-white 
               
                  bg-gray-400 cursor-not-allowed
                 
              }`}
              >
                Payment Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowQR;
