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
    const id = getRouterParam(event, "id");
    const body = await readValidatedBody(event, (body) => blogBody.parse(body));
    if (body.banner_url !== undefined && body.banner_url !== "") {
      // Delete old image
      const oldBlog = await Blog.findById(id, "banner_url");
      if (oldBlog?.banner_url != undefined && oldBlog.banner_url != "") {
        await $fetch(
          `${runtimeConfig.public.imageDomain}/image/${oldBlog.banner_url}`,
          {
            headers: {
              "x-api-key": runtimeConfig.imageXApiKey,
            },
            method: "DELETE",
          }
        );
      }
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
        }
      );
      body.banner_url = res.image_url;
    }
    await Blog.findByIdAndUpdate(id, body);
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
