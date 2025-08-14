"use client";

import React from "react";

interface FileUploaderProps {
  onChange?: (files: FileList | null) => void;
  multiple?: boolean;
}

/**
 * Simple file upload component restricted to PNG and JPEG images.
 */
const FileUploader: React.FC<FileUploaderProps> = ({ onChange, multiple = false }) => {
  return (
    <input
      type="file"
      accept="image/png,image/jpeg"
      onChange={(e) => onChange?.(e.target.files)}
      multiple={multiple}
    />
  );
};

export default FileUploader;
