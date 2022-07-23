import { object, string, ref, date, number } from 'yup';

export const registerUserSchema = object({
  body: object({
    name: string().required('Name is required'),
    password: string()
      .required('Password is required')
      .min(8, 'Password is too short - should be 8 chars minimum')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
    email: string().email('Must be a valid email'),
    phone: string(),
    birthDate: object({
      day: number().required('Day is required'),
      month: string().required('Month is required'),
      year: number().required('Year is required'),
    }).required('Birth Date is required'),
    // passwordConfirmation: string()
    //   .oneOf([ref('password'), null], 'Password must match')
    //   .required('Password Confirmation is required'),
    // username: string()
    //   .required('Username is required')
    //   .min(2, 'Username is too short - should be 6 chars minimum')
    //   .matches(/^[a-zA-Z0-9_.-]*$/, 'Username can only contain Latin letters.'),
    // profileText: string(),
    // location: string(),
  }),
});
