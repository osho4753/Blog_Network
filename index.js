import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import UserModel from './components/users.js'
import {validationResult} from 'express-validator';
import {registerValidation} from './validations/auth.js';

mongoose.connect('mongodb+srv://ramazanmamanov840:r1o2m3a4@cluster1.oevaek4.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => {
console.log('DB connect');
})
.catch((err) => {
  console.log(err,'error');
});
const app = express();

app.use(express.json());

app.post('/auth/login', async(req, res) => {
  try{
    const user = await UserModel.findOne({email: req.body.email});

    if(!user){
      res.status(404).json({
        message: 'User not found',
      })
    }

    const isValidPassword = await bcrypt.compare(req.body.password,user._doc.passwordKey)

    if(!isValidPassword){
      res.status(404).json({
        message:'Wrong password or login',
      })
    }


    const token = jwt.sign({

      _id: user._id,

    },
    'secret',
    {

      expiresIn: '30days',

    },
    );

    const { passwordKey , ...userData } = user._doc

    res.json({
    ...userData,
    token
  });

  }catch(err){
    console.log(err)
    res.json({
      message:'Cant auth'
    })
  }
})

app.post('/auth/register',registerValidation, async (req, res) => {
try{

  const error = validationResult(req)
  
  if(!error.isEmpty()) {
    return res.status(400).json(error.array());
  }

  const password = req.body.password;

  const salt = await bcrypt.genSalt(10);

  const Key = await bcrypt.hash(password,salt);

  const doc = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    imageUrl: req.body.imageUrl,
    passwordKey:Key,
  }) 

  const user = await doc.save()

  const token = jwt.sign({
    _id: user._id,
  }
  ,'secret',
  {
    expiresIn: '30days',
  },
  );

  const { passwordKey , ...userData } = user._doc
  res.json({
    ...userData,
    token
  });

}catch(err){

  console.log(err);

  res.status(500).json({
    message:'Error authenticating user'
  })

}
});

app.listen(4444, (err) => {

if (err){
  return console.log('error');
}

console.log('listening on')
})