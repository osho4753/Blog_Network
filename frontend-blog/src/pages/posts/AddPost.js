import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import config from '../../config'
export const AddPost = () => {
  const inputRef = React.useRef(null)
  const [value, setValue] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');

  const handleChangeFile = async (event) => {
    try{
        const formData = new FormData()
        const file = await event.target.files[0];
        formData.append('image',file);
        const {data} = await config.post('/uploads',formData);
        setImageUrl(data.url)    
      }catch(err){
      console.log(err);

    }  
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onChange = React.useCallback((value) => {

    setValue(value);
    
  }, []);
  const onSubmit = async () => {
    const fields = {title,tags,imageUrl,value}
     const {data} = await config.post('/posts',fields)
     console.log(data)

  }
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
      <Button onClick={()=>inputRef.current.click()} variant="outlined" size="large">
        Upload posts image
      </Button>
      <input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
         Delete
       </Button>
        <img className="post-img" src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
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
        <Button onClick={onSubmit} size="large" variant="contained">
          Publish
        </Button>
        <a href="/">
          <Button size="large">No</Button>
        </a>
      </div>
    </Paper>
  );
};
