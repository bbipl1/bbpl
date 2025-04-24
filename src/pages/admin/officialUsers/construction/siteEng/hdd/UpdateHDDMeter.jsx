import React, { useEffect, useState } from "react";
import { Trash2, PlusIcon } from "lucide-react";
import axios from "axios";
import { serverURL } from "../../../../../../utility/URL";
import FullScreenLoading from "../../../../../../loading/FullScreenLoading";

const UpdateHDDMeter = ({ doc, setRefresh, refresh }) => {
  const [hdd, setHDD] = useState([]);
  const [addNewHDDEnable, setAddNewHDDEnable] = useState(false);
  const [dia, setDia] = useState(0);
  const [rate, setRate] = useState(0);
  const [length, setLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(doc.hddDetails);
    if (Array.isArray(doc.hddDetails) && doc.hddDetails.length > 0) {
      setHDD(doc.hddDetails);
    }
  }, [doc]);

  const addNewBtn = () => {
    setAddNewHDDEnable(false);
    setHDD((hdds) => [...hdds, { dia, rate, meter: length }]);
    // console.log(hdd);
  };

  const deleteHdd = (id) => {
    setHDD((prevHdd) => prevHdd.filter((hd) => hd._id !== id));
    // console.log(hdd);
  };

  const saveAllChanges = () => {
    const userRes = window.confirm(
      "Are you sure? Changes once committed, can not be retrieved."
    );
    if (!userRes) {
      return;
    }

    const url = `${serverURL}/api/admin/official-users/construction/site-eng/hdd-report/update-hdd-details`;

    const headers = { "Content-Type": "application/json" };
    const payload = {
      docId: doc._id,
      hddDetails: hdd,
    };
    setIsLoading(true);
    axios
      .put(url, payload, headers)
      .then((res) => {
        alert(res?.data?.message);
        setRefresh(refresh + 1);
      })
      .catch((err) => {
        alert(err?.response?.data?.message);
      })
      .finally((final) => {
        setIsLoading(false);
      });
  };

  const addNewHDD = () => {
    return (
      <>
        <div className="my-8">
          <div className="flex flex-row">
            <div className="w-24">
              <label className="" htmlFor="dia">
                Diameter*
              </label>
            </div>
            <div>
              <input
                type="number"
                id="dia"
                name="dia"
                value={dia}
                className="p-1 border-2 rounded-md "
                onChange={(e) => {
                  setDia(Number(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-24">
              <label htmlFor="rate">Rate*</label>
            </div>
            <div>
              <input
                type="number"
                id="rate"
                name="rate"
                value={rate}
                className="p-1 border-2 rounded-md "
                onChange={(e) => {
                  setRate(Number(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-24">
              <label htmlFor="length">Length*</label>
            </div>
            <div>
              <input
                type="number"
                id="length"
                name="length"
                value={length}
                className="p-1 border-2 rounded-md "
                onChange={(e) => {
                  setLength(Number(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={addNewBtn}
              className="m-1 p-1 rounded-md text-white bg-blue-500 hover:bg-blue-600"
            >
              Add New
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="w-full flex justify-center">
      {isLoading && <FullScreenLoading />}
      {Array.isArray(hdd) && hdd.length > 0 ? (
        <>
          {" "}
          <div>
            <table>
              <thead>
                <tr>
                  <th className="border-2 p-1">Diameter</th>
                  <th className="border-2 p-1">Rate</th>
                  <th className="border-2 p-1">Length</th>
                  <th className="border-2 p-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {hdd.map((hd) => {
                  return (
                    <>
                      <tr>
                        <td className="border-2 p-1">{hd.dia}</td>
                        <td className="border-2 p-1">{hd.rate}</td>
                        <td className="border-2 p-1">{hd.meter}</td>
                        <td className="border-2 p-1">
                          <Trash2
                            onClick={() => {
                              deleteHdd(hd._id);
                            }}
                            className="text-red-500 flex justify-self-center cursor-pointer"
                            size={20}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
            {!addNewHDDEnable && (
              <div>
                <PlusIcon
                  onClick={() => {
                    setAddNewHDDEnable(true);
                  }}
                  className="text-green-500 flex justify-self-center cursor-pointer"
                />
              </div>
            )}

            {addNewHDDEnable && addNewHDD()}
            <div>
              <button
                onClick={saveAllChanges}
                className="bg-green-500 hover:bg-green-600 text-white p-1 m-1 rounded-md"
              >
                Save all changes
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
           <div>
           <h1 className="text-red-500 font-bold w-full flex justify-self-center">
              HDD data is not available
            </h1>
           </div>
            <div>
            {!addNewHDDEnable && (
              <div>
                <PlusIcon
                  onClick={() => {
                    setAddNewHDDEnable(true);
                  }}
                  className="text-green-500 flex justify-self-center cursor-pointer"
                  size={32}
                />
              </div>
            )}

{addNewHDDEnable && addNewHDD()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateHDDMeter;
