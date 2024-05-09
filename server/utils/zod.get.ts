import { z } from "zod";

const appConfig = useAppConfig();

export const cartQuery = z
  .object({
    filter: z
      .string()
      .transform((val) => val.trim())
      .default("0"),
    sort: z
      .string()
      .transform((val) => val.trim())
      .default("0"),
    page: z
      .string()
      .transform((val) => parseInt(val))
      .default("1"),
    limit: z
      .string()
      .transform((val) => parseInt(val))
      .default("1"),
  })
  .strict()
  .refine((data) => appConfig.cartFilter[data.filter] !== undefined, {
    path: ["filter"],
    message: "Filter is invalid",
  })
  .refine((data) => appConfig.cartSort[data.sort] !== undefined, {
    path: ["sort"],
    message: "Sort is invalid",
  })
  .refine((data) => data.page >= 1, {
    path: ["page"],
    message: "Page is invalid",
  })
  .refine((data) => data.limit >= 1, {
    path: ["limit"],
    message: "Limit is invalid",
  });

export const foodQuery = z
  .object({
    filter: z
      .string()
      .transform((val) => val.trim())
      .default("0"),
  })
  .strict()
  .refine((data) => appConfig.foodFilter[data.filter] !== undefined, {
    path: ["filter"],
    message: "Filter is invalid",
  });

export const blogQuery = z
  .object({
    title: z
      .string()
      .transform((val) => val.trim())
      .default(""),
    sort: z
      .string()
      .transform((val) => val.trim())
      .default("0"),
    page: z
      .string()
      .transform((val) => parseInt(val))
      .default("1"),
    limit: z
      .string()
      .transform((val) => parseInt(val))
      .default("1"),
  })
  .partial({ title: true })
  .strict()
  .refine((data) => appConfig.blogSort[data.sort] !== undefined, {
    path: ["sort"],
    message: "Sort is invalid",
  })
  .refine((data) => data.page >= 1, {
    path: ["page"],
    message: "Page is invalid",
  })
  .refine((data) => data.limit >= 1, {
    path: ["limit"],
    message: "Limit is invalid",
  });
