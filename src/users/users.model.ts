import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  role_id: [Schema.Types.ObjectId],
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  facebookId: { type: String },
  googleId: { type: String },
  token: { type: String }
});

export interface User extends mongoose.Document {
  id: string;
  role_id: Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  avatar: string;
  facebookId: string;
  googleId: string;
  token: string;
}

export default mongoose.model<User>('User', UserSchema);