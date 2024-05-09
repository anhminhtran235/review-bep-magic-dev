<template>
  <div class="mt-4">
    <AdminMiscButtonIcon
      @action="resetForm"
      icon-name="material-symbols:restart-alt-rounded"
      dynamic-class="hover:bg-black/10"
    />
    <form @submit.prevent="handleAddItem" class="mt-4">
      <div class="grid-col-1 grid w-full gap-4 md:grid-cols-2 2xl:w-1/2">
        <AdminMiscTextInput input-label="Title" v-model:input="title" />
        <AdminMiscFileInput input-label="Banner" v-model:input="bannerUrl" />
        <div class="col-span-2 space-y-4">
          <AdminMiscTextAreaInput
            input-label="Paragraph"
            v-model:input="paragraph"
            rows="8"
          />
          <AdminMiscButtonIcon
            @action="handleAddParagraph"
            icon-name="material-symbols:add-circle-outline-rounded"
            dynamic-class="hover:bg-black/10"
          />
        </div>
        <div
          v-if="paragraphs.length > 0"
          class="col-span-2 space-y-2 bg-white px-6 py-3 sm:rounded-lg"
        >
          <p v-for="paragraph in paragraphs" class="indent-4">
            {{ paragraph }}
          </p>
        </div>
        <div class="col-span-2">
          <AdminMiscSubmitButton />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { $toast } = useNuxtApp();
const title = ref<string>("");
const bannerUrl = ref<any>("");
const paragraph = ref<string>("");
const paragraphs = ref<string[]>([]);

function handleAddParagraph() {
  if (paragraph.value != "") {
    paragraphs.value.push(paragraph.value);
  }
  paragraph.value = "";
}

async function handleAddItem() {
  let requestedBody: { [key: string]: any } = {};
  if (title.value != "") {
    requestedBody.title = title.value;
  }
  if (bannerUrl.value != "") {
    requestedBody.banner_url = bannerUrl.value;
  }
  if (paragraphs.value.length > 0) {
    requestedBody.paragraphs = paragraphs.value;
  }
  const { data, error } = await useAsyncData(() =>
    $fetch(`/api/blog/id/${route.params.id}`, {
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
  title.value = "";
  bannerUrl.value = "";
  paragraph.value = "";
  paragraphs.value = [];
}
</script>
