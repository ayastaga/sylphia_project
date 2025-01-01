import React, { useState } from "react";
import "./Collapsible.css";

const Upload = () => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  return (
    <div className="description">
      <h3 className="heading">Auto Grader✍️</h3>
      <hr />
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
        </div>
      )}
      <br />
    </div>
  );
};

export default Upload;
