import express from 'express';
import mongoose from 'mongoose';
import checkLogin from './utils/checkLogin.js'
import {registerValidation,loginValidation,postCreateValidation} from './validations/auth.js';
import {registration,login,getInfo} from './controllers/authentification.js'
import {postCreate,getAllPosts,getOnePost,deletePost,updatePost} from './controllers/postControll.js'


mongoose.connect('mongodb+srv://ramazanmamanov840:r1o2m3a4@cluster1.oevaek4.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => {
console.log('DB connect');
})
.catch((err) => {
  console.log(err,'error');
});
const app = express();

app.use(express.json());

app.post('/auth/register',registerValidation, registration);
app.post('/auth/login',loginValidation, login);
app.get('/auth/me',checkLogin, getInfo);

app.get('/posts',getAllPosts);
app.get('/posts/:id',getOnePost);

app.post('/posts',checkLogin,postCreateValidation, postCreate);
app.delete('/posts/:id',checkLogin,deletePost);
app.patch('/posts/:id',checkLogin,updatePost);



app.listen(4444, (err) => {

if (err){
  return console.log('error');
}

console.log('listening on')
})