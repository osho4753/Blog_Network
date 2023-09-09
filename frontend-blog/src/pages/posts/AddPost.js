import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {  useSelector } from 'react-redux';
import { isAuth } from "../../redux/slices/auth";
export const AddPost = () => {
  

  const imageUrl = '';
  const [value, setValue] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');


  const handleChangeFile = () => {};

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  console.log(value);
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Type your post',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large">
        Upload posts image
      </Button>
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Delete
        </Button>
      )}
      {imageUrl && (
        <img className="post-img" src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes="textField"
        variant="standard"
        placeholder="Blogs Title"
        value = {title}
        onChange={(e)=>(setTitle(e.target.value))}
        fullWidth
      />
      <TextField 
      classes="textField" 
      variant="standard" 
      placeholder="Tags" 
      value = {tags}
      onChange={(e)=>(setTags(e.target.value))}
      fullWidth />
      <TextField
      value={value}
      onChange={(e)=>(setValue(e.target.value))}
      classes="textField"
      variant="standard"
      placeholder="Type your post"
      fullWidth
      {...options} 
/>
      <div className="button">
        <Button size="large" variant="contained">
          Publish
        </Button>
        <a href="/">
          <Button size="large">No</Button>
        </a>
      </div>
    </Paper>
  );
};
