<template>
  <transition
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    enter-active-class="transition ease-in-out duration-150"
    leave-active-class="transition ease-in-out duration-150"
    leave-to-class="opacity-0"
    leave-class="opacity-100"
  >
    <div
      v-if="showModal"
      @click="close"
      class="fixed inset-0 bg-black bg-opacity-25 z-50 grid place-items-center py-8 px-4"
    >
      <div
        @click.stop
        class="w-full max-w-2xl rounded-xl bg-white overflow-y-auto max-h-full"
      >
        <form @submit.prevent="update">
          <div class="px-6">
            <div class="flex justify-center py-6">
              <CloudinaryUploader
                ref="cloudinaryUploader"
                :existing="player.photo"
                size="48"
              />
            </div>
            <div class="flex-1 space-y-3">
              <div>
                <label class="font-medium text-gray-600" for="firstName"
                  >First Name</label
                >
                <input
                  v-model="firstName"
                  id="firstName"
                  class="mt-1 w-full rounded border bg-white p-2"
                  required
                />
              </div>
              <div>
                <label class="font-medium text-gray-600" for="lastName"
                  >Last Name</label
                >
                <input
                  v-model="lastName"
                  id="lastName"
                  class="mt-1 w-full rounded border bg-white p-2"
                  required
                />
              </div>
              <div>
                <label class="font-medium text-gray-600" for="birthdate"
                  >Birthdate</label
                >
                <input
                  v-model="birthdate"
                  type="date"
                  id="birthdate"
                  class="mt-1 w-full rounded border bg-white p-2"
                  required
                />
              </div>
            </div>
          </div>
          <div class="mt-4 bg-gray-100 flex justify-end px-6 py-3">
            <button
              class="relative font-medium rounded py-3 px-4 bg-blue-500 hover:bg-blue-400 text-white transition ease-out duration-150 shadow-md disabled:cursor-wait overflow-hidden"
              :class="{ 'hover:shadow': !updating }"
              :disabled="updating"
            >
              <span
                v-if="updating"
                class="absolute inset-0 bg-blue-300 z-20 grid place-items-center"
              >
                <span
                  class="block h-6 w-6 border-2 border-white rounded-full animate-spin"
                  style="border-bottom-color: transparent"
                ></span>
              </span>
              <span>Update</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import { DateTime } from "luxon";

import CloudinaryUploader from "@/components/CloudinaryUploader";

export default {
  props: ["player"],
  components: {
    CloudinaryUploader,
  },
  data: () => ({
    firstName: "",
    lastName: "",
    birthdate: "",
    updating: false,
    showModal: false,
  }),
  mounted() {
    this.fillData();
  },
  watch: {
    showModal(val) {
      if (val) {
        document.body.addEventListener("keyup", this.escapeListener);
      } else {
        document.body.removeEventListener("keyup", this.escapeListener);
      }
    },
    player() {
      this.fillData();
    },
  },
  computed: {
    name() {
      return this.player.first_name + " " + this.player.last_name;
    },
  },
  beforeDestroy() {
    document.body.removeEventListener("keyup", this.escapeListener);
  },
  methods: {
    open() {
      this.showModal = true;
    },
    close() {
      this.showModal = false;
    },
    escapeListener(e) {
      if (e.keyCode === 27) {
        if (this.editing) {
          this.close();
          return;
        }
        this.close();
      }
    },
    update() {
      this.updating = true;

      this.$refs.cloudinaryUploader
        .upload()
        .then(response => {
          return this.$http.post(
            `teams/${this.player.team_id}/players/${this.player.id}/edit`,
            {
              first_name: this.firstName,
              last_name: this.lastName,
              birthdate: this.birthdate,
              photo: response,
            }
          );
        })
        .then(response => {
          this.$success("Success", "Player was updated successfully.");
          this.$emit("player-updated", response.data);
          this.close();
        })
        .catch(err => console.log(err))
        .finally(() => (this.updating = false));
    },
    fillData() {
      this.firstName = this.player.first_name;
      this.lastName = this.player.last_name;
      this.birthdate = DateTime.fromISO(this.player.birthdate).toISODate();
    },
  },
};
</script>

<style></style>
