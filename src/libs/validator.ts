import * as z from 'zod';

const MAX_FILE_SIZE = 2000000;
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
  imageUrl: z.any(),
  downloadLink: z
    .any()
    .refine((file) => (file ? true : false), 'Download file required.')
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
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
  selectedOptions: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .nonempty('Please select at least one option'),
});
