<template>
  <div class="mt-4">
    <AdminMiscButtonIcon
      @action="resetForm"
      icon-name="material-symbols:restart-alt-rounded"
      dynamic-class="hover:bg-black/10"
    />
    <form @submit.prevent="handleAddItem" class="mt-4">
      <div class="grid-col-1 grid w-full gap-4 md:grid-cols-2 2xl:w-1/2">
        <AdminMiscTextInput input-label="Name" v-model:input="name" />
        <AdminMiscTextInput input-label="Price" v-model:input="price" />
        <AdminMiscSelectInput
          input-label="Category"
          :options="appConfig.categoryOptions"
          v-model:input="category"
        />
        <AdminMiscFileInput input-label="Image" v-model:input="file" />
        <AdminMiscTextInput input-label="Protein" v-model:input="protein" />
        <AdminMiscTextInput input-label="Carbs" v-model:input="carbs" />
        <AdminMiscTextInput input-label="Fat" v-model:input="fat" />
        <AdminMiscTextInput input-label="Fiber" v-model:input="fiber" />
        <AdminMiscTextAreaInput
          input-label="Description"
          v-model:input="description"
          rows="4"
        />
        <AdminMiscCheckboxInput
          input-label="Is Displayed"
          v-model:input="isDisplayed"
        />
        <div class="flex items-center space-x-4">
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

const name = ref<string>("");
const price = ref<string>("");
const category = ref<string>("");
const description = ref<string>("");
const file = ref<any>("");
const protein = ref<string>("");
const carbs = ref<string>("");
const fat = ref<string>("");
const fiber = ref<string>("");
const isDisplayed = ref<boolean>(false);

function resetForm() {
  name.value = "";
  price.value = "";
  category.value = "";
  description.value = "";
  file.value = "";
  protein.value = "";
  carbs.value = "";
  fat.value = "";
  fiber.value = "";
  isDisplayed.value = false;
}

async function handleAddItem() {
  let requestedBody: { [key: string]: any } = {};
  if (name.value != "") {
    requestedBody.name = name.value;
  }
  if (price.value != "") {
    requestedBody.price = parseInt(price.value);
  }
  if (category.value != "") {
    requestedBody.category = category.value;
  }
  if (description.value != "") {
    requestedBody.description = description.value;
  }
  if (file.value != "") {
    requestedBody.image_url = file.value;
  }
  if (
    protein.value != "" ||
    carbs.value != "" ||
    fat.value != "" ||
    fiber.value != ""
  ) {
    requestedBody.nutritional_value = {};
  }
  if (protein.value != "") {
    requestedBody.nutritional_value.protein = parseInt(protein.value);
  }
  if (carbs.value != "") {
    requestedBody.nutritional_value.carbs = parseInt(carbs.value);
  }
  if (fat.value != "") {
    requestedBody.nutritional_value.fat = parseInt(fat.value);
  }
  if (fiber.value != "") {
    requestedBody.nutritional_value.fiber = parseInt(fiber.value);
  }

  requestedBody.is_displayed = isDisplayed.value;

  const { data, error } = await useAsyncData(() =>
    $fetch(`/api/food/id/${route.params.id}`, {
      headers: useRequestHeaders(["cookie"]),
      method: "PUT",
      body: requestedBody,
    }),
  );
  if (error.value) {
    $toast.error("Edit unsuccesfully!");
  } else {
    $toast.success("Edit successfully!");
  }

  resetForm();
}
</script>
