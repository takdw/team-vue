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
      v-if="showingPlayer"
      @click="close"
      class="fixed inset-0 bg-black bg-opacity-25 z-50 grid place-items-center py-8"
    >
      <div
        @click.stop
        class="w-full max-w-2xl rounded-xl bg-white overflow-y-auto max-h-full"
      >
        <img
          class="border border-white rounded-t-xl w-full object-cover object-top overflow-hidden"
          :src="player.photo"
          :alt="name"
        />
        <div class="relative p-4">
          <button
            v-if="!editing"
            @click="startEditing"
            type="button"
            class="absolute top-0 right-0 mt-1 mr-4 p-2 text-gray-400 hover:text-gray-900 transition ease-out duration-150"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
              ></path>
              <path
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <form @submit.prevent="update" v-if="editing">
            <div class="mt-2 flex space-x-4">
              <div class="flex-1">
                <label class="font-medium text-gray-600" for="firstName"
                  >First Name</label
                >
                <input
                  v-model="player.first_name"
                  id="firstName"
                  class="mt-1 w-full rounded border bg-white p-2"
                  required
                />
              </div>
              <div class="flex-1">
                <label class="font-medium text-gray-600" for="lastName"
                  >Last Name</label
                >
                <input
                  v-model="player.last_name"
                  id="lastName"
                  class="mt-1 w-full rounded border bg-white p-2"
                  required
                />
              </div>
            </div>
            <div class="mt-2">
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
            <button
              class="relative mt-4 font-medium rounded py-3 px-6 uppercase bg-blue-500 hover:bg-blue-400 text-white transition ease-out duration-150 shadow-md disabled:cursor-wait overflow-hidden"
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
          </form>
          <template v-else>
            <h2 class="font-medium text-base">
              {{ name }}
            </h2>
            <p class="font-medium">{{ player.age }}</p>
            <p class="mt-2 text-gray-600">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia
              voluptates ipsum, fugiat soluta iste, cumque quae dolorum id
              consequatur pariatur ea dolore quam consequuntur quod ducimus, hic
              quisquam, ad perspiciatis?
            </p>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { DateTime } from "luxon";

export default {
  props: ["team"],
  components: {},
  data: () => ({
    showingPlayer: false,
    player: "",
    editing: false,
    birthdate: "",
    updating: false,
  }),
  watch: {
    showingPlayer(val) {
      if (val) {
        document.body.addEventListener("keyup", this.escapeListener);
      } else {
        document.body.removeEventListener("keyup", this.escapeListener);
      }
    },
    player() {
      this.birthdate = DateTime.fromISO(this.player.birthdate).toISODate();
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
    open(player) {
      if (!player) this.close();

      this.player = player;
      this.showingPlayer = true;
    },
    close() {
      this.showingPlayer = false;
    },
    escapeListener(e) {
      if (e.keyCode === 27) {
        if (this.editing) {
          this.editing = false;
          return;
        }
        this.showingPlayer = false;
      }
    },
    startEditing() {
      this.editing = true;
    },
    update() {
      this.updating = true;

      this.$http
        .post(`teams/${this.team.id}/players/${this.player.id}/edit`, {
          first_name: this.player.first_name,
          last_name: this.player.last_name,
          birthdate: this.player.birthdate,
        })
        .then(response => {
          this.$success("Success", "Player was updated successfully.");
          this.$emit("player-updated", response.data);
          this.editing = false;
        })
        .catch(err => console.log(err))
        .finally(() => (this.updating = false));
    },
  },
};
</script>

<style></style>
