import { getServerSession } from "#auth";
import Cart from "~/server/models/cart.schema";
import mongoose from "mongoose";
const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const id = getRouterParam(event, "id");
    await Cart.findByIdAndDelete(id);
    return appConfig.success;
  } catch (error: any) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
