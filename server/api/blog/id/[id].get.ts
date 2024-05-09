import Blog from "~/server/models/blog.schema";
import mongoose from "mongoose";

const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const result = await Blog.findById(id);
    return result;
  } catch (error: any) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
