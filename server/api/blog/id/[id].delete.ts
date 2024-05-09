import Blog from "~/server/models/blog.schema";
import mongoose from "mongoose";
import { getServerSession } from "#auth";

const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const id = getRouterParam(event, "id");
    const result = await Blog.findByIdAndDelete(id);
    if (result?.banner_url != undefined && result.banner_url != "") {
      // Những cái HTTP requests kiểu này em nên cho vào 1 cái service. Em có thể
      // gọi nó là HttpService. Với cả anh hỏi ChatGPT thì dùng axios tốt hơn là $fetch
      await $fetch(
        `${runtimeConfig.public.imageDomain}/image/${result.banner_url}`,
        {
          headers: {
            // Hình như DELETE, PUT, và POST requests nào em cũng cần x-api-key à?
            // Nếu là như vậy thì em có thể intercept tất cả các DELETE, PUT, và POST requests và thêm cái x-api-key header
            // này để tránh lần nào cũng phải add
            "x-api-key": runtimeConfig.imageXApiKey,
          },
          method: "DELETE",
        }
      );
    }
    return appConfig.success;
  } catch (error: any) {
    if (
      error.statusCode == 400 ||
      error instanceof mongoose.Error.ValidationError ||
      error instanceof mongoose.Error.CastError
    ) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});


// Trông nó kiểu kiểu như này
// HttpService.ts
class HttpService {
  constructor() {
    this.appConfig = useAppConfig();
    this.runtimeConfig = useRuntimeConfig();
    
    axios.interceptors.request.use(request => {
      if (['DELETE', 'PUT', 'POST'].includes(request.method)) {
        request.headers['x-api-key'] = this.runtimeConfig.imageXApiKey;
      }
    });
  }

  async deleteImage(url) {
    return await axios.delete(`${this.runtimeConfig.public.imageDomain}/image/${url}`);
  }

  ...
}