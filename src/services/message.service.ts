import { FilterQuery } from 'mongoose';
import Message, { MessageDocument } from '../models/Message.model';

class MessageService {
  constructor() {}

  public createMessage = async (data: Object) => {
    return await Message.create(data);
  };

  public findMessage = async (query: FilterQuery<MessageDocument>) => {
    return await Message.findOne(query).lean();
  };
}

export default MessageService;
