import mongoose, { Schema, Document } from 'mongoose';


export interface IWebAdmin extends Document {
  name: string;
  password: string;
  email: string;
}


const WebAdminSchema: Schema = new Schema<IWebAdmin>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  {
    timestamps: true, 
  }
);


const WebAdmin = mongoose.models.WebAdmin || mongoose.model<IWebAdmin>('WebAdmin', WebAdminSchema);

export default WebAdmin;