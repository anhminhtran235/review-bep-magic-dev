import { z } from "zod";
import Blog from "~/server/models/blog.schema";
import mongoose from "mongoose";
import { blogQuery } from "~/server/utils/zod.get";
import escapeStringRegexp from "escape-string-regexp";
const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  try {
    // Nên viết code ngắn lại mà vẫn đủ hiểu
    const {title, sort, page, limit} = await getValidatedQuery(event, (query) =>
      blogQuery.parse(query),
    );

    // Đoạn code nào khó hiểu em có thể giải thích bằng việc nó ra thành variable và đặt tên variable phù hợp 
    const matchingTitle = title == undefined || title == ""
                          ? {}
                          : { title: new RegExp(`.*${escapeStringRegexp(title)}.*`, "i") }

    // Làm như vậy thì em cũng hiểu ngay dòng 21 là match tittle
    const result = await Blog.find(matchingTitle)
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
