<template>
  <div class="relative flex-shrink-0 w-96 h-full bg-white overflow-y-auto">
    <div class="p-4 sticky top-0 bg-white z-10">
      <div class="relative">
        <label for="search" class="sr-only">Search</label>
        <input
          placeholder="Search"
          class="block w-full py-3 pl-8 pr-4 font-medium border border-transparent focus:border-gray-300 rounded placeholder-gray-500 transition duration-150 ease-out"
        />
        <div class="absolute inset-y-0 left-0 px-2 flex items-center">
          <svg
            class="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="mt-4 px-8">
      <h2 class="font-medium text-base text-gray-600">Teams</h2>
      <div class="mt-4 -mx-4 space-y-1">
        <div
          v-for="i in 5"
          class="px-4 py-3 font-medium rounded cursor-pointer transition ease-out duration-150"
          :class="i === 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'"
        >
          <span>Team {{ i }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({}),
  created() {},
  computed: {},
  methods: {},
};
</script>

<style></style>
