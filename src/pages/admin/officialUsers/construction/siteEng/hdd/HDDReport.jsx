import React, { useEffect, useState } from "react";
import { serverURL } from "../../../../../../utility/URL";
import axios from "axios";
import CircularCharts from "../../../../../../components/charts/CircularCharts";
import BarChartComponent from "../../../../../../components/charts/BarChartComponent";

const HDDReport = ({ allDocs }) => {
  const [hdds, setHdds] = useState(null);
  const [clients, setClients] = useState([]);
  const [sites, setSites] = useState([]);
  const [filteredHdds, setFilteredHdds] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [hddMtrExpenses, sethddMtrExpenses] = useState(0);
  const [otherExpenses, setOtherExpenses] = useState(0);
  const [totalSalesAmount, setTotalSalesAmount] = useState(0);
  const [amountRecFromClient, setAmountRecFromClient] = useState(0);
  const [amountRecFromCompany, setAmountRecFromCompany] = useState(0);
  const [dates, setDates] = useState([]);
  const [profit, setProfit] = useState(0);
  const [due, setDue] = useState(0);
  const [selectedExp, setSelectedExp] = useState([]);

  useEffect(() => {
    const url = `${serverURL}/api/constructions/site-engineers/get-hdd-forms`;

    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(url, headers)
      .then((res) => {
        const hdds = res.data.data;
        console.log(hdds);
        if (Array.isArray(hdds) && hdds.length > 0) {
          const cls = hdds.map(
            (hdd) => hdd?.paymentReceivedFromClient?.clientName || "Unknown"
          );
          const clsSet = new Set(cls);
          setClients(Array.from(clsSet));
        }
        if (Array.isArray(hdds) && hdds.length > 0) {
          const si = hdds.map((hdd) => hdd.siteName || "Unknown");
          const siSet = new Set(si);
          setSites(Array.from(siSet));
        }

        setHdds(hdds);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((final) => {
        console.log(final);
      });
  }, []);

  useEffect(() => {
    let filteredHdds = [];
    if (selectedClient && selectedSite) {
      filteredHdds = hdds.filter(
        (hdd) =>
          hdd.paymentReceivedFromClient?.clientName === selectedClient &&
          hdd.siteName === selectedSite
      );

      //   setFilteredHdds(filteredHdds);
    } else if (selectedClient) {
      filteredHdds = hdds.filter(
        (hdd) => hdd?.paymentReceivedFromClient?.clientName === selectedClient
      );
      //   setFilteredHdds(filteredHdds);
    } else if (selectedSite) {
      filteredHdds = hdds.filter((hdd) => hdd.siteName === selectedSite);
    }
    if (filteredHdds.length > 0) {
      setFilteredHdds(filteredHdds);
      const dates = filteredHdds.map((hdd) => hdd.date || "Unknown");
      const datesSet = new Set(dates);
      const datesArray = Array.from(datesSet);
      const sortedDates = datesArray.sort((a, b) => {
        const [dayA, monthA, yearA] = a.split("-").map(Number);
        const [dayB, monthB, yearB] = b.split("-").map(Number);

        return (
          new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB)
        );
      });
      setDates(sortedDates);
      setTotalSalesAmount(filteredHdds[0]?.salesAmount);
    }
  }, [hdds, selectedClient, selectedSite]);

  useEffect(() => {
    if (Array.isArray(filteredHdds) && filteredHdds.length > 0) {
      let totalOtherExp = 0;
      let totalHddExp = 0;
      let totalPaymentRecFromClient = 0;
      let totalpaymentReceivedFromCompany = 0;

      filteredHdds.forEach((hdd) => {
        if (hdd?.expenses && Array.isArray(hdd.expenses)) {
          hdd.expenses.forEach((exp) => {
            totalOtherExp += Number(exp.value);
          });
        }
      });

      filteredHdds.forEach((hdd) => {
        if (hdd?.hddDetails && Array.isArray(hdd.hddDetails)) {
          hdd.hddDetails.forEach((hd) => {
            totalHddExp += Number(hd.meter) * Number(hd.rate);
          });
        }
      });

      filteredHdds.forEach((hdd) => {
        if (
          hdd?.paymentReceivedFromClient &&
          Number(hdd?.paymentReceivedFromClient?.amount) >= 0
        ) {
          totalPaymentRecFromClient += Number(
            hdd?.paymentReceivedFromClient?.amount
          );
        }
      });

      filteredHdds.forEach((hdd) => {
        if (
          hdd?.paymentReceivedFromCompany &&
          Number(hdd?.paymentReceivedFromCompany?.amount) >= 0
        ) {
          totalpaymentReceivedFromCompany =
            Number(totalpaymentReceivedFromCompany) +
            Number(hdd?.paymentReceivedFromCompany?.amount);
        }
      });

      //set expense amount of all site docs

      const expenseMap = {};

      filteredHdds.forEach((hdd) => {
        hdd.expenses.forEach((exp) => {
          if (expenseMap[exp.name]) {
            expenseMap[exp.name] += Number(exp.value); // Sum values for the same name
          } else {
            expenseMap[exp.name] = Number(exp.value);
          }
        });
      });

      // Convert the object back to an array
      const groupedExpenses = Object.entries(expenseMap).map(
        ([name, value]) => ({
          name,
          value,
        })
      );

      setSelectedExp(groupedExpenses);

      console.log(groupedExpenses);

      // console.log(totalOtherExp);
      setOtherExpenses(totalOtherExp);
      sethddMtrExpenses(totalHddExp);
      setTotalExpenses(totalOtherExp);
      setAmountRecFromClient(totalPaymentRecFromClient);
      setAmountRecFromCompany(totalpaymentReceivedFromCompany);
    } else {
      setOtherExpenses(0);
      sethddMtrExpenses(0);
      setTotalExpenses(0);
      setAmountRecFromClient(0);
      setSelectedExp([]);
    }
  }, [filteredHdds]);

  useEffect(() => {
    if (totalExpenses > 0 && Number(hddMtrExpenses) > 0) {
      setProfit(Number(hddMtrExpenses) - Number(totalExpenses));
    } else {
      setProfit(0);
    }
  }, [totalExpenses, hddMtrExpenses]);

  useEffect(() => {
    if (hddMtrExpenses >= 0 && amountRecFromClient >= 0) {
      setDue(Number(hddMtrExpenses) - Number(amountRecFromClient));
    } else {
      setDue(0);
    }
  }, [hddMtrExpenses, amountRecFromClient]);

  const datas = [
    { name: "Expenses", value: otherExpenses },
    { name: "Due", value: due },
    { name: "Profit", value: profit },
  ];

  const colors = ["#0000FF", "#FF0000", "#00C49F"];

  return (
    <div className="p-4">
      <div></div>
      <div>
        <div className="w-full flex justify-evenly">
          <div>
            <label htmlFor="clientName">Client Name</label>
            <select
              className="m-1 p-1 rounded-md border-2"
              name="clientName"
              id="clientName"
              value={selectedClient}
              onChange={(e) => {
                setSelectedClient(e.target.value);
              }}
            >
              <option value="">Select</option>
              {clients &&
                clients.length > 0 &&
                clients.map((cl) => {
                  return (
                    <>
                      <option value={cl}>{cl}</option>
                    </>
                  );
                })}
            </select>
          </div>
          <div>
            <label htmlFor="siteName">Site Name</label>
            <select
              className="m-1 p-1 rounded-md border-2"
              name="siteName"
              id="siteName"
              value={selectedSite}
              onChange={(e) => {
                setSelectedSite(e.target.value);
              }}
            >
              <option value="">Select</option>
              {sites &&
                sites.length > 0 &&
                sites.map((si) => {
                  return (
                    <>
                      <option value={si}>{si}</option>
                    </>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 pt-20">
          <div>
            <h1>
              Working date:{" "}
              {Array.isArray(dates) && dates.length > 0 && (
                <>
                  From {dates[0]} to {dates[dates.length - 1]}
                </>
              )}
            </h1>
            <h1>Client name: {selectedClient}</h1>
            <h1>Site name: {selectedSite}</h1>
            <h1>Total sales amount(INR): RS. {hddMtrExpenses}/-</h1>
            <h1>
              Total amount received from client till date(INR):RS.{" "}
              {amountRecFromClient}/-
            </h1>
            <h1 className={`${due > 0 ? "text-red-600" : "text-green-600"}`}>
              Due(INR): RS. {due}/-
            </h1>
            <h1>
              Total payment received from company: Rs. {amountRecFromCompany}/-
            </h1>
           
            {/* <h1>Total hdd meter income(INR):RS. {hddMtrExpenses}/-</h1> */}

            <h1>Total expenses(INR): RS. {otherExpenses}/-</h1>

            <h1 className={`${(Number(otherExpenses)-Number(amountRecFromCompany))>0?"text-red-500":"text-green-500"}`}>
              Expense balance due: Rs.{" "}
              {-Number(amountRecFromCompany) + Number(otherExpenses)}/-
            </h1>
           
            <h1
              className={`${
                profit >= 0 ? "text-green-600" : "text-red-600"
              } font-bold`}
            >
              Profit after all expenses(INR): RS. {Number(profit)}/-
            </h1>
          </div>
          <div>
            <h1 className="flex justify-self-center text-xl font-bold">
              Expense & Profit Analysis
            </h1>
            <CircularCharts datas={datas} colors={colors} />
          </div>
          <div className="pb-24">
            {Array.isArray(selectedExp) && <BarChartComponent datas={selectedExp} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HDDReport;
