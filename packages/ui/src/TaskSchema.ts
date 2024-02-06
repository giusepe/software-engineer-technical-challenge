import { z } from 'zod'

export const TaskSchema = z.object({
  id: z
    .number({
      required_error: 'Id is required',
    })
    .min(1, 'Id cannot be empty'),
  title: z
    .string({
      required_error: 'Title is required',
    })
    .trim()
    .min(1, 'Title cannot be empty'),
  completed: z.boolean(),
})
