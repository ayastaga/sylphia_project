import React from "react";
import "./FileInput.css";

const FileInput = ({
  label,
  tooltip,
  onChange,
  accept,
  multiple,
  onPreviewToggle,
  showPreview,
  previews,
}) => (
  <div className="option">
    <p>
      <span className="hover-tooltip" title={tooltip}>
        {label}
      </span>
    </p>
    <input
      type="file"
      onChange={onChange}
      accept={accept}
      multiple={multiple}
    />
    <button className="preview-btn" onClick={onPreviewToggle}>
      Preview
    </button>
    {showPreview &&
      previews &&
      (Array.isArray(previews) ? (
        <div className="previews-container">
          {previews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`${label} Preview ${index + 1}`}
              className="preview-image"
            />
          ))}
        </div>
      ) : (
        <img
          src={previews}
          alt={`${label} Preview`}
          className="preview-image"
        />
      ))}
  </div>
);

export default FileInput;
