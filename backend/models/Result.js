import mongoose from 'mongoose';
const { Schema } = mongoose;

const marksSchema = new Schema({
  maxMarks: {
    type: Number,
    required: true
  },
  marksObtained: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  Topic:{
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const marks = mongoose.model('Marks', marksSchema);
export default marks;
