<template>
  <div
    class="rounded-xl shadow bg-white overflow-hidden py-6 transition ease-out duration-150 cursor-pointer hover:shadow-xl"
  >
    <div class="flex justify-center">
      <div class="w-48 h-48 rounded-full overflow-hidden">
        <img
          class="w-full h-full object-cover"
          :src="player.photo"
          :alt="name"
        />
      </div>
    </div>
    <div class="mt-8 text-center">
      <h3 class="text-base font-medium text-gray-800">
        {{ player.first_name + " " + player.last_name }}
      </h3>
      <p class="font-medium">{{ player.age }}</p>
      <p class="mt-2 text-gray-600 text-xs">
        <em>added {{ added }}</em>
      </p>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";

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
    added() {
      return DateTime.fromISO(this.player.created_at).toRelative();
    },
  },
  methods: {},
};
</script>

<style></style>
