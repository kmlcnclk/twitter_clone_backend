import { object, string } from 'yup';

export const createMessageSchema = object({
  body: object({
    chatId: string().required('Chat id is required'),
    content: string().required('Content is required.'),
  }),
});
