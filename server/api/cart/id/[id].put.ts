import { z } from "zod";
import { getServerSession } from "#auth";
import Cart from "~/server/models/cart.schema";
import mongoose from "mongoose";
import { cartBody } from "~/server/utils/zod.post";

const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const id = getRouterParam(event, "id");
    const body = await readValidatedBody(event, (body) => cartBody.parse(body));
    await Cart.findByIdAndUpdate(id, body);
    return appConfig.success;
  } catch (error: any) {
    if (
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
