import { getServerSession } from "#auth";
import { z } from "zod";
import Blog from "~/server/models/blog.schema";
import mongoose from "mongoose";
import { blogBody } from "~/server/utils/zod.post";

const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const body = await readValidatedBody(event, (body) => blogBody.parse(body));
    // Em viết như này thì nó check cả not null nữa. Cho thêm cả .trim() cũng ok
    // if ('')    if (underfined)    if (null)    if (0)    if (false)   đều return false
    if (body.banner_url.trim()) {
      const res: { image_url: string } = await $fetch(
        `${runtimeConfig.public.imageDomain}/image`,
        {
          headers: {
            "x-api-key": runtimeConfig.imageXApiKey,
          },
          method: "POST",
          body: {
            image_url: body.banner_url,
            resize_width: appConfig.imageSettings.banner.width,
            resize_height: appConfig.imageSettings.banner.height,
          },
        },
      );
      body.banner_url = res.image_url;
    }
    await new Blog(body).save();
    return appConfig.success;
  } catch (error: any) {
    if (
      z.instanceof(error) ||
      error instanceof mongoose.Error.ValidationError
    ) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
