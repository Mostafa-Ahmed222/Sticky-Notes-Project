import { Types, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    profilePic : {type: String},
    notes: [{type: Types.ObjectId, ref: 'Note'}]
  },
  {
    timestamps: true,
  }
);
const userModel = model('User', userSchema)
export default userModel