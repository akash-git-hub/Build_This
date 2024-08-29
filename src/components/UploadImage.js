import styled from "styled-components";
import { InputField } from "./InputField";
import React, { useState } from "react";
import { useRef } from "react";
import { Stack } from "react-bootstrap";
 

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
`;

const HiddenInput = styled.input`
display:none;
`

export const UploadImage = ( ) => {
    const fileinputRef = useRef(null);
    const [imgname,setimg]= useState();
    const handleClick = () =>{
        if(fileinputRef.current){
            fileinputRef.current.click();// Trigger the file input click
        }
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file.name);
        if (file) {
          setimg(file.name); // Set the selected file
        }
      };
  return (
    <>
    <Stack direction='horizontal' gap={3}>
    <Upload onClick={handleClick}>Upload Image</Upload>
    <p>{imgname}</p>
    </Stack>
    <HiddenInput type={'file'} ref={fileinputRef} onChange={handleFileChange} accept="image/*"/>
    </>
  );
};
