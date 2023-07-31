import React from "react";
import Image from "next/image";

import { Delete, UploadIcon, File } from "../SVG/index";
import Style from "./Upload.module.css";

const Upload = ({ onImageChange, display, retrieveFile }) => {
  return (
    <div className={Style.container}>
      <div className={Style.header}>
        {display == null ? (
          <>
            <UploadIcon />
            <p>Browse File to upload!</p>
          </>
        ) : (
          <p>
            <Image
              className={Style.image}
              src={display}
              alt="image"
              width={200}
              height={200}
            />
          </p>
        )}
      </div>
      <label htmlFor="file" className={Style.footer}>
        <File/>
        <p>Select file</p>
        <Delete/>
      </label>
      <input type="file" id="file" className={Style.file} onChange={(e) => (onImageChange(e), retrieveFile(e))} />
    </div>
  );
};

export default Upload;
