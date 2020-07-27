
import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
  roleName: { type: String, required: true },
});

export interface Role extends mongoose.Document {
  id: string;
  name: string;
}

export default mongoose.model<Role>('Role', RoleSchema);