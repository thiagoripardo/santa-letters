import { Document, Schema, Model, model } from "mongoose";

export interface ILetter extends Document {
  subject: String;
  body: String;
  wasRead: Boolean;
}

const letterSchema = new Schema({
  subject: String,
  body: { 
    type: String, 
    required: true,
  },
  wasRead: {
		type: Boolean,
		default: false
	},
  createdAt: {
		type: Date,
		default: Date.now
	},
  modifiedAt: {
		type: Date,
		default: Date.now
	},
});

const Letter: Model<ILetter> = model<ILetter>("letters", letterSchema);
export default Letter;