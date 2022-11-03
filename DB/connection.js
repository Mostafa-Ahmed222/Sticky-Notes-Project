import mongoose from "mongoose";

const connectDB = async()=>{
    return await mongoose.connect(process.env.DBURI).then(()=>{
        console.log(`connectDB at..... ${process.env.DBURI}`);
    }).catch((err)=>{
        console.log(`fail to connectDB ${err}`);
    })
}
export default connectDB