import { TUser } from './User.interface';
import { User } from './User.model';

const createUserInto = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

export const UserService = {
  createUserInto,
};
