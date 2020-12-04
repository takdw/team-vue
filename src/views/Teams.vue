<template>
  <div class="h-full flex flex-1">
    <div
      class="relative flex-shrink-0 w-full md:w-96 h-full bg-white overflow-y-auto"
      :class="{ 'hidden md:block': id }"
    >
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
        <div v-if="loadingTeams" class="mt-4 -mx-4 space-y-1">
          <div class="pt-12 grid place-items-center">
            <p class="text-center text-2xl font-medium text-gray-400">
              <span
                class="block h-12 w-12 border-4 border-gray-400 rounded-full animate-spin"
                style="border-bottom-color: transparent"
              ></span>
            </p>
          </div>
        </div>
        <template v-else>
          <div v-if="teams.length" class="mt-4 -mx-4 space-y-1">
            <router-link
              v-for="team in teams"
              class="block w-full text-left px-4 py-3 font-medium rounded border border-transparent cursor-pointer transition ease-out duration-150 focus:outline-none focus:border-blue-200"
              :class="
                team.id == id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
              "
              :key="`team-list-${team.id}`"
              :to="`/teams/${team.id}`"
            >
              <span>{{ team.name }}</span>
            </router-link>
          </div>
          <div v-else class="mt-4 -mx-4 space-y-1">
            <p class="pt-12 text-center font-medium text-gray-500">No teams!</p>
          </div>
        </template>
      </div>
    </div>
    <main
      class="flex-1 h-full overflow-y-auto"
      :class="{
        'hidden md:block': !id,
      }"
    >
      <div v-if="id" class="p-6 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <router-link
            to="/teams"
            class="p-2 text-gray-500 hover:text-gray-900 transition ease-out duration-150"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </router-link>
          <h1 class="font-medium text-lg text-gray-600">{{ team.name }}</h1>
        </div>
        <div>
          <button
            type="button"
            @click="startAddingPlayer"
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
      <div v-else class="h-full grid place-items-center">
        <p class="font-medium text-gray-500">No team selected.</p>
      </div>
      <router-view></router-view>
      <AddPlayerModal :team="team" ref="addPlayerModal" />
    </main>
  </div>
</template>

<script>
import AddPlayerModal from "@/components/modals/AddPlayerModal";

export default {
  components: {
    AddPlayerModal,
  },
  data: () => ({
    teams: [],
    loadingTeams: false,
  }),
  created() {
    this.getTeams();
  },
  computed: {
    id() {
      return this.$route.params.teamId;
    },
    team() {
      return this.teams.length && this.id
        ? this.teams.find(team => team.id === parseInt(this.id))
        : {};
    },
  },
  methods: {
    getTeams() {
      this.loadingTeams = true;

      this.$http
        .get("teams")
        .then(response => (this.teams = response.data))
        .catch(err => this.$error())
        .finally(() => (this.loadingTeams = false));
    },
    startAddingPlayer() {
      this.$refs.addPlayerModal.open();
    },
  },
};
</script>

<style></style>
