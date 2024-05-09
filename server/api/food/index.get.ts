import { getServerSession } from "#auth";
import { z } from "zod";
import Food from "~/server/models/food.schema";

import { foodQuery } from "~/server/utils/zod.get";

const appConfig = useAppConfig();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  try {
    if (!session || session.user?.name !== "admin") {
      const result = Food.find({ is_displayed: true }).sort({ updated_at: -1 });
      return result;
    } else {
      const query = await getValidatedQuery(event, (query) =>
        foodQuery.parse(query),
      );
      const filter = query.filter;
      const result = Food.find(appConfig.foodFilter[filter], {
        "nutritional_value._id": 0,
      });
      return result;
    }
  } catch (error: any) {
    if (z.instanceof(error)) {
      throw createError(appConfig.error.badrequest);
    } else {
      throw createError(appConfig.error.internalservererror);
    }
  }
});
