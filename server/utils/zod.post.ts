import { z } from "zod";

export const cartBody = z
  .object({
    orders: z.array(
      z
        .object({
          food: z.string().transform((val) => val.trim()),
          quantity: z.number(),
        })
        .refine((data) => data.quantity >= 1, {
          path: ["quantity"],
          message: "Quantity is invalid",
        }),
    ),
    grand_total: z.number(),
    phone_number: z.string().transform((val) => val.trim()),
    delivery_address: z.string().transform((val) => val.trim()),
    status: z.string().transform((val) => val.trim()),
    notes: z.string().transform((val) => val.trim()),
  })
  .deepPartial()
  .strict();

export const foodBody = z
  .object({
    name: z.string().transform((val) => val.trim()),
    image_url: z.string().transform((val) => val.trim()),
    price: z.number(),
    category: z.string().transform((val) => val.trim()),
    description: z.string().transform((val) => val.trim()),
    is_displayed: z.boolean(),
    nutritional_value: z.object({
      protein: z.number(),
      carbs: z.number(),
      fat: z.number(),
      fiber: z.number(),
    }),
  })
  .deepPartial()
  .strict();

export const blogBody = z
  .object({
    title: z.string().transform((val) => val.trim()),
    banner_url: z.string().transform((val) => val.trim()),
    paragraphs: z.array(z.string().transform((val) => val.trim())),
  })
  .deepPartial()
  .strict();
