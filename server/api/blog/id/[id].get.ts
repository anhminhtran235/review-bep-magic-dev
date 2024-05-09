import Blog from "~/server/models/blog.schema";
import mongoose from "mongoose";

const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    // Return luôn. Không cần store vào 1 variable nữa. Trừ khi em cần clarify xem await Blog.findById(id) trả về cái gì thì em
    // mới store vào variable và đặt tên cho nó để giải thích thêm
    return await Blog.findById(id);
  } catch (error: any) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
