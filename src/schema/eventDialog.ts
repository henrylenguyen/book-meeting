import { z } from 'zod'

const eventDialogSchema = z.object({
  title: z.string().min(2).max(50),
  attendees: z.optional(
    z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        email: z.string()
      })
    )
  ),
  eventTime: z.object({
    startDate: z.string(),
    startTime: z.string().optional(),
    endDate: z.string(),
    endTime: z.string().optional()
  }),
  events: z.string().optional(),
  recurrence: z.optional(
    z.object({
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      repeatEvery: z.number().positive('Repeat every should be a positive number').optional(),
      repeatType: z.string().optional(),
      repeatUnit: z.string()
    })
  ),
  location: z.string().optional(),
  timezone: z.string().optional(),
  color: z.string().optional(),
  description: z.string().optional()
})

export default eventDialogSchema
