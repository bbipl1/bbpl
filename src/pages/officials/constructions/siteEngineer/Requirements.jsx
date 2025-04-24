import axios from "axios";
import AWS from "aws-sdk";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const RequirementForm = ({ user }) => {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitText, setSubmitText] = useState("Submit");
  const [selectedMaterial, setSelectMaterial] = useState();
  const [maskedName,setMaskedName]=useState();
  const [maskedMobile,setMaskedMobile]=useState();
  // const [selectedMaterials, setSelectMaterials] = useState([
  //   {
  //     name: " ",
  //     quantity: " ",
  //     amount: "",
  //     remarks: " ",
  //   },
  // ]);
  const [materials, setMaterials] = useState({
    name: " ",
    quantity: " ",
    price: "",
    remarks: " ",
  });

  useEffect(() => {
    console.log(materials);
  }, [materials]);

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    mobile: "",
    dateOfRequirement: "",
    state: "Select",
    district: "Select",
    block: "Select",
    siteName: "",
    workType: "",
    materialUsed: [],
    requirements: "",
    amount:"",
    remarks: "",
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [siteNames, setSiteNames] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);

  useEffect(() => {
    // Fetching states on component mount
    // console.log
    fetchStates();
  }, []);

  useEffect(() => {
    setLoading(true);
    const id = formData?.id;
    const url = `${serverUrl}/api/get-user?id=${id}`;
    axios
      .get(url)
      .then((res) => {
        const user = res?.data?.data;
        setLoading(false);
        if (!user) {
          // setLoading(false)
          return;
        }
        // console.log(user.department);
        // console.log(user);
        // if (!(user.department === "construction")) {
        //   setFormData((prevData) => ({
        //     ...prevData,
        //     name: "",
        //     mobile: "",
        //   }));
        //   // setLoading(false)
        //   return;
        // }
        let mobile = user.mobile;
        const preFix = mobile.substring(0, 2);
        const postFix = mobile.substring(8, 11);
        const maskedMob = preFix + "******" + postFix;
        setMaskedMobile(maskedMob);
        let name = user?.name;
        let maskedName;
        if (name && name.length > 6) {
          const preName = name.substring(0, 3);
          const postName = name.substring(name.length - 3, name.length);
          let star = "*".repeat(name.length - 6); // Generate stars for middle characters
          maskedName = preName + star + postName;
          setMaskedName(maskedName);
          console.log(maskedName);
        } else {
          console.log("Name is too short to mask!");
        }

        setFormData((prevData) => ({
          ...prevData,
          name: name,
          mobile: mobile,
        }));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [formData.id]);

  // Fetch states data from API
  const fetchStates = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${serverUrl}/api/site-management/find-site-details`
      );
      setStates(res.data.data[0].states); // Assuming response data format
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching states:", error);
    }
  };

  // Fetch districts based on selected state
  const fetchDistricts = (stateName) => {
    const selectedState = states.find((state) => state.stateName === stateName);
    setDistricts(selectedState ? selectedState.districts : []);
    setFormData((prevFormData) => ({
      ...prevFormData,
      district: "Select",
      block: "Select",
      siteName: "Select",
      workType: "", // Reset workType when state or district changes
    }));
  };

  // Fetch blocks based on selected district
  const fetchBlocks = (districtName) => {
    const selectedDistrict = districts.find(
      (district) => district.districtName === districtName
    );
    setBlocks(selectedDistrict ? selectedDistrict.blocks : []);
    setFormData((prevFormData) => ({
      ...prevFormData,
      block: "select",
      siteName: "select",
      workType: "", // Reset workType when district or block changes
    }));
  };

  // Fetch site names based on selected block
  const fetchSiteNames = (blockName) => {
    const selectedBlock = blocks.find((block) => block.blockName === blockName);
    setSiteNames(selectedBlock ? selectedBlock.sites : []);
    setFormData((prevFormData) => ({
      ...prevFormData,
      siteName: "select",
      workType: "", // Reset workType when block or siteName changes
    }));
  };

  // Set work types based on selected site name
  const fetchWorkTypes = (siteName) => {
    const selectedSite = siteNames.find((site) => site.siteName === siteName);
    if (selectedSite) {
      setWorkTypes(selectedSite.workType || []);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      workType: "select", // Reset workType if no workType available
    }));
  };

  const handleChange = (e) => {
    setSubmitText("Submit");
    let { name, value } = e.target;
    if (name === "id") {
      value = value.toString().toUpperCase();
    }

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    // Fetch dependent data based on selected dropdown value
    if (name === "state") {
      fetchDistricts(value); // Fetch districts when state is selected
    } else if (name === "district") {
      fetchBlocks(value); // Fetch blocks when district is selected
    } else if (name === "block") {
      fetchSiteNames(value); // Fetch site names when block is selected
    } else if (name === "siteName") {
      fetchWorkTypes(value); // Fetch work types when site is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // return ;
    setLoading(true);
    setSubmitText("Pending");
    console.log(formData);
    const url = `${serverUrl}/api/forms/submit-requirements-form`;
    const payLoad = formData;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(url, payLoad, headers)
      .then((res) => {
        setSubmitText("Submitted");
        setLoading(false);
        resetForm();
        alert("Form submitted successfully.");
      })
      .catch((err) => {
        console.log(err);
        alert("Getting an error");
        setLoading(false);
        setSubmitText("Error");
      });
  };

  const resetForm = async () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: "",
      id: "",
      mobile: "",
      dateOfRequirement: "",
      state: "Select",
      district: "Select",
      block: "Select",
      siteName: "",
      workType: "",
      materialUsed: [],
      requiremtns: "",
      remarks: "",
    }));
  };

  const handleMaterialsChange = (e) => {
    const { name, value } = e.target;
    setMaterials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddMaterials = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      materialUsed: [...prevFormData.materialUsed, materials],
    }));
    console.log(materials);
    console.log(formData);
  };
  const handleRemoveMaterials = (materialToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      materialUsed: prevFormData.materialUsed.filter(
        (item) => item?.name !== materialToRemove
      ), // materialToRemove is the item you want to remove
    }));
  };

  // if (!user) {
  //   navigation("/authentication/officials/officials-login");
  // }

  return (
    <>
      <div
        onSubmit={(e) => {
          // handleSubmit(e);
        }}
        className="max-w-full w-full  mx-auto p-4 border rounded shadow-md "
      >
        <h2 className="text-2xl font-bold flex  justify-center  mb-10">
          Requirement Form
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* designationType Type */}
          {/* <div className="mb-4">
            <label htmlFor="designationType" className="block text-sm font-medium mb-1">
              Designation*
            </label>
            <select
              id="designationType"
              name="designationType"
              value={formData.designationType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="select">Select</option>
              <option value="vendor">Vendor</option>
              <option value="employee">Employee</option>
             
            </select>
          </div> */}

          {/* Employee ID */}
          <div className="mb-4">
            <label htmlFor="id" className="block text-sm font-medium mb-1">
              ID*
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          {/* Employee Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={maskedName}
              onChange={handleChange}
              disabled
              className="w-full border rounded px-3 py-2 cursor-not-allowed"
            />
          </div>

          {/* Mobile No. */}
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-medium mb-1">
              Mobile*
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              disabled
              value={maskedMobile}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 cursor-not-allowed"
            />
          </div>

          {/* State */}
          <div className="mb-4">
            <label htmlFor="state" className="block text-sm font-medium mb-1">
              State*
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="select">Select</option>
              {states.map((state) => (
                <option key={state._id} value={state.stateName}>
                  {state.stateName}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-sm font-medium mb-1"
            >
              District*
            </label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="select">Select</option>
              {districts.map((district) => (
                <option key={district._id} value={district.districtName}>
                  {district.districtName}
                </option>
              ))}
            </select>
          </div>

          {/* Block */}
          <div className="mb-4">
            <label htmlFor="block" className="block text-sm font-medium mb-1">
              Block*
            </label>
            <select
              id="block"
              name="block"
              value={formData.block}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="select">Select</option>
              {blocks.map((block) => (
                <option key={block._id} value={block.blockName}>
                  {block.blockName}
                </option>
              ))}
            </select>
          </div>

          {/* Site Name */}
          <div className="mb-4">
            <label
              htmlFor="siteName"
              className="block text-sm font-medium mb-1"
            >
              Site Name*
            </label>
            <select
              id="siteName"
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="select">Select</option>
              {siteNames.map((site) => (
                <option key={site._id} value={site.siteName}>
                  {site.siteName}
                </option>
              ))}
            </select>
          </div>

          {/* Work Type */}
          <div className="mb-4">
            <label
              htmlFor="workType"
              className="block text-sm font-medium mb-1"
            >
              Type of Work*
            </label>
            <select
              id="workType"
              name="workType"
              value={formData.workType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="select">Select</option>
              {workTypes.map((type) => (
                <option key={type._id} value={type.workTypeName}>
                  {type.workTypeName}
                </option>
              ))}
            </select>
          </div>

          {/* Date of Requirement */}
          <div className="mb-4">
            <label
              htmlFor="dateOfRequirement"
              className="block text-sm font-medium mb-1"
            >
              Date Of Requirement*
            </label>
            <input
              type="date"
              id="dateOfRequirement"
              name="dateOfRequirement"
              value={formData.dateOfRequirement}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="requirements"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Requirements*
            </label>
            <select
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select requirements</option>
              <option value="manpower">Manpower</option>
              <option value="motor rent">motor rent</option>
              <option value="room rent">room rent</option>
              <option value="materials-10mm crushed stone">materials-10mm crushed stone</option>
              <option value="materials-20mm crushed stone">materials-20mm crushed stone</option>
              <option value="materials-steel">materials-steel</option>
              <option value="materials-ply">materials-ply</option>
              <option value="materials-button">materials-button</option>
              <option value="materials-nails">materials-nails</option>
              <option value="materials-winding wire">materials-winding wire</option>
              <option value="materials-cover block">materials-cover block</option>
              <option value="materials-mixture machine">materials-mixture machine</option>
              <option value="materials-generator">materials-generator</option>
              <option value="materials-electric gadgets">materials-electric gadgets</option>
              <option value="advance payment-labour">advance payment-labour</option>
              <option value="advance payment-labour-staff">advance payment-staff</option>
              {/* <option value="material">Material</option> */}
              <option value="tools and machinery">Tools & Machinery</option>
              <option value="ration">Ration</option>
              <option value="vendor">Vendor</option>
              <option value="self">Self</option>
            </select>
          </div>

          {/* Materials Type */}
          <div className="mb-4 relative">
            <label
              htmlFor="materialUsed"
              className="block text-sm font-medium mb-1"
            >
              Materials*
            </label>
            <select
              id="materialUsed"
              name="materialUsed"
              value={selectedMaterial}
              onChange={(e) => {
                setMaterials((prev) => ({ ...prev, name: e.target.value }));
                setSelectMaterial(e.target.value);
                setIsMaterialsOpen(true);
              }}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select</option>
              <option value="morang">Morang</option>
              <option value="Steel">Steel</option>
              <option value="Cement(OCC)">Cement(OPC)</option>
              <option value="Cement(PCC)">Cement(PCC)</option>
              <option value="Brick">Brick</option>
              <option value="Concrete">Concrete </option>
              <option value="Paint">Paint</option>
              <option value="Gate">Gate</option>
              <option value="others">Others</option>
            </select>

            {isMaterialsOpen && (
              <>
                <div className="absolute z-10 border-2 border-blue-100 p-0 bg-neutral-100">
                  <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 p-2">
                    {/* <div>
                      <label htmlFor="name">Name*</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={selectedMaterial}
                        disabled
                        onChange={handleMaterialsChange}
                        className=" cursor-not-allowed w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div> */}
                    <div>
                      <label htmlFor="quantity">Quantity*</label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={materials.quantity}
                        onChange={handleMaterialsChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="price">Price*</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={materials.price}
                        onChange={handleMaterialsChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="w-full p-2">
                    <label htmlFor="remarks">Remarks</label>
                    <input
                      type="text"
                      id="remarks"
                      name="remarks"
                      value={materials.remarks}
                      onChange={handleMaterialsChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="w-full flex justify-evenly">
                    <button
                      onClick={handleAddMaterials}
                      className="bg-blue-600 m-2 p-2 rounded-lg w-24 text-white hover:bg-blue-800"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        handleRemoveMaterials(selectedMaterial);
                      }}
                      className="bg-red-600 m-2 p-2 rounded-lg w-24 text-white hover:bg-red-700"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => {
                        setIsMaterialsOpen(false);
                      }}
                      className="bg-blue-600 m-2 p-2 rounded-lg w-24 text-white hover:bg-red-700"
                    >
                      Hide
                    </button>
                  </div>

                  <div  className="ml-0 w-full lg:w-1/4 lg:h-screen lg:overflow-y-auto absolute lg:fixed z-50 lg:top-24 lg:left-0 bg-neutral-50 pb-24">
                    <div className="w-full">
                      <h1 className="w-full flex justify-center text-lg font-bold">
                        Materials Required-
                      </h1>
                    </div>

                    <div className="w-full  grid grid-cols-2 ">
                      {formData?.materialUsed.map((item, id) => {
                        return (
                          <>
                            <div className="  z-10  p-2 rounded-md">
                              <div className=" ">
                                <div>
                                  <p>
                                    ({id + 1}) Name: {item.name}
                                  </p>
                                </div>
                                <div className="ml-5">
                                  <p>Quantity: {item.quantity}</p>
                                </div>
                                <div className="ml-5">
                                  <p>Price: {item.price}</p>
                                </div>
                                <div className="ml-5">
                                  <p>Remarks: {item.remarks}</p>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}

                      <div className="sticky bottom-0 z-10">
                        <button
                          onClick={() => {
                            setIsMaterialsOpen(false);
                          }}
                          className="bg-red-600 m-2 p-2 rounded-lg w-24 text-white hover:bg-red-700"
                        >
                          Hide
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* amount */}
          <div>
            <label htmlFor="amount"> Required Amount</label>
            <input
            onChange={handleChange}
            id="amount"
            name="amount"
            className="w-full border rounded px-3 py-2"
             type="number" />
          </div>

          {/* </div> */}

          {/* Payments Status */}
          {/* 
          <div>
            <label
              htmlFor="paymentMethod"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              others
            </label>
            <input
              type="file"
              id="paymentMethod"
              name="paymentMethod"
              onChange={(e) => {
                // setAccountDetails(e.target.files[0]);
                setPaymentMethods(e.target.files[0]);
              }}
              accept="image/png, image/jpg, image/jpeg"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Please upload a clear image(jpg, jpeg, png files only) of the
              Account details.
            </p>
          </div> */}

          {/* <div>
          <label
            htmlFor="paymentStatus"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Payment Status
          </label>
          <select
            id="paymentStatus"
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">Select Payment Status</option>
            <option value="Received">Received</option>
            <option value="Pending">Pending</option>
          </select>
        </div> */}
        </div>

        {/* Remarks */}
        <div className="mb-4 ">
          <label htmlFor="remarks" className="block text-sm font-medium mb-1">
            Remarks*
          </label>
          <div className="w-full flex justify-center">
            <textarea
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows="3"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-center mb-4">
          {loading && (
            <ClipLoader color="#4A90E2" loading={loading} size={50} />
          )}
        </div>

        <div className="flex justify-center">
          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-1/4  bg-blue-500 text-white py-2 rounded hover:bg-blue-600 "
          >
            {submitText}
          </button>
        </div>
      </div>
    </>
  );
};

export default RequirementForm;
