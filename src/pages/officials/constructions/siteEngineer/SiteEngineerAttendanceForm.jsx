import React, { useState, useEffect } from "react";
import axios from "axios";
import CameraImage from "../../../../utility/CameraImage.jsx";

const serverURL = process.env.REACT_APP_SERVER_URL;

const SiteEngineerAttendanceForm = ({ siteEng }) => {
  const [latitude,setLatitude]=useState(null);
  const [longitude,setLongitude]=useState(null);
  const [siteEngObjId,setSiteEngObjId]=useState();
  const [workers, setWorkers] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [photos, setPhotos] = useState({});
  const [isCameraOpen, setIsCameraOpen] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dataToSend,setDataToSend]=useState([]);


  console.log(siteEng.objId)
  useEffect(()=>{
    navigator?.geolocation?.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        setLatitude(latitude);
        setLongitude(longitude);
        setSiteEngObjId(siteEng.objId)
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
    
  },[siteEng])

  useEffect(() => {
    const url = `${serverURL}/api/constructions/site-engineers/get-all-workers?siteEngineerId=${siteEng?.id}`;
    axios
      .get(url)
      .then((res) => {
        setWorkers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching workers:", err);
      });
  }, [siteEng.id]);

  const handleCapture = (imageData, workerId) => {
    const blob = dataURLtoBlob(imageData);
    const file = new File([blob], `${workerId}.jpg`, { type: "image/jpeg" });

    setPhotos((prevPhotos) => ({ ...prevPhotos, [workerId]: file }));
    setIsCameraOpen((prev) => ({ ...prev, [workerId]: false }));
  };

  const dataURLtoBlob = (dataUrl) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  };

  const handleWorkerSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedList = selectedOptions.map((option) => ({
      workerId: option.value,
      workerName: option.getAttribute("data-name"),
    }));
    setSelectedWorkers(selectedList);
    console.log(dataToSend)
    setDataToSend((prev) => [
      ...prev, 
      { workerId: selectedList[0].workerId, workerName: selectedList[0].workerName }
    ]);
    
  };

  const handleSubmit = async () => {
    if (selectedWorkers.length === 0) {
      alert("Please select at least one worker.");
      return;
    }
  
    for (const worker of dataToSend) {
      if (!photos[worker.workerId]) {
        alert(`Please capture a photo for ${worker.workerName}.`);
        return;
      }
    }
  
    console.log("Selected Workers:", dataToSend);
  
    const formData = new FormData();
    formData.append("siteEngID", siteEng.id);
    formData.append("siteEngObjId", siteEngObjId);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("siteEngName", siteEng.name);
    formData.append("siteLocation", document.getElementById("siteLocation").value);
  
    const workersData = dataToSend.map(({ workerId, workerName }) => ({ workerId, workerName }));
    formData.append("workers", JSON.stringify(workersData));
  
    dataToSend.forEach(({ workerId }) => {
      formData.append(`photo_${workerId}`, photos[workerId]);
    });
  
    try {
      console.log("Form Data:", formData);
      const url = `${serverURL}/api/constructions/site-engineers/submit-manpower-attendance`;
      setIsLoading(true);
      await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } })
        .then((res) => {
          console.log("Form submitted successfully:", res);
          alert("Attendance submitted successfully.");
        })
        .catch((err) => {
          console.log(err);
          alert("Error submitting attendance.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
      alert("Failed to submit attendance.");
    }
  };
  

  const startCameraForWorker = (workerId) => {
    setIsCameraOpen((prev) => ({ ...prev, [workerId]: true }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
      <form onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-2xl font-bold mb-6">Site Engineer Attendance Form</h2>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Site Engineer ID: {siteEng?.id}</p>
          <p className="text-sm font-medium text-gray-700">Site Engineer Name: {siteEng?.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Manpower</label>
          <select multiple onChange={handleWorkerSelect} className="mt-1 p-2 w-full border border-gray-300 rounded-md">
            {workers.map((worker) => (
              <option key={worker._id} value={worker._id} data-name={worker.name}>{worker.name}</option>
            ))}
          </select>
        </div>
        {selectedWorkers.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Selected Workers</h3>
            {selectedWorkers.map(({ workerId, workerName }) => (
              <div key={workerId} className="p-4 border border-gray-300 rounded-md mb-4">
                <p className="text-sm font-medium text-gray-700">Name: {workerName}</p>
                {!isCameraOpen[workerId] && !photos[workerId] && (
                  <button onClick={() => startCameraForWorker(workerId)} className="w-28 mt-4 text-white p-2 bg-blue-500 rounded-md">
                    Start Camera
                  </button>
                )}
                {isCameraOpen[workerId] && (
                  <CameraImage setIsCameraOpen={() => setIsCameraOpen((prev) => ({ ...prev, [workerId]: false }))} onCapture={(imageData) => handleCapture(imageData, workerId)} />
                )}
                {photos[workerId] && <img src={URL.createObjectURL(photos[workerId])} alt={`Captured for ${workerName}`} className="w-16 h-16 object-cover rounded-md" />}
              </div>
            ))}
          </div>
        )}
        <div>
          <label htmlFor="siteLocation">Site Location</label>
          <input disabled value={latitude+" "+longitude} type="text" id="siteLocation" className="mt-1 p-2 w-full border border-gray-300 rounded-md cursor-not-allowed" />
        </div>
        <button type="button" onClick={handleSubmit} className="mt-6 w-full bg-blue-500 text-white p-2 rounded-md">
          {isLoading ? "Submitting..." : "Submit Attendance"}
        </button>
      </form>
    </div>
  );
};

export default SiteEngineerAttendanceForm;
