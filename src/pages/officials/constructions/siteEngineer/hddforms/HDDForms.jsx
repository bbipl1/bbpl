import axios from "axios";
import React, { useEffect, useState } from "react";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const HDDForms = ({ siteEngineerId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState();
  const [siteName, setSiteName] = useState();
  const [dateOfRequirements, setDateOfRequirements] = useState("");
  const [siteEngObjId, setSiteEngObjId] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [hddDetails, setHddDetails] = useState([]);
  const [clientName, setClientName] = useState(null);
  const [clientAmount, setClientAmount] = useState(0);
  const [companyName, setCompanyName] = useState(null);
  const [companyAmount, setCompanyAmount] = useState();
  const [paidBy, setPaidBy] = useState(0);

  // Handle form submission
  const handleSubmitForm = () => {
    const url = `${serverUrl}/api/constructions/site-engineers/submit-hdd-form`;
    const header = {
      header: "application/json",
    };
    const payload = {
      siteEngId: userId,
      siteEngObjId,
      siteName,
      dateOfRequirements,
      hddDetails,
      expenses,
      clientName,
      clientAmount,
      companyName,
      companyAmount,
      paidBy,
      remarks,
    };

    // Validation
    if (!userId) return alert("Id is required.");
    if (!dateOfRequirements) return alert("Date of requirements is required.");

    setIsLoading(true);

    console.log(payload);

    axios
      .post(url, payload, header)
      .then((res) => {
        emptyForm();
        alert(res?.data?.message);
      })
      .catch((err) => {
        alert(err?.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const emptyForm = () => {
    setUserId("");
    setSiteEngObjId("");
    setDateOfRequirements("");
    setHddDetails([]);
    setRemarks("");
    setExpenses([]);
    setSiteName("");
  };

  // Handle dynamic job details
  const handleAddHDD = () => {
    setHddDetails((prevHdd) => [...prevHdd, { dia: "", meter: "", rate: "" }]);
  };

  // Handle changes for each HDD job entry
  const handleHddDetailChange = (index, field, value) => {
    const updatedHdd = [...hddDetails];
    updatedHdd[index][field] = value;
    setHddDetails(updatedHdd);
  };

  // Handle expense changes
  const handleAddExpense = (e) => {
    const expenseName = e.target.value;
    if (!expenseName || expenses.some((exp) => exp.name === expenseName))
      return;
    setExpenses([...expenses, { name: expenseName, value: "" }]);
  };

  const handleExpenseValueChange = (index, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index].value = value;
    setExpenses(updatedExpenses);
  };

  const handleRemoveExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (siteEngineerId) {
      setUserId(siteEngineerId.id);
      setSiteEngObjId(siteEngineerId.siteEngObjId);
    }
  }, [siteEngineerId]);

  return (
    <>
      <div>
        <div className="grid grid-cols-4 gap-4 m-2">
          <div>
            <label htmlFor="siteName">Site Name*</label>
            <input
              id="siteName"
              name="siteName"
              placeholder="site name"
              type="text"
              onChange={(e) => {
                setSiteName(e.target.value);
              }}
              className="w-full border-2 p-2"
            />
          </div>
          <div>
            <label htmlFor="clientName">Client Name*</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              className="w-full border-2 p-2"
              value={clientName}
              onChange={(e) => {
                setClientName(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="clientAmount">Amount received from client*</label>
            <input
              type="number"
              id="clientAmount"
              name="clientAmount"
              className="w-full border-2 p-2"
              value={clientAmount}
              onChange={(e) => {
                setClientAmount(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="companyName">Company Name</label>
            <select
              name="companyName"
              id="companyName"
              className="w-full border-2 p-2"
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
          <div>
            <label htmlFor="amountFromComapany">
              Payment received from company*
            </label>
            <input
              type="number"
              id="amountFromComapany"
              name="amountFromComapany"
              className="w-full border-2 p-2"
              value={companyAmount}
              onChange={(e) => {
                setCompanyAmount(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="paidBy">Paid by*</label>
            <select
              name="paidBy"
              id="paidBy"
              value={paidBy}
              onChange={(e) => {
                setPaidBy(e.target.value);
              }}
              className="w-full border-2 p-2"
            >
              <option value="">Select</option>
              <option value="rakeshKumar">Rakesh Kumar</option>
              <option value="avneshkumar">Avnesh kumar</option>
              <option value="ashokKumar">Ashok kumar</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Date of Requirements*</label>
            <input
              onChange={(e) => setDateOfRequirements(e.target.value)}
              value={dateOfRequirements}
              type="date"
              className="w-full border-2 p-2"
            />
          </div>
        </div>

        <div className=" overflow-y-auto">
          <label>Expenses*</label>
          <select
            onChange={handleAddExpense}
            className="w-full p-2 overflow-y-auto"
          >
            <option value="">Select</option>
            <option value="diesel">Diesel</option>
            <option value="petrol">Petrol</option>
            <option value="fooding">Fooding</option>
            <option value="advance">Advance</option>
            <option value="labour expenses">Labour Expenses</option>
            <option value="water tanker">Water tanker</option>
            <option value="ration">Ration</option>
            <option value="tools">Tools</option>
            <option value="side-expense">Side expenses</option>
            <option value="hydraulic">Hydraulic</option>
            <option value="grill">Grill</option>
            <option value="medicina">Medicine</option>
            <option value="machine-shifting">Machine shifting</option>
            <option value="self-expense">Self expense</option>
            <option value="utensils">utensils</option>
            <option value="vehicles-service">vehicles service</option>
            <option value="pipe-jin">pipe (jin)</option>
          </select>
          {expenses.map((expense, index) => (
            <div key={index} className="w-full flex justify-between mt-2">
              <span>{expense.name}</span>
              <input
                type="number"
                className="border-2 p-1"
                value={expense.value}
                onChange={(e) =>
                  handleExpenseValueChange(index, e.target.value)
                }
              />
              <button
                onClick={() => handleRemoveExpense(index)}
                className="bg-red-500 hover:bg-red-600 m-1 p-1 px-2 rounded-lg text-white"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div>
          {hddDetails.map((hdd, index) => (
            <div key={index} className="m-4">
              <div>
                <label htmlFor={`dia-${index}`}>Diameter*</label>
                <select
                  id={`dia-${index}`}
                  value={hdd.dia}
                  onChange={(e) =>
                    handleHddDetailChange(index, "dia", e.target.value)
                  }
                  className="w-full border-2 p-2"
                >
                  <option value="">Select</option>
                  <option value="63">63</option>
                  <option value="75">75</option>
                  <option value="90">90</option>
                  <option value="110">110</option>
                  <option value="125">125</option>
                  <option value="140">140</option>
                  <option value="160">160</option>
                  <option value="180">180</option>
                  <option value="200">200</option>
                  <option value="220">220</option>
                </select>
              </div>
              <div>
                <label htmlFor={`meter-${index}`}>Length (meter)*</label>
                <input
                  id={`meter-${index}`}
                  type="number"
                  value={hdd.meter}
                  onChange={(e) =>
                    handleHddDetailChange(index, "meter", e.target.value)
                  }
                  className="w-full border-2 p-2"
                />
              </div>
              <div>
                <label htmlFor={`rate-${index}`}>Rate (INR)*</label>
                <input
                  id={`rate-${index}`}
                  type="number"
                  value={hdd.rate}
                  onChange={(e) =>
                    handleHddDetailChange(index, "rate", e.target.value)
                  }
                  className="w-full border-2 p-2"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            onClick={handleAddHDD}
            className="bg-blue-500 hover:bg-blue-600 m-1 p-1 px-2 rounded-lg text-white w-32"
          >
            Add HDD meter used
          </button>
        </div>

        <div>
          <label htmlFor="remarks">Remarks</label>
          <textarea
            id="remarks"
            name="remarks"
            rows={2}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full p-1"
            placeholder="Write remarks here"
          />
        </div>

        <div className="flex justify-center m-4">
          <button
            onClick={handleSubmitForm}
            className="p-2 mb-4 bg-blue-600 w-48 text-white rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default HDDForms;
