import { omit } from 'lodash';
import { FilterQuery } from 'mongoose';
import User, { UserDocument } from '../models/User.model';

class UserService {
  constructor() {}

  public register = async (data: UserDocument) => {
    return await User.create(data);
  };

  public findUser = async (query: FilterQuery<UserDocument>) => {
    return await User.findOne(query).lean();
  };

  public isUserAvailable = async (query: FilterQuery<UserDocument>) => {
    const user = await this.findUser(query);

    if (!user) {
      return false;
    }
    return true;
  };

  public findUserWithoutLean = async (query: FilterQuery<UserDocument>) => {
    return await User.findOne(query);
  };

  public validatePassword = async ({
    email,
    password,
  }: {
    email: UserDocument['email'];
    password: string;
  }) => {
    const user = await User.findOne({ email });

    if (!user) return false;

    const isValid = await user.comparePassword(password);

    if (!isValid) return false;

    return omit(user.toJSON(), 'password');
  };

  public addChatToUser = async (_id: string, chatId: string) => {
    const user: UserDocument & UserDocument['_id'] =
      await this.findUserWithoutLean({ _id });
    await user.chats.push(chatId);
    await user.save();
  };
}

export default UserService;
