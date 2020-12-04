<template>
  <div class="w-full">
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
      <div
        v-if="players.length"
        class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        <router-link
          v-for="player in players"
          class="block col-span-1 focus:outline-none focus:ring focus:ring-blue-300"
          :key="`player-${player.id}`"
          :to="`/teams/${id}/${player.id}`"
        >
          <PlayerCard :player="player" />
        </router-link>
      </div>
      <div v-else>
        <div class="h-72 grid place-items-center">
          <div class="text-center">
            <p class="text-2xl font-medium text-gray-400">
              No players in team {{ team.name }}.
            </p>
            <p class="text-gray-400 font-medium">Maybe add some?</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerCard from "@/components/PlayerCard";

export default {
  components: {
    PlayerCard,
  },
  data: () => ({
    team: {
      players: [],
    },
    loadingPlayers: false,
  }),
  created() {
    this.getTeam();

    this.$root.$on("player-added", id => {
      if (this.id == id) {
        this.getPlayers();
      }
    });
  },
  computed: {
    id() {
      return this.$route.params.teamId;
    },
    players() {
      return this.team.players;
    },
  },
  watch: {
    $route() {
      this.getTeam();
    },
  },
  methods: {
    getTeam() {
      this.loadingPlayers = true;

      this.$http
        .get(`teams/${this.id}?with=players`)
        .then(response => (this.team = response.data))
        .catch(err => this.$error())
        .finally(() => (this.loadingPlayers = false));
    },
    getPlayers() {
      this.loadingPlayers = true;

      this.$http
        .get(`teams/${this.id}/players`)
        .then(response => (this.players = response.data))
        .catch(err => this.$error())
        .finally(() => (this.loadingPlayers = false));
    },
  },
};
</script>

<style></style>
