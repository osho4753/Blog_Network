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
imageUrl: String
},{
    timestamps: true,

},
);
export default mongoose.model('User',UserSchema);