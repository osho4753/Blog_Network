import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import config from '../../config'
import { useNavigate, useParams } from 'react-router-dom';
export const AddPost = () => {
  const {id} = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate()
  const inputRef = React.useRef(null)
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [postUrl, setPostUrl] = React.useState('');

  const handleChangeFile = async (event) => {
    try{
        const formData = new FormData()
        const file = await event.target.files[0];
        formData.append('image',file);
        const {data} = await config.post('/uploads',formData);
        setPostUrl(data.url)    
      }catch(err){
      console.log(err);

    }  
  };

  const onClickRemoveImage = () => {
    setPostUrl('')
  };
  const onSubmit = async () => {
    try{
    const fields = {
      title,
      tags: tags.split(','),
      postUrl,
      text
    }
     const {data} = isEdit ? 
     await config.patch(`/posts/${id}`,fields) : 
     await config.post('/posts',fields);

      const _id = isEdit ? id : data._id

      navigate(`/posts/${_id}`)
    }catch(err){
      console.log(err,'Wrong adding post data!');
    }
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
  React.useEffect(() => {
    if (id) 
      config.get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setTags(data.tags.join(',')); 
          setPostUrl(data.postUrl);
          setText(data.text);
        })
        .catch(err => {
          console.warn(err, 'BIG ERROR ');
        });
  

  }, []);
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={()=>inputRef.current.click()} variant="outlined" size="large">
        Upload posts image
      </Button>
      <input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
      {postUrl && (
        <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
         Delete
       </Button>
        <img className="post-img" src={`${postUrl}`} alt="Uploaded" />
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
      classes="arrayField" 
      variant="standard" 
      placeholder="Tags" 
      value = {tags}
      onChange={(e)=>(setTags(e.target.value))}
      fullWidth />
      <TextField
      value={text}
      onChange={(e)=>(setText(e.target.value))}
      classes="textField"
      variant="standard"
      placeholder="Type your post"
      fullWidth
      {...options} 
/>
      <div className="button">
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEdit ? "Edit" : "Publish"}
        </Button>
        <a href="/">
          <Button size="large">No</Button>
        </a>
      </div>
    </Paper>
  );
};
