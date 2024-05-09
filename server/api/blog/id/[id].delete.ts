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
      await $fetch(
        `${runtimeConfig.public.imageDomain}/image/${result.banner_url}`,
        {
          headers: {
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
