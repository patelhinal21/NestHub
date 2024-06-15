import mongoose, { mongo } from "mongoose";
import passwordComplexity from "joi-password-complexity";
import Joi from "joi";
//Schema for messages in chat feature
const schema = new mongoose.Schema({



      timestamp: {
            type: Date

      },

      from_emailId: {
            type: String

      },

      to_emailId: {
            type: String

      },
      message: {
            type: String
      }


}, { timestamps: true, versionKey: false });

const messagemodel = mongoose.model('messages', schema);

export { messagemodel }