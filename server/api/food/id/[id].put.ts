import { getServerSession } from "#auth";
import { z } from "zod";
import Food from "~/server/models/food.schema";
import mongoose from "mongoose";
import { foodBody } from "~/server/utils/zod.post";
const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const id = getRouterParam(event, "id");
    const body = await readValidatedBody(event, (body) => foodBody.parse(body));

    if (body.image_url != undefined && body.image_url != "") {
      // Delete old image
      const oldFood = await Food.findById(id, "image_url");
      if (oldFood?.image_url != undefined && oldFood.image_url != "") {
        await $fetch(
          `${runtimeConfig.public.imageDomain}/image/${oldFood.image_url}`,
          {
            headers: {
              "x-api-key": runtimeConfig.imageXApiKey,
            },
            method: "DELETE",
          },
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
            image_url: body.image_url,
            resize_width: appConfig.imageSettings.product.width,
            resize_height: appConfig.imageSettings.product.height,
          },
        },
      );
      body.image_url = res.image_url;
    }
    await Food.findByIdAndUpdate(id, body);
    return appConfig.success;
  } catch (error: any) {
    if (
      error.statusCode == 400 ||
      z.instanceof(error) ||
      error instanceof mongoose.Error.ValidationError ||
      error instanceof mongoose.Error.CastError
    ) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
