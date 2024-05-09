import { z } from "zod";
import Blog from "~/server/models/blog.schema";
import mongoose from "mongoose";
import { blogQuery } from "~/server/utils/zod.get";
import escapeStringRegexp from "escape-string-regexp";
const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  try {
    const query = await getValidatedQuery(event, (query) =>
      blogQuery.parse(query),
    );

    const title = query.title;
    const sort = query.sort;
    const page = query.page;
    const limit = query.limit;
    const result = await Blog.find(
      title == undefined || title == ""
        ? {}
        : { title: new RegExp(`.*${escapeStringRegexp(title)}.*`, "i") },
    )
      .sort(appConfig.blogSort[sort])
      .skip((page - 1) * limit)
      .limit(limit);
    return result;
  } catch (error: any) {
    console.log(error);
    if (z.instanceof(error)) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
