import { getServerSession } from "#auth";
import { z } from "zod";
import Cart from "~/server/models/cart.schema";
import mongoose from "mongoose";
import { cartQuery } from "~/server/utils/zod.get";

const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError(appConfig.error.unauthorized);
  }
  try {
    const query = await getValidatedQuery(event, (query) =>
      cartQuery.parse(query),
    );
    const result = await Cart.find(appConfig.cartFilter[query.filter])
      .sort(appConfig.cartSort[query.sort])
      .skip((query.page - 1) * query.limit)
      .limit(query.limit)
      .populate({ path: "orders.food", select: "name price -_id" });
    return result;
  } catch (error: any) {
    if (z.instanceof(error)) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
