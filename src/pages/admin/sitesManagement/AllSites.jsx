import axios from "axios";
import { useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const serverURL = process.env.REACT_APP_SERVER_URL;

const AllSites = () => {
  const [states, setStates] = useState();

  useEffect(() => {
    try {
      const url = `${serverURL}/api/site-management/find-site-details`;
      axios
        .get(url)
        .then((res) => {
          setStates(res?.data?.data[0]?.states || []);
          console.log(res.data.data[0].states);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  }, []);

  const handleEdit = (wt) => {
    const userRes = window.confirm(`Do you want to edit ${wt.workTypeName}?`);
    if (!userRes) {
      return;
    }

    alert("Coming soon")
  };

  const handleDelete = (wt) => {
    const userRes = window.confirm(
      `Are you sure? All data will be deleted permanently for ${wt.workTypeName}.`
    );
    if (!userRes) {
      return;
    }

    alert("Coming soon")
  };

  const handleDownLoadCSV=()=>{
    const userRes = window.confirm(
        `Are you sure to download CSV file?`
      );
      if (!userRes) {
        return;
      }

      alert("Coming soon")

  }

  const handleDownLoadEXCEL=()=>{
    const userRes = window.confirm(
        `Are you sure to download EXCEL file?`
      );
      if (!userRes) {
        return;
      }

      let serialNumber = 1;
    const data = [];

    // Prepare the table data
    states.forEach((state) => {
      state?.districts?.forEach((dis) => {
        dis?.blocks?.forEach((block) => {
          block?.sites?.forEach((site) => {
            site?.workType?.forEach((wt) => {
              data.push({
                "S/N": serialNumber++,
                "State": state.stateName,
                "District": dis.districtName,
                "Block": block.blockName,
                "Site(GP)": site.siteName,
                "Work": wt.workTypeName,
              });
            });
          });
        });
      });
    });

    // Create a new workbook and worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "All Sites");

    // Convert to Excel file and trigger download
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(excelBlob, "All_Site_Details.xlsx");

  }

  const handlePrint=()=>{
    const userRes = window.confirm(
        `Are you sure to print this page?`
      );
      if (!userRes) {
        return;
      }

      window.print()

  }

  const handleDownLoadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    doc.setFontSize(16);
    const title = "All Site Details";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 10); // Centered
  
    // Subtext - Smaller Font & Centered
    doc.setFontSize(10);
    const subtext = "Downloaded by BusinessBasket Infratech Pvt. Ltd";
    const subtextWidth = doc.getTextWidth(subtext);
    doc.text(subtext, (pageWidth - subtextWidth) / 2, 15); // Centered

    let serialNumber = 1;
    const tableColumn = ["S/N", "State", "District", "Block", "Site(GP)", "Work"];
    const tableRows = [];

    states.forEach((state) => {
      state?.districts?.forEach((dis) => {
        dis?.blocks?.forEach((block) => {
          block?.sites?.forEach((site) => {
            site?.workType?.forEach((wt) => {
              const rowData = [
                serialNumber++,
                state.stateName,
                dis.districtName,
                block.blockName,
                site.siteName,
                wt.workTypeName,
              ];
              tableRows.push(rowData);
            });
          });
        });
      });
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("All_Site_Details.pdf");
  };

  return (
    <div>
      <div className="w-full flex justify-center text-xl font-bold p-4">
        <h1>All site details</h1>
      </div>
      <div>
        <table className="w-full ">
          <thead className="w-full ">
            <tr>
              <th className="border-2">S/N</th>
              <th className="border-2">State</th>
              <th className="border-2">District</th>
              <th className="border-2">Block</th>
              <th className="border-2">Site(GP)</th>
              <th className="border-2">Work</th>
              <th className="border-2">Action</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {states?.map((state, id) => {
              return (
                <>
                  {state?.districts?.map((dis) => {
                    return (
                      <>
                        {dis?.blocks?.map((block) => {
                          return (
                            <>
                              {block?.sites?.map((site) => {
                                return (
                                  <>
                                    {site?.workType?.map((wt) => {
                                      return (
                                        <>
                                          <tr className="w-full ">
                                            <td className="border-2 p-2 px-4">
                                              {++id}
                                            </td>
                                            <td className="border-2 p-2 px-4">
                                              {state.stateName}
                                            </td>
                                            <td className="border-2 p-2 px-4">
                                              {dis.districtName}
                                            </td>
                                            <td className="border-2 p-2 px-4">
                                              {block.blockName}
                                            </td>
                                            <td className="border-2 p-2 px-4">
                                              {site.siteName}
                                            </td>
                                            <td className="border-2 p-2 px-4">
                                              {wt.workTypeName}
                                            </td>
                                            <td className="w-48 mx-auto align-middle border-2">
                                              <button
                                                onClick={() => {
                                                  handleEdit(wt);
                                                }}
                                                className="w-16 m-1 p-1 bg-green-500 hover:bg-green-600 rounded-lg text-white"
                                              >
                                                Edit
                                              </button>
                                              <button
                                                onClick={() => {
                                                  handleDelete(wt);
                                                }}
                                                className="w-16 m-1 p-1 bg-red-500 hover:bg-red-600  rounded-lg text-white"
                                              >
                                                Delete
                                              </button>
                                            </td>
                                          </tr>
                                        </>
                                      );
                                    })}
                                  </>
                                );
                              })}
                            </>
                          );
                        })}
                      </>
                    );
                  })}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <div className="flex justify-center items-center mt-8">
          <h1>
            -----------------------------------------Download
            as------------------------------------------
          </h1>
        </div>
        <div className="flex justify-center pb-24">
          <button onClick={handleDownLoadCSV} className="m-2 p-2 w-24 bg-green-500 hover:bg-green-700 rounded-lg text-white">
            CSV
          </button>
          <button onClick={handleDownLoadEXCEL} className="m-2 p-2 w-24 bg-green-500 hover:bg-green-700 rounded-lg text-white">
            Excel
          </button>
          <button onClick={handleDownLoadPDF} className="m-2 p-2 w-24 bg-green-500 hover:bg-green-700 rounded-lg text-white">
            PDF
          </button>
          <button onClick={handlePrint} className="m-2 p-2 w-24 bg-green-500 hover:bg-green-700 rounded-lg text-white">
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllSites;
