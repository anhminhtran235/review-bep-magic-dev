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
      // Nếu viết như này mà order có 1000 items thì em sẽ phải gọi database 1000 lần. Mỗi lần gọi database là em
      // phải set up connection rồi làm đủ trò nên nó rất tốn thời gian. Em nên viết 1 query để lấy tất cả food
      // const allFoodId = body.orders.map((order) => order.food);
      // const allFood = await Food.find({ _id: { $in: allFoodId } }, "price");
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
