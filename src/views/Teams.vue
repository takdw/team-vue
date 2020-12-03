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
        <div class="mt-4 -mx-4 space-y-1">
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
        class="fixed inset-0 bg-black bg-opacity-25 z-50 grid place-items-center"
      >
        <div class="w-full max-w-lg rounded-xl bg-white overflow-hidden">
          <h2 class="p-6 font-medium text-base">
            Add Player to Team {{ teamName }}
          </h2>
          <form @submit.prevent="addPlayer">
            <div class="flex space-x-4 px-6">
              <div class="relative h-32 w-32 flex-shrink-0">
                <input
                  @change="processFile"
                  type="file"
                  class="hidden"
                  ref="fileUploadInput"
                />
                <button
                  @click="openFileUploader"
                  type="button"
                  class="block w-full absolute inset-0 grid place-items-center focus:outline-none bg-gray-100 group cursor-pointer border border-transparent hover:border-gray-300 hover:bg-gray-200 rounded-full transition ease-out duration-150 overflow-hidden"
                >
                  <svg
                    v-if="!previewData"
                    class="w-10 h-10 opacity-25 group-hover:opacity-75 transition ease-out duration-150"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <img
                    v-else
                    class="w-full h-full object-cover"
                    :src="previewData"
                    :alt="file.name"
                  />
                </button>
              </div>
              <div class="flex-1 space-y-3">
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
  </div>
</template>

<script>
import PlayerCard from "@/components/PlayerCard";

export default {
  components: {
    PlayerCard,
  },
  data: () => ({
    teams: [],
    players: [],
    selected: "",
    loadingTeams: false,
    loadingPlayers: false,
    addingPlayer: false,
    working: false,
    fileTypeError: false,
    file: "",
    previewData: "",
    firstName: "",
    lastName: "",
    birthdate: "",
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
    openFileUploader() {
      this.$refs.fileUploadInput.click();
    },
    startAddingPlayer() {
      if (!this.selected) return;
      this.addingPlayer = true;
    },
    processFile(e) {
      this.fileTypeError = false;

      const file = e.target.files[0];

      const allowedTypes = ["image/jpeg", "image/png"];

      if (!allowedTypes.includes(file.type)) {
        this.fileTypeError = true;
        return;
      }

      const reader = new FileReader();
      reader.onload = e => {
        this.previewData = e.target.result;
      };
      reader.readAsDataURL(file);

      this.file = file;
    },
    addPlayer() {
      this.working = true;

      if (!this.validateData()) {
        return;
      }

      const fd = new FormData();
      fd.append("photo", this.file);
      fd.append("first_name", this.firstName);
      fd.append("last_name", this.lastName);
      fd.append("birthdate", this.birthdate);

      this.$http
        .post(`teams/${this.selected}/players`, fd)
        .then(({ data }) => {
          this.$success(
            "Player Added",
            `${data.first_name} ${data.last_name} was added to team ${this.teamName}`
          );
          this.resetFields();
          this.addingPlayer = false;
          this.getPlayers();
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
      this.file = "";
      this.previewData = "";
      this.birthdate = "";
    },
    validateData() {
      return (
        this.file?.name && this.firstName && this.lastName && this.birthdate
      );
    },
  },
};
</script>

<style></style>
