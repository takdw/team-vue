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
      v-if="addingPlayer"
      @click="close"
      class="fixed inset-0 bg-black bg-opacity-25 z-50 grid place-items-center py-8 px-4"
    >
      <div
        @click.stop
        class="w-full max-w-lg rounded-xl bg-white overflow-hidden"
      >
        <h2 class="p-6 font-medium text-base">
          Add Player to Team {{ team.name }}
        </h2>
        <form @submit.prevent="addPlayer">
          <div class="md:flex md:space-x-4 px-6">
            <div class="flex flex-shrink-0 justify-center">
              <CloudinaryUploader ref="cloudinaryUploader" />
            </div>
            <div class="mt-4 md:mt-0 flex-1 space-y-3">
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
              :class="{ 'hover:shadow': !working }"
              :disabled="working"
            >
              <span
                v-if="working"
                class="absolute inset-0 bg-blue-300 z-20 grid place-items-center"
              >
                <span
                  class="block h-6 w-6 border-2 border-white rounded-full animate-spin"
                  style="border-bottom-color: transparent"
                ></span>
              </span>
              <span>Add Player</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import CloudinaryUploader from "@/components/CloudinaryUploader";

export default {
  props: ["team"],
  components: {
    CloudinaryUploader,
  },
  data: () => ({
    addingPlayer: false,
    working: false,
    firstName: "",
    lastName: "",
    birthdate: "",
  }),
  watch: {
    addingPlayer(val) {
      if (val) {
        document.body.addEventListener("keyup", this.escapeListener);
      } else {
        document.body.removeEventListener("keyup", this.escapeListener);
      }
    },
  },
  created() {},
  computed: {},
  beforeDestroy() {
    document.body.removeEventListener("keyup", this.escapeListener);
  },
  methods: {
    open() {
      this.addingPlayer = true;
    },
    close() {
      this.addingPlayer = false;
    },
    escapeListener(e) {
      if (e.keyCode === 27) {
        this.addingPlayer = false;
      }
    },
    addPlayer() {
      this.working = true;

      if (!this.validateData()) {
        return;
      }

      this.$refs.cloudinaryUploader
        .upload()
        .then(path => {
          return this.$http.post(`teams/${this.team.id}/players`, {
            first_name: this.firstName,
            last_name: this.lastName,
            birthdate: this.birthdate,
            photo: path,
          });
        })
        .then(({ data }) => {
          this.$success(
            "Player Added",
            `${data.first_name} ${data.last_name} was added to team ${this.team.name}`
          );
          this.resetFields();
          this.addingPlayer = false;
          this.$root.$emit("player-added", this.team.id);
        })
        .catch(err => {
          console.log(err);
          this.$error("", "Could not add player to team.");
        })
        .finally(() => (this.working = false));
    },
    resetFields() {
      this.firstName = "";
      this.lastName = "";
      this.$refs.cloudinaryUploader.reset();
    },
    validateData() {
      return this.firstName && this.lastName && this.birthdate;
    },
  },
};
</script>

<style></style>
