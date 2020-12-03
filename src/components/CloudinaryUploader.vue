<template>
  <div class="relative h-32 w-32 flex-shrink-0">
    <input
      @change="processFile"
      type="file"
      class="hidden"
      ref="fileUploadInput"
    />
    <button
      @click="openFileUploader"
      type="button"
      class="block w-full absolute inset-0 grid place-items-center focus:outline-none bg-gray-100 group cursor-pointer border border-transparent hover:border-gray-300 hover:bg-gray-200 rounded-full transition ease-out duration-150 overflow-hidden"
    >
      <svg
        v-if="!previewData"
        class="w-10 h-10 opacity-25 group-hover:opacity-75 transition ease-out duration-150"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        ></path>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        ></path>
      </svg>
      <img
        v-else
        class="w-full h-full object-cover"
        :src="previewData"
        :alt="file.name"
      />
    </button>
    <div
      v-if="uploading"
      class="absolute inset-0 bg-black bg-opacity-50 z-50 grid place-items-center rounded-full"
    >
      <span
        class="block h-6 w-6 border-2 border-white rounded-full animate-spin"
        style="border-bottom-color: transparent"
      ></span>
    </div>
    <div
      v-if="showSuccess"
      class="absolute inset-0 z-50 grid place-items-center rounded-full"
    >
      <svg
        class="text-green-500 w-12 h-12 opacity-75"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data: () => ({
    fileTypeError: false,
    file: "",
    previewData: "",
    uploading: false,
    showSuccess: false,
  }),
  created() {},
  computed: {},
  methods: {
    openFileUploader() {
      this.$refs.fileUploadInput.click();
    },
    processFile(e) {
      this.fileTypeError = false;

      const file = e.target.files[0];

      const allowedTypes = ["image/jpeg", "image/png"];

      if (!allowedTypes.includes(file.type)) {
        this.fileTypeError = true;
        return;
      }

      const reader = new FileReader();
      reader.onload = e => {
        this.previewData = e.target.result;
      };
      reader.readAsDataURL(file);

      this.file = file;
    },
    upload() {
      this.uploading = true;

      const fd = new FormData();
      fd.append("file", this.file);
      fd.append("upload_preset", process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET);

      return new Promise((resolve, reject) => {
        axios
          .post(
            `https://api.cloudinary.com/v1_1/${process.env.VUE_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            fd,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(response => {
            this.showSuccess = true;
            setTimeout(() => (this.showSuccess = false), 4000);
            resolve(response.data.secure_url);
          })
          .catch(reject)
          .finally(() => (this.uploading = false));
      });
    },
    reset() {
      this.fileTypeError = false;
      this.file = "";
      this.previewData = "";
    },
  },
};
</script>

<style></style>
