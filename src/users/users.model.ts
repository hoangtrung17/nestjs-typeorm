import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  facebookId: { type: String }
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default mongoose.model<User>('User', UserSchema);