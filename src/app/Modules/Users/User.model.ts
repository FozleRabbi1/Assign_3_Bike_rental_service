import { Schema, model } from 'mongoose';
import { TUser } from './User.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

UserSchema.set('toJSON', {
  transform: function (document, upData) {
    delete upData.password;
    return upData;
  },
});

export const User = model<TUser>('User', UserSchema);
