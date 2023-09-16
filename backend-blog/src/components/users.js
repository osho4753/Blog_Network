import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
fullName:{
    type : String,
    required: true
},
email:{
    type : String,
    required: true,
    unique : true
},
passwordKey:{
    type : String,
    required: true
},
imageUrl: {
    type:String,
required: false,
},

},{
    timestamps: true,

},
);
export default mongoose.model('User',UserSchema);