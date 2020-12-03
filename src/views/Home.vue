<template>
  <div class="h-screen flex">
    <SideStrip />
    <SideBar />
    <main class="flex-1 h-full overflow-y-auto">
      <div class="p-6 flex justify-between items-center">
        <h1 class="font-medium text-lg text-gray-600">Team Name</h1>
        <div>
          <button
            class="flex items-center space-x-2 px-4 py-3 bg-blue-500 text-white font-medium rounded hover:bg-opacity-90 transition duration-150 ease-out shadow-md hover:shadow"
          >
            <svg
              class="w-5 h-5"
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
              ></path>
            </svg>
            <span>Add Player</span>
          </button>
        </div>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-4 gap-6">
          <div v-for="i in 12" class="col-span-1">
            <div
              class="rounded-xl shadow bg-white bg-opacity-50 hover:bg-opacity-100 overflow-hidden py-6 transition ease-out duration-150 cursor-pointer hover:shadow-xl"
            >
              <div class="flex justify-center">
                <div class="w-48 h-48 bg-pink-500 rounded-full"></div>
              </div>
              <div class="mt-8 text-center">
                <h3 class="text-base font-medium text-gray-800">Player Name</h3>
                <p>Age</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import SideStrip from "@/components/SideStrip";

export default {
  components: {
    SideBar,
    SideStrip,
  },
  data: () => ({}),
  created() {},
  computed: {},
  methods: {},
};
</script>

<style></style>
