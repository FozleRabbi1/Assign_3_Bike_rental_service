import { TUser } from './User.interface';
import { User } from './User.model';

const createUserInto = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getUserFormBD = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

export const UserService = {
  createUserInto,
  getUserFormBD,
};
