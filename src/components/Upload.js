import React, { useState } from "react";
import FileInput from "./FileInput";
import "./Upload.css";

const Upload = () => {
  const [setFiles] = useState({
    criteria: null,
    assignments: [],
  });
  const [previews, setPreviews] = useState({
    criteria: null,
    assignments: [],
  });
  const [showPreviews, setShowPreviews] = useState({
    criteria: false,
    assignments: false,
  });

  const handleFileChange = (event, type) => {
    const isCriteria = type === "criteria";
    const selectedFiles = isCriteria
      ? event.target.files[0]
      : Array.from(event.target.files);

    setFiles((prev) => ({
      ...prev,
      [type]: selectedFiles,
    }));

    const newPreviews = isCriteria
      ? URL.createObjectURL(selectedFiles)
      : selectedFiles.map((file) => URL.createObjectURL(file));

    setPreviews((prev) => ({
      ...prev,
      [type]: newPreviews,
    }));
  };

  const togglePreview = (type) => {
    setShowPreviews((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleFileUpload = () => {};

  return (
    <div className="file-selection">
      <FileInput
        label="CRITERIA"
        tooltip="Select criteria to check assignment against"
        onChange={(e) => handleFileChange(e, "criteria")}
        accept="image/*"
        multiple={false}
        onPreviewToggle={() => togglePreview("criteria")}
        showPreview={showPreviews.criteria}
        previews={previews.criteria}
      />
      <FileInput
        label="ASSIGNMENT"
        tooltip="Work that you want to check"
        onChange={(e) => handleFileChange(e, "assignments")}
        accept="image/*"
        multiple={true}
        onPreviewToggle={() => togglePreview("assignments")}
        showPreview={showPreviews.assignments}
        previews={previews.assignments}
      />
      <button className="upload-btn" onClick={handleFileUpload}>
        Upload your files and check your assignment!
      </button>
    </div>
  );
};

export default Upload;
