import styled from "styled-components";

import React, { useState } from "react";
import { useRef } from "react";



const Upload = styled.div`
  background: #e6f5ff;
  padding: 0.5rem;
  color: blue;
  width: 100px;
  height: 80px; 
  display: flex;
  align-items: center;  
  justify-content: center; 
  text-align:center;
  border: 2px dashed blue;
  border-radius: 15px;
  cursor:pointer;
  z-index:1;
`

const img = styled.img`
background:black;
border: 2px solid blue;
border-radius: 50%;
`




export const UploadImage = ({name,onChange}) => {
  const fileinputRef = useRef(null);
  const [imgName, setimgName] = useState();

  const handleClick = () => {
    if (fileinputRef.current) {
      fileinputRef.current.click();// Trigger the file input click
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      setimgName(file);
      // if (onChange) {
        onChange({ "name": name, "value": file });
      // }
      // Set the selected file
    }
    else {
      setimgName(null);
    }
  };


  return (
    <>

      {(imgName) ? <img src={(URL.createObjectURL(imgName))} className="rounded-circle" rounded width={100} height={100} /> : <Upload onClick={handleClick}>Upload Image</Upload>}
      <input type={'file'} className={'d-none'} ref={fileinputRef} onChange={handleFileChange} accept="image/*" />
    </>
  );
};
