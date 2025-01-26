import mongoose from 'mongoose';

const OneToOneMessageSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      to: {type: mongoose.Schema.ObjectId, ref: 'User'},
      from: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      type: {
         type: String,
         enum:['text','Media',"Document","Link"]
      },
      createdAt: {
        type: Date,
        default: Date.now()
      },
      text: {
        type: String,
      },
      file: {
       type: String
      }
    },
  ],
});

export default OneToOneMessageSchema = new mongoose.model(
  'OneToOneMessageSchema',
  OneToOneMessageSchema
);
