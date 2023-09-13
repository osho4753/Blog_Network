import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import "../css/index.css"; 
import { useSelector } from 'react-redux';
import { selectUserData } from '../redux/slices/auth.js';
import { Typography } from "@mui/material";
import {useParams} from "react-router-dom";
import config from "../config";

export const Index = () => {

  const userData = useSelector(selectUserData);

  const {id} = useParams();

  const [commentText, setCommentText] = useState("");

  const onSubmit = async () => {
    try{  
    const data = {
      text:commentText,
      user:userData._id
    };
    
     await config.post(`/posts/comment/${id}`,data)
     .then((response) =>{
      console.log(response.data);
     })
     .catch((error) =>{
      console.log(error,'error creating')
     });

     setCommentText("");

    }catch(err){
      console.log(err,'Wrong adding comment!');
    }
  }

  
  return (
    <div className="write-comment">
      {userData ? (
        <>
          <Avatar className="avatar-container" src={userData.imageUrl} />
          <div className="text-container">
            <TextField
              label="Write Comment"
              variant="outlined"
              maxRows={10}
              multiline
              fullWidth
              className="text-field"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button onClick={onSubmit} variant="contained" className="send-button">
              Send
            </Button>
          </div>
        </>
      ) : (
        <>
        <Avatar className="avatar-container" src="" />
        <Typography> You can't add a comment,please login at first </Typography>
        </>
      )}
    </div>
  );
};
