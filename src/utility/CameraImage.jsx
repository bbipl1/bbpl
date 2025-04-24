import React, { useEffect, useRef, useState } from "react";

const CameraImage = ({ onCapture,setIsCameraOpen }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null); // To hold the stream reference
  const [capturedImage, setCapturedImage] = useState(null);

  // Start the camera on mount
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream; // Save stream reference
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Failed to access the camera. Please check permissions.");
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Capture an image
  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);

      if (onCapture) {
        onCapture(imageData);
      }
    }
  };

  // Stop the camera
  const close = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsCameraOpen(false);
  };

  return (
    <div className="fixed left-20 top-32 w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-64 h-64 border border-gray-300 rounded-md bg-neutral-200"
      ></video>
      <div>
        <button
        onClick={captureImage}
        className="mt-4 bg-blue-500 text-white p-2 rounded-md mr-1 ml-2"
      >
        Capture Image
      </button>
      <button
        onClick={close}
        className="mt-4 bg-red-600 text-white p-2 rounded-md ml-1"
      >
        Close
      </button>
      </div>
      {capturedImage && (
        <div className="mt-4">
          <h3 className="text-sm font-medium">Captured Image:</h3>
          <img
            src={capturedImage}
            alt="Captured"
            className="w-64 h-auto border border-gray-300 rounded-md mt-2"
          />
        </div>
      )}
    </div>
  );
};

export default CameraImage;
