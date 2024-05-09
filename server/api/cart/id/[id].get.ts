import Cart from "~/server/models/cart.schema";
import mongoose from "mongoose";

const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const result = await Cart.findById(id).populate({
      path: "orders.food",
      select: "name price",
    });
    return result;
  } catch (error: any) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
