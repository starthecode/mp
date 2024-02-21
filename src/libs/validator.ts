import * as z from 'zod';

const MAX_FILE_SIZE = 367001600;
const ACCEPTED_FILE_TYPES = ['application/zip'];

export const productFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'title must be at least 3 characters.' })
    .max(1000, { message: 'title should not more than 60 characters.' }),
  desc: z
    .string()
    .min(50, { message: 'Description must be at least 3 characters.' })
    .max(1000, { message: 'Description must be at less than 400 characters.' }),
  imageUrl: z.instanceof(File).refine((value) => value instanceof File, {
    message: 'imageUrl is required and must be a File',
  }),
  downloadLink: z
    .instanceof(File)
    .refine((value) => value instanceof File, {
      message: 'imageUrl is required and must be a File',
    })
    .refine((file) => (file ? true : false), 'Download file required.')
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 350MB.`)
    .refine(
      (file) => (file ? ACCEPTED_FILE_TYPES.includes(file.type) : true),
      'Only .zip format supported.'
    ),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string(),
});

export const userFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'title must be at least 5 characters.' })
    .max(1000, { message: 'title should not more than 60 characters.' }),
  email: z.string(),
  username: z
    .string()
    .min(4, { message: 'username must be at least 4 characters.' })
    .max(8, { message: 'username should not more than 8 characters.' }),
});

export const userAccountSchema = z.object({
  selectedOptions: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .nonempty('Please select at least one option'),
});

export const emailSchema = z.object({
  email: z.string().email(),
  subject: z
    .string()
    .min(10, { message: 'Subject must be at least 10 characters.' }),
  message: z
    .string()
    .min(3, { message: 'Message must be at least 50 characters.' })
    .max(200, { message: 'title should not more than 300 characters.' }),
});
