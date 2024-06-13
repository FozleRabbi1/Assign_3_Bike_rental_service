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

const updateUserFormBD = async (email: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ email }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const UserService = {
  createUserInto,
  getUserFormBD,
  updateUserFormBD,
};
