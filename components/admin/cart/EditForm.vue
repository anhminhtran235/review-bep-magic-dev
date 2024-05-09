<template>
  <div class="mt-4">
    <AdminMiscButtonIcon
      @action="resetForm"
      icon-name="material-symbols:restart-alt-rounded"
      dynamic-class="hover:bg-black/10"
    />
    <form @submit.prevent="handleEditItem" class="mt-4">
      <div class="grid-col-1 grid w-full gap-4 md:grid-cols-2 2xl:w-1/2">
        <!-- Order Table -->
        <div
          v-if="orders.length > 0"
          class="relative col-span-2 mt-4 overflow-x-auto sm:rounded-lg"
        >
          <table class="w-full text-left text-sm text-black">
            <thead class="bg-black/5 text-xs uppercase">
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Price</th>
              <th scope="col" class="px-6 py-3">Quantity</th>
              <th scope="col" class="px-6 py-3">Total</th>
            </thead>
            <tbody>
              <tr
                v-for="order in orders"
                class="border-b bg-white"
                :key="order.food._id"
              >
                <td class="px-6 py-4">{{ order.food.name }}</td>
                <td class="px-6 py-4">
                  {{
                    order.food.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  }}
                </td>
                <td class="px-6 py-4">{{ order.quantity }}</td>
                <td class="px-6 py-4">
                  {{
                    (order.food.price * order.quantity).toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      },
                    )
                  }}
                </td>
              </tr>
              <tr class="border-b bg-white">
                <td class="border-r px-6 py-4 font-bold" colspan="3">
                  GRAND TOTAL
                </td>
                <td class="px-6 py-4">
                  {{
                    grandTotal.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Order Table -->
        <AdminMiscOrderSelectInput
          input-label="Item"
          v-model:input="orderItem"
          :options="foods.list"
        />
        <div class="flex gap-4">
          <AdminMiscNumberInput
            input-label="Quantity"
            v-model:input="orderQuantity"
          />
          <AdminMiscButtonIcon
            @action="handleAddOrder"
            icon-name="material-symbols:add-circle-outline-rounded"
            dynamic-class="hover:bg-black/10"
          />
        </div>

        <AdminMiscTextInput
          input-label="Phone Number"
          v-model:input="phoneNumber"
        />
        <AdminMiscTextInput
          input-label="Delivery Address"
          v-model:input="deliveryAddress"
        />
        <AdminMiscTextAreaInput
          input-label="Notes"
          v-model:input="notes"
          rows="4"
        />
        <AdminMiscSelectInput
          input-label="Status"
          :options="appConfig.statusOptions"
          v-model:input="status"
        />
        <div class="col-span-2">
          <AdminMiscSubmitButton />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
const { $toast } = useNuxtApp();

const route = useRoute();

const foods = useFoodStore();

// fetch all food exist
function foodsFetch() {
  foods.fetchAdmin(`filter=0`);
}

await callOnce(foodsFetch);

const orderItem = ref<DOrderItem>();
const orderQuantity = ref<number>(1);

const orders = ref<Array<DOrderDetails>>([]);
const grandTotal = ref<number>(0);
const phoneNumber = ref<string>("");
const deliveryAddress = ref<string>("");
const status = ref<string>();
const notes = ref<string>("");

function handleAddOrder() {
  if (orderItem.value != undefined) {
    const pushVal = {
      food: orderItem.value,
      quantity: orderQuantity.value,
    };
    orders.value?.push(pushVal);
    grandTotal.value += orderItem.value.price * orderQuantity.value;
    // Reset the form
    orderItem.value = undefined;
    orderQuantity.value = 1;
  }
}

async function handleEditItem() {
  let requestedBody: { [key: string]: any } = {};
  if (orders.value.length > 0) {
    requestedBody.orders = [];
    for (let i = 0; i < orders.value.length; i++) {
      requestedBody.orders.push({
        food: orders.value[i].food._id,
        quantity: orders.value[i].quantity,
      });
    }
  }
  if (grandTotal.value > 0) {
    requestedBody.grand_total = grandTotal.value;
  }
  if (phoneNumber.value != "") {
    requestedBody.phone_number = phoneNumber.value;
  }
  if (deliveryAddress.value != "") {
    requestedBody.delivery_address = deliveryAddress.value;
  }
  if (status.value != "") {
    requestedBody.status = status.value;
  }
  if (notes.value != "") {
    requestedBody.notes = notes.value;
  }
  const { data, error } = await useAsyncData(() =>
    $fetch(`/api/cart/id/${route.params.id}`, {
      headers: useRequestHeaders(["cookie"]),
      method: "PUT",
      body: requestedBody,
    }),
  );
  if (error.value) {
    $toast.error("Added unsuccesfully!");
  } else {
    $toast.success("Added successfully!");
  }
  resetForm();
}

function resetForm() {
  orderItem.value = undefined;
  orderQuantity.value = 1;
  orders.value = [];
  grandTotal.value = 0;
  phoneNumber.value = "";
  deliveryAddress.value = "";
  status.value = undefined;
  notes.value = "";
}
</script>
