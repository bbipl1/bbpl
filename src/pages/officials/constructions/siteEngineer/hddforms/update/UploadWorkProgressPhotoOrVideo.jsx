import axios from "axios";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const UploadWorkProgressPhotoOrVideo = ({ user, docId }) => {
  const [screenshots, setScreenshots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshots((prevScreenshots) => [...prevScreenshots, file]);
    }
  };

  // Remove a file by index
  const removeFile = (index) => {
    setScreenshots((prevScreenshots) =>
      prevScreenshots.filter((_, i) => i !== index)
    );
  };

  const handleUpload = () => {
    setIsLoading(true);
    if (!docId) {
      return alert("document is not found.");
    }
    const url = `${serverUrl}/api/official-users/construction/site-engineers/hdd-form/update-Work-progress-photo-or-video`;

    // Create FormData instance
    const formData = new FormData();

    // Append the file(s)
    if (screenshots && screenshots.length > 0) {
      screenshots.forEach((file) => {
        formData.append("WorkProgressPhotoOrVideo", file); // 'ss' is the field name for the file
      });
    }

    // Append the other form fields
    formData.append("id", user?.id);
    formData.append("docId", docId);

    // Log to check the data being sent
    console.log("FormData: ", formData);

    axios
      .put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Automatically handled by axios with FormData
        },
      })
      .then((res) => {
        alert(res?.data?.message);
      })
      .catch((err) => {
        alert(err?.response?.data?.message);
        console.error("Error: ", err);
      })
      .finally((final) => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center pb-12">
      <div>
        <h1 className="text-lg font-bold mb-4">Work progress images/videos</h1>
      </div>

      <div className="grid grid-cols-2">
        <div className="flex flex-col items-center">
          <label htmlFor="">
            Allowed file type(img/jpg, img/jpeg, img/png, video/mp4)
          </label>

          <input
            type="file"
            id="ss"
            name="ss"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mt-4">
            {isLoading && (
              <ClipLoader color="#4A90E2" loading={isLoading} size={50} />
            )}
          </div>
          <div>
            <button
              onClick={handleUpload}
              className="w-32 mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Upload
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {screenshots.length > 0 && (
          <div className="mt-6">
            <h2 className="text-md font-semibold mb-2">Uploaded video/s:</h2>
            <ul className="list-disc pl-5">
              {screenshots.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-sm text-gray-700 mb-2"
                >
                  <span>{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadWorkProgressPhotoOrVideo;
