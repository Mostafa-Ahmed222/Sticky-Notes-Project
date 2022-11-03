import { Types, Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    noteBody: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref : 'User',
      required: true,
    },
    Picture: String
  },
  {
    timestamps: true,
  }
);
const noteModel = model('Note', noteSchema)
export default noteModel