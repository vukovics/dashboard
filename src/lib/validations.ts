import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  status: z.enum(['active', 'on_hold', 'completed'], {
    message: 'Invalid status',
  }),
  deadline: z.string().refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
  }, 'Invalid date format'),
  assigned_to: z.string().min(1, 'Assigned to is required').max(100, 'Name must be less than 100 characters'),
  budget: z.number().min(0, 'Budget must be positive').max(999999999999, 'Budget too large'),
});

export type ProjectInput = z.infer<typeof projectSchema>;
