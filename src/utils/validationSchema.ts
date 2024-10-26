import * as z from 'zod'

export const userFormSchema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  type: z.enum(['Writer', 'Editor']),
  status: z.enum(['Active', 'Inactive']),
})

export const companyFormSchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  logo: z.string().url('Invalid logo URL'),
  status: z.enum(['Active', 'Inactive']),
})

export const articleFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  image: z.any().optional(),
  link: z.string().url('Invalid link URL'),
  date: z.string().min(1, 'Date is required'),
  content: z.string().min(1, 'Content is required'),
  companyId: z.number().min(1, 'Company is required'),
})
