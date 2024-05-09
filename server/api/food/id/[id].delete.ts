import Food from "~/server/models/food.schema";
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
    const result = await Food.findByIdAndDelete(id);
    if (result?.image_url != undefined && result.image_url != "") {
      await $fetch(
        `${runtimeConfig.public.imageDomain}/image/${result.image_url}`,
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
    // Cái error handling logic này anh thấy repeat nhiều lần nhỉ. Em tạo 1 cái 
    // util function handleError() rồi tất cả mọi nơi gọi function đó được ko?
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

// Cho cái này vào 1 cái util file nào đấy
function handleError(error: any, appConfig: any) {
  if (isClientError(error)) {
    throw createError(appConfig.error.badrequest);
  } else {
    throw createError(appConfig.error.internalservererror);
  }
}

function isClientError(error) {
  return z.instanceof(error) ||
    error.statusCode == 400 ||
    error instanceof mongoose.Error.ValidationError ||
    error instanceof mongoose.Error.CastError;
}