import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const SiteEngProfile = ({ siteEngineer }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState(null); // Store selected file
  const [siteEngImage, setSiteEngImage] = useState(""); // Profile picture URL
  const fileInputRef = useRef(null); // Ref for file input
  //update password
  const [updatePassActive, setUpdatePassActive] = useState(false);
  const [idOrMob, setIdOrMob] = useState(null);
  const [oldPass, setOldPass] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [confirmNewPass, setConfirmNewPass] = useState(null);

  // Fetch Site Engineer details on mount
  useEffect(() => {
    if (siteEngineer) {
      setIdOrMob(siteEngineer.id);
      setProfile(siteEngineer);
      setSiteEngImage(siteEngineer?.profilePicURL || ""); // Load existing profile pic
    }
  }, [siteEngineer]);

  useEffect(() => {
    const url = `${serverURL}/api/constructions/site-engineers/get-site-engineer?id=${siteEngineer?.id}`;
    axios
      .get(url)
      .then((res) => {
        setSiteEngImage(res?.data?.data?.profilePicURL);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong.");
      });
  }, []);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(file);
  };

  // Upload profile picture
  const uploadProfilePic = async () => {
    if (!profilePic) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    if (!siteEngineer.id) {
      alert("Something went wrong.");
      return;
    }
    formData.append("profilePic", profilePic);
    formData.append("siteEngId", siteEngineer?.id);

    try {
      const res = await axios.post(
        `${serverURL}/api/constructions/site-engineers/upload-profile-pic`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Profile pic uploaded successfully.");
      setSiteEngImage(res.data.profilePicUrl); // Update the profile picture URL
      setProfilePic(null); // Reset the selected file
    } catch (err) {
      console.error(err);
      alert("Error uploading profile picture.");
    }
  };

  // Handle form submission for profile details
  const onSubmit = async (data) => {
    const payload = {
      ...data,
      siteEngImage,
    };

    try {
      await axios.post(
        `${serverURL}/api/siteengineer/${siteEngineer?.id}`,
        payload
      );
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Error updating profile.");
    }
  };

  if (!profile || !siteEngineer) return <div>Loading...</div>;

  const updatePassword = () => {
    return (
      <>
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="">Id/Mobile No*</label>
            <input
              type="text"
              className="w-full border-2 p-2 cursor-not-allowed"
              value={idOrMob}
              disabled
              onChange={(e) => {
                setIdOrMob(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Old password*</label>
            <input
              type="text"
              className="w-full border-2 p-2"
              value={oldPass}
              onChange={(e) => {
                setOldPass(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">New password*</label>
            <input
              type="text"
              className="w-full border-2 p-2"
              value={newPass}
              onChange={(e) => {
                setNewPass(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Confirm new password *</label>
            <input
              type="text"
              className="w-full border-2 p-2"
              value={confirmNewPass}
              onChange={(e) => {
                setConfirmNewPass(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleupdate}
              className="bg-green-600 hover:bg-green-800 p-2 rounded-lg w-24 text-white mt-4"
            >
              Update
            </button>
            <button
              onClick={()=>{setUpdatePassActive(false)}}
              className="bg-red-600 hover:bg-red-800 p-2 rounded-lg w-24 text-white mt-4 ml-4"
            >
              Close
            </button>
          </div>
        </div>
      </>
    );
  };

  const handleupdate = (e) => {
    const userChoice = window.confirm("Are you sure?");
    if (!userChoice) {
      return;
    }

    if (!oldPass) {
      alert("Old password is required.");
      return;
    }
    if (!newPass) {
      alert("New password is required.");
      return;
    }
    if (!confirmNewPass) {
      alert("Confirm new password is required.");
      return;
    }
    if (newPass !== confirmNewPass) {
      alert("New password and confirm new password should be matched.");
      return;
    }

    const url = `${serverURL}/api/user-update-password`;
    const data = {
      idOrMob,
      oldPass,
      newPass,
      confirmNewPass
    };
    const headers = {
      "Content-Type": "application/json",
    };

    setIsLoading(true);

    axios
      .put(url, data, headers)
      .then((res) => {
        console.log(res);
        alert(res?.data?.message)
      })
      .catch((err) => {
        console.log(err);
        alert("Error");
      })
      .finally((final) => {
        setIsLoading(true);
      });
  };

  return (
    <div className="w-full  mx-auto p-8 bg-white rounded-xl shadow-md mt-2 ">
      {/* <h2 className="text-3xl font-semibold text-center mb-8">Edit Profile</h2> */}

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center mb-6">
        <label className="relative w-40 h-40 border-2 border-gray-300 rounded-full overflow-hidden shadow-lg cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="absolute w-full h-full opacity-0 cursor-pointer"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {/* Show selected file preview or existing image */}
          <img
            src={profilePic ? URL.createObjectURL(profilePic) : siteEngImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </label>

        {/* Show selected file name */}
        {profilePic && (
          <div className="mt-2 text-sm text-gray-600">
            <p>
              <strong>Selected File:</strong> {profilePic.name}
            </p>
            <button
              onClick={uploadProfilePic}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Upload Photo
            </button>
          </div>
        )}
      </div>

      {/* Site Engineer Info */}
      <div className="space-y-4 mb-6 grid lg:grid-cols-3 gap-4 ">
        <p>
          <strong className="text-gray-700">Name:</strong> {profile?.name}
        </p>
        <p>
          <strong className="text-gray-700">ID:</strong> {profile?.id}
        </p>
        {/* <p>
          <strong className="text-gray-700">ObjID:</strong> {profile?.objId}
        </p> */}
        <p>
          <strong className="text-gray-700">Mobile:</strong> {profile?.mobile}
        </p>
      </div>
      {!updatePassActive && (
        <div>
          <button
            onClick={() => {
              setUpdatePassActive(true);
            }}
            className="p-2 rounded-lg w-36 text-white bg-blue-600"
          >
            Update password
          </button>
        </div>
      )}
      {/* {updatePassword()} */}
      <div>{updatePassActive && updatePassword()}</div>

      {/* Form to update other profile details */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
       
      </form>
    </div>
  );
};

export default SiteEngProfile;
