import { z } from "zod";
import Cart from "~/server/models/cart.schema";
import Food from "~/server/models/food.schema";
import mongoose from "mongoose";
import { cartBody } from "~/server/utils/zod.post";

const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, (body) => cartBody.parse(body));
    let grandTotal = 0;
    body.orders.forEach(async (e) => {
      const food = await Food.findById(e.food_id, "price");
      grandTotal += food!.price * e.quantity;
    });
    body.grand_total = grandTotal;
    body.is_resolved = false;
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
