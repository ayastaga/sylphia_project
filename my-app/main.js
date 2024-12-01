import React, { useState } from "react";
import "./main.css";

const FileUpload = () => {
  const [assignmentFiles, setAssignmentFiles] = useState([]);
  const [criteriaFile, setCriteriaFile] = useState(null);
  const [assignmentPreviews, setAssignmentPreviews] = useState([]);
  const [criteriaPreview, setCriteriaPreview] = useState(null);
  const [showCriteriaPreview, setShowCriteriaPreview] = useState(false);
  const [showAssignmentPreviews, setShowAssignmentPreviews] = useState(false);
  const [message, setMessage] = useState("");
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const handleAssignmentFileChange = (event) => {
    const files = Array.from(event.target.files);
    setAssignmentFiles(files);

    // Generate previews for assignment files
    const previews = files.map((file) => URL.createObjectURL(file));
    setAssignmentPreviews(previews);
  };

  const handleCriteriaFileChange = (event) => {
    const file = event.target.files[0];
    setCriteriaFile(file);

    // Generate preview for criteria file
    const preview = URL.createObjectURL(file);
    setCriteriaPreview(preview);
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!assignmentFiles.length || !criteriaFile) {
      alert("Please select both the criteria and the assignment.");
      return;
    }

    const formData = new FormData();
    assignmentFiles.forEach((file, index) => {
      formData.append(`assignmentFile${index}`, file);
    });
    formData.append("criteriaFile", criteriaFile);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        setMessage("");
      } else {
        setMessage("Files successfully uploaded. Awaiting evaluation.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("An unexpected error occurred.");
      setMessage("");
    }
  };

  return (
    <div className="container-main">
      <h3 className="heading">✍️Auto Grader✍️</h3>
      <hr />
      <div className="description">
        <h3>
          <button
            className="collapsible-button"
            onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}
          >
            {isDescriptionVisible
              ? "▲ hide information "
              : "▼ how do i use this website?"}
          </button>
        </h3>
        {isDescriptionVisible && (
          <div className="description-content">
            <h3>A guide to the website:</h3>
            <ol>
              <li>
                <b>Upload a criteria:</b> Start by uploading the criteria that
                will be used to grade all your assignments in <u>CRITERIA</u>.
              </li>
              <br />
              <li>
                <b>Upload the assignment:</b> Next, upload the assignment file
                that you want the autograder to check for in <u>ASSIGNMENT</u>.
              </li>
              <br />
              <li>
                <b>Evaluate:</b> Finally, click the evaluate button to view the
                score, as well as comments, on the assignment.
              </li>
            </ol>
            <p>
              <b>NOTE:</b> All files uploaded should be an image/document
              (jpg/pdf).
            </p>
          </div>
        )}
        <br />
      </div>

      <div className="file-selection">
        <div className="option">
          <p>
            <span
              className="hover-tooltip"
              title="Select criteria to check assignment against"
            >
              CRITERIA
            </span>
          </p>
          <input
            type="file"
            onChange={handleCriteriaFileChange}
            accept="image/*"
          />
          <button
            className="preview-btn"
            onClick={() => setShowCriteriaPreview(!showCriteriaPreview)}
          >
            Preview
          </button>
          {showCriteriaPreview && criteriaPreview && (
            <img
              src={criteriaPreview}
              alt="Criteria Preview"
              className="preview-image"
            />
          )}
        </div>
        <div className="option">
          <p>
            <span className="hover-tooltip" title="Work that you want to check">
              ASSIGNMENT
            </span>
          </p>
          <input
            type="file"
            onChange={handleAssignmentFileChange}
            accept="image/*"
            multiple
          />
          <button
            className="preview-btn"
            onClick={() => setShowAssignmentPreviews(!showAssignmentPreviews)}
          >
            Preview
          </button>
          {showAssignmentPreviews &&
            assignmentPreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Assignment Preview ${index + 1}`}
                className="preview-image"
              />
            ))}
        </div>
      </div>
      <button className="upload-btn" onClick={handleFileUpload}>
        Upload your files and check your assignment!
      </button>

      <div className="message">{message && <p>{message}</p>}</div>
      <div className="footer">
        <div className="score">82%</div>
        <div className="feedback">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra
            mi nec dui condimentum, sit amet faucibus nunc dignissim. Nam
            vulputate libero ut bibendum efficitur. Fusce ac ipsum neque.
            Maecenas tempor, ligula vel tempor gravida, magna turpis faucibus
            urna, id elementum nunc erat id libero. Sed tincidunt risus a ante
            gravida, vel elementum risus sodales. Nunc tempor, turpis a lacinia
            maximus, arcu enim lobortis arcu, in mollis ante mi eu arcu. Sed non
            viverra ante. Integer ullamcorper nisi vitae arcu suscipit, ac
            efficitur arcu condimentum. Nulla facilisi. Cras ut erat sit amet
            turpis tincidunt volutpat at in ligula. In hac habitasse platea
            dictumst.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
