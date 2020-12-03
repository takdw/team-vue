<template>
  <div id="app" class="h-screen overflow-hidden flex">
    <SideStrip />

    <div class="flex-1 flex h-full">
      <router-view></router-view>
    </div>

    <notifications group="notifications" classes="notify" />
  </div>
</template>

<script>
import SideStrip from "@/components/SideStrip";

export default {
  components: {
    SideStrip,
  },
  data: () => ({}),
  created() {},
  computed: {},
  methods: {},
};
</script>

<style src="@/assets/css/app.css"></style>
