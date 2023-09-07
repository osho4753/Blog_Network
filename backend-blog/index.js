import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import checkLogin from './utils/checkLogin.js'
import {registerValidation,loginValidation,postCreateValidation} from './validations/auth.js';
import {registration,login,getInfo} from './controllers/authentification.js'
import {postCreate,getAllPosts,getLastTags,getOnePost,deletePost,updatePost} from './controllers/postControll.js'
import valErrors from './utils/valErrors.js';


mongoose.connect('mongodb+srv://ramazanmamanov840:r1o2m3a4@cluster1.oevaek4.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => {
console.log('DB connect');
})
.catch((err) => {
  console.log(err,'error');
});
const app = express();

const storage = multer.diskStorage({
  destination: (_, __,cb)=>{
    cb(null,'uploadImages');
  },
  filename:(_,file,cb)=>{
    cb(null,file.originalname)
  }
})

const upload = multer({storage});

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploadImages'))

app.post('/auth/register',registerValidation, valErrors, registration);
app.post('/auth/login',loginValidation, valErrors, login);
app.get('/auth/me',checkLogin, getInfo);

app.post('/uploads',checkLogin,upload.single('image'),(req,res)=>{
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})
app.get('/tags',getLastTags);

app.get('/posts',getAllPosts);
app.get('/posts/:id',getOnePost);


app.post('/posts',checkLogin,postCreateValidation,valErrors,postCreate);
app.delete('/posts/:id',checkLogin,deletePost);
app.patch('/posts/:id',checkLogin,valErrors,updatePost);



app.listen(4444, (err) => {

if (err){
  return console.log('error');
}

console.log('listening on')
})