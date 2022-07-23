import { object, string } from 'yup';

export const createChatSchema = object({
  body: object({
    _id: string().required('Id is required'),
  }),
});
