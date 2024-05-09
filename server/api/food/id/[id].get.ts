import Food from "~/server/models/food.schema";
import mongoose from "mongoose";
import { getServerSession } from "#auth";

const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  try {
    const id = getRouterParam(event, "id");
    const result = await Food.findById(id);
    if (
      result?.is_displayed == false &&
      (!session || session.user?.name !== "admin")
    ) {
      throw createError(appConfig.error.unauthorized);
    }
    return result;
  } catch (error: any) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
