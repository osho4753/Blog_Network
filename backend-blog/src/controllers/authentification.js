import jwt from 'jsonwebtoken';
import UserModel from '../components/users.js';

export const registration = async (req, res) => {
  try {
      const doc = new UserModel({
          email: req.body.email,
          fullName: req.body.fullName,
          imageUrl: req.body.imageUrl,
          passwordKey: req.body.password,
      });

      const user = await doc.save();

      const token = jwt.sign(
          {
              _id: user._id,
          },
          'secret',
          {
              expiresIn: '30days',
          }
      );

      const { passwordKey, ...userData } = user._doc;
      res.json({
          ...userData,
          token,
      });
  } catch (err) {
      console.log(err);

      res.status(500).json({
          message: 'Error authenticating user',
      });
  }
};

export const login = async (req, res) => {
  try {
      const user = await UserModel.findOne({ email: req.body.email });

      if (!user) {
          res.status(404).json({
              message: 'User not found',
          });
      }

      
      if (user._doc.passwordKey !== req.body.password) {
          res.status(404).json({
              message: 'Wrong password or login',
          });
      }

      const token = jwt.sign(
          {
              _id: user._id,
          },
          'secret',
          {
              expiresIn: '30days',
          }
      );

      const { passwordKey, ...userData } = user._doc;

      res.json({
          ...userData,
          token,
      });
  } catch (err) {
      console.log(err);
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