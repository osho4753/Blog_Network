import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../components/users.js';

export const registration = async (req, res) => {
    try{
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
};

export const login = async(req, res) => {
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
};

export const getInfo = async (req, res) => {
    try{
    
      const user = await UserModel.findById(req.userId);
    
      if(!user) {
        res.status(404).json({
          message: 'not found'
        }); 
      }
    
    
      const { passwordKey , ...userData } = user._doc
    
      res.json(userData);
    
    }catch(err){
      console.log(err)
      res.json({
        message:'Cant Found token'
      })
    }
};