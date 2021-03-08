import { model, Schema } from "mongoose";

const LetterSchema = new Schema({
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

export interface Letter {
  subject: String;
  body: String;
}

export default model('letters', LetterSchema);