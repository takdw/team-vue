<template>
  <div class="relative h-full w-full grid place-items-center">
    <transition
      enter-class="transform -translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      enter-active-class="transition ease-in-out duration-150"
      leave-active-class="transition ease-in-out duration-150"
      leave-to-class="transform -translate-y-full opacity-0"
      leave-class="transform translate-y-0 opacity-100"
    >
      <div v-if="!creating" class="absolute w-full flex justify-center">
        <button
          type="button"
          @click="creating = true"
          class="p-4 flex items-center space-x-2 text-xl text-gray-500 hover:text-gray-900 transition ease-out duration-150 focus:outline-none focus:text-gray-900 rounded-md"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path></svg
          ><span>Create Team</span>
        </button>
      </div>
    </transition>
    <transition
      enter-class="transform translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      enter-active-class="transition ease-in-out duration-300"
      leave-active-class="transition ease-in-out duration-300"
      leave-to-class="transform translate-y-full opacity-0"
      leave-class="transform translate-y-0 opacity-100"
    >
      <div v-if="creating" class="absolute w-full flex justify-center">
        <form @submit.prevent="create" class="w-full max-w-sm">
          <input
            class="w-full block rounded text-base px-4 py-3 bg-transparent border-2 border-gray-200 focus:border-blue-500 focus:bg-white placeholder-gray-700 transition ease-out duration-150"
            placeholder="Team Name"
            v-model="name"
            :disabled="working"
            required
          />
          <button
            class="relative mt-4 block w-full font-medium rounded py-3 uppercase bg-blue-500 hover:bg-blue-400 text-white transition ease-out duration-150 shadow-md disabled:cursor-wait overflow-hidden"
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
            <span>Create</span>
          </button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    creating: false,
    working: false,
    name: "",
  }),
  created() {},
  watch: {
    creating(val) {
      if (val) {
        document.body.addEventListener("keyup", this.escapeListener);
      } else {
        document.body.removeEventListener("keyup", this.escapeListener);
      }
    },
  },
  computed: {},
  methods: {
    create() {
      this.working = true;

      this.$http
        .post("teams", {
          name: this.name,
        })
        .then(response => {
          this.$router.push({
            path: "/teams",
            query: {
              t: response.data.id,
            },
          });
          this.name = "";
        })
        .catch(err => console.log(err))
        .finally(() => (this.working = false));
    },
    escapeListener(e) {
      if (e.keyCode === 27) {
        this.creating = false;
      }
    },
  },
  beforeDestroy() {
    document.body.removeEventListener("keyup", this.escapeListener);
  },
};
</script>

<style></style>
