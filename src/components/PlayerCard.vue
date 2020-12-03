<template>
  <div
    class="rounded-xl shadow bg-white overflow-hidden py-6 transition ease-out duration-150 cursor-pointer hover:shadow-xl"
  >
    <div class="flex justify-center">
      <div class="w-48 h-48 rounded-full overflow-hidden">
        <img class="w-full h-full object-cover" :src="photo" :alt="name" />
      </div>
    </div>
    <div class="mt-8 text-center">
      <h3 class="text-base font-medium text-gray-800">
        {{ player.first_name + " " + player.last_name }}
      </h3>
      <p>{{ player.age }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data: () => ({}),
  created() {},
  computed: {
    name() {
      return this.player.first_name + " " + this.player.last_name;
    },
    photo() {
      return process.env.VUE_APP_BACKEND_URL + "storage/" + this.player.photo;
    },
  },
  methods: {},
};
</script>

<style></style>
