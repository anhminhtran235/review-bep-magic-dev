import { z } from "zod";

export const cartBody = z
  .object({
    orders: z.array(
      z.object({
        food_id: z.string().transform((val) => val.trim()),
        quantity: z.number(),
      })
    ),
    grand_total: z.number(),
    phone_number: z.string().transform((val) => val.trim()),
    delivery_address: z.string().transform((val) => val.trim()),
    is_resolved: z.boolean(),
  })
  .strict();
