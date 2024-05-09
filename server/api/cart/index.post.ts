import { z } from "zod";
import { getServerSession } from "#auth";
import Cart from "~/server/models/cart.schema";
import Food from "~/server/models/food.schema";
import mongoose from "mongoose";
import { cartBody } from "~/server/utils/zod.post";

const appConfig = useAppConfig();
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  try {
    const body = await readValidatedBody(event, (body) => cartBody.parse(body));
    let grandTotal = 0;
    for (let i = 0; i < body.orders.length; i++) {
      const food = await Food.findById(body.orders[i].food, "price");
      grandTotal += food!.price * body.orders[i].quantity;
    }
    body.grand_total = grandTotal;
    if (!session || session.user?.name !== "admin") {
      body.status = "pending";
    }

    const result = await new Cart(body).save();
    return { order_id: result._id };
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
