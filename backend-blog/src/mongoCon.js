import mongoose from "mongoose";

export default async function mongoCon(){
    try{
        await mongoose.connect('mongodb+srv://ramazanmamanov840:r1o2m3a4@cluster1.oevaek4.mongodb.net/blog?retryWrites=true&w=majority')
        console.log('Connected to');
    }catch(ex){
        console.error(ex);
    }
}

