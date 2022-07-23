import Chat, { ChatDocument } from '../models/Chat.model';
import { FilterQuery } from 'mongoose';
import CustomError from '../errors/CustomError';

class ChatService {
  constructor() {}

  public createChat = async (data: Object) => {
    const chat = await this.findChat(data);
    if (chat) throw new CustomError('Bad Request', 'Chat already exists', 400);
    return await Chat.create(data);
  };

  public findChat = async (query: FilterQuery<ChatDocument>) => {
    return await Chat.findOne(query).lean();
  };

  public findChatWithoutLean = async (query: FilterQuery<ChatDocument>) => {
    return await Chat.findOne(query);
  };

  public addMessageToChat = async (chatId: string,messageId:string) => {
    const chat: ChatDocument & ChatDocument['_id'] =
      await this.findChatWithoutLean({ _id:chatId });
    await chat.messages.push(messageId);
    await chat.save();
  };
}

export default ChatService;
