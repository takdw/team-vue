<template>
  <div class="h-full flex flex-1">
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
            <button
              type="button"
              v-for="team in teams"
              class="block w-full text-left px-4 py-3 font-medium rounded border border-transparent cursor-pointer transition ease-out duration-150 focus:outline-none focus:border-blue-200"
              :class="
                team.id === selected
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200'
              "
              :key="`team-list-${team.id}`"
              @click="selectTeam(team.id)"
            >
              <span>{{ team.name }}</span>
            </button>
          </div>
          <div v-else class="mt-4 -mx-4 space-y-1">
            <p class="pt-12 text-center font-medium text-gray-500">No teams!</p>
          </div>
        </template>
      </div>
    </div>

    <main class="flex-1 h-full overflow-y-auto">
      <div v-if="selected">
        <div class="p-6 flex justify-between items-center">
          <h1 class="font-medium text-lg text-gray-600">{{ teamName }}</h1>
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
        <div v-if="loadingPlayers">
          <div class="h-72 grid place-items-center">
            <div class="text-center">
              <p class="text-2xl font-medium text-gray-400">
                <span
                  class="block h-12 w-12 border-4 border-gray-400 rounded-full animate-spin"
                  style="border-bottom-color: transparent"
                ></span>
              </p>
            </div>
          </div>
        </div>
        <div v-else class="p-6">
          <div v-if="players.length" class="grid grid-cols-4 gap-6">
            <div
              v-for="player in players"
              class="col-span-1"
              :key="`player-${player.id}`"
            >
              <PlayerCard :player="player" />
            </div>
          </div>
          <div v-else>
            <div class="h-72 grid place-items-center">
              <div class="text-center">
                <p class="text-2xl font-medium text-gray-400">
                  No players in team {{ teamName }}.
                </p>
                <p class="text-gray-400 font-medium">Maybe add some?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="h-full grid place-items-center">
        <p class="font-medium text-gray-500">No team selected.</p>
      </div>
    </main>

    <AddPlayerModal
      :team="selectedTeam"
      ref="addPlayerModal"
      @player-added="getPlayers"
    />
  </div>
</template>

<script>
import PlayerCard from "@/components/PlayerCard";
import AddPlayerModal from "@/components/modals/AddPlayerModal";

export default {
  components: {
    PlayerCard,
    AddPlayerModal,
  },
  data: () => ({
    teams: [],
    players: [],
    selected: "",
    loadingTeams: false,
    loadingPlayers: false,
  }),
  created() {
    if (this.$route.query.t) {
      this.selected = parseInt(this.$route.query.t);
      this.getPlayers();
    }

    this.getTeams();
  },
  computed: {
    teamName() {
      return this.selected && this.teams.length
        ? this.teams.find(team => team.id === this.selected).name
        : "";
    },
    selectedTeam() {
      return this.selected && this.teams.length
        ? this.teams.find(team => team.id === this.selected)
        : {};
    },
  },
  watch: {
    selected() {
      this.getPlayers();
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
    getPlayers() {
      this.loadingPlayers = true;

      this.$http
        .get(`teams/${this.selected}/players`)
        .then(response => (this.players = response.data))
        .catch(err => this.$error())
        .finally(() => (this.loadingPlayers = false));
    },
    selectTeam(id) {
      this.selected = parseInt(id);
    },
    startAddingPlayer() {
      if (!this.selected) return;

      this.$refs.addPlayerModal.open();
    },
  },
};
</script>

<style></style>
