import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import checkLogin from './utils/checkLogin.js'
import {registerValidation,loginValidation,postCreateValidation} from './validations/auth.js';
import {registration,login,getInfo} from './controllers/authentification.js'
import {postCreate,getAllPosts,getLastTags,getOnePost,deletePost,updatePost,getPostsByTag,commentAdd} from './controllers/postControll.js'
import valErrors from './utils/valErrors.js';
import mongoCon from './mongoCon.js';

mongoCon()

const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (_, __,cb)=>{
    cb(null,'/uploads');
  },
  filename:(_,file,cb)=>{
    cb(null,file.originalname)
  }
})

const upload = multer({storage});

app.use('/uploads', express.static('/uploads'));
app.post('/uploads/avatar',upload.single('image'),(req,res)=>{
  res.json({
    url: `http://localhost:4444/uploads/${req.file.originalname}`,
  })
})
app.post('/uploads',checkLogin,upload.single('image'),(req,res)=>{
  res.json({
    url: `http://localhost:4444/uploads/${req.file.originalname}`,
  })
})


app.post('/auth/register',registerValidation, valErrors, registration);
app.post('/auth/login',loginValidation, valErrors, login);
app.get('/auth/me',checkLogin, getInfo);


app.get('/tags',getLastTags);
app.post('/tags/:name',getPostsByTag);

app.get('/posts',getAllPosts);
app.get('/posts/:id',getOnePost);

app.post('/posts',checkLogin,postCreateValidation,valErrors,postCreate);
app.post('/posts/comment/:id',checkLogin,commentAdd);

app.delete('/posts/:id',checkLogin,deletePost);
app.patch('/posts/:id',checkLogin,valErrors,updatePost);

app.listen(4444, (err) => {

if (err){
  return console.log('error');
}

console.log('listening on')
})