import React, { useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface VideoInt {
  src: string | null;
  fileChange: (e: any) => void;
  isUploading: boolean;
}

function VideoUpload({ src, fileChange, isUploading }: VideoInt) {
  const [videoSrc, setVideoSrc] = useState(src);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        setVideoSrc(e.target.result as string);
      };
      reader.readAsDataURL(file);

      fileChange(file);

      // Upload file
      // try {
      //   const formData = new FormData();
      //   formData.append("video", file);

      //   const response = await fetch("YOUR_API_ENDPOINT", {
      //     method: "POST",
      //     body: formData,
      //   });

      //   if (response.ok) {
      //     setUploadMessage("Video uploaded successfully.");
      //   } else {
      //     setUploadMessage("Upload failed.");
      //   }
      // } catch (error) {
      //   setUploadMessage("Error occurred during upload.");
      //   console.error("Upload error:", error);
      // }

      // setUploading(false);
    } else {
      alert("Please select a video file.");
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box style={{ textAlign: "center", padding: "20px" }}>
      {videoSrc && (
        <Box style={{ marginBottom: "20px" }}>
          <video width="400" controls>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        </Box>
      )}
      <input
        accept="video/*"
        style={{ display: "none" }}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
          onClick={handleClick}
          disabled={isUploading}
        >
          Upload Video
        </Button>
      </label>
      {isUploading && <p>Uploading...</p>}
      {uploadMessage && <p>{uploadMessage}</p>}
    </Box>
  );
}

export default VideoUpload;
