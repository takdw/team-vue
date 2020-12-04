<template>
  <div>
    <div class="px-6 flex space-x-4">
      <div class="w-96 h-96 flex-shrink-0 rounded-full overflow-hidden">
        <img
          class="w-full h-full object-cover object-top overflow-hidden"
          :src="player.photo"
          :alt="name"
        />
      </div>
      <div class="relative p-4 max-w-xl">
        <button
          @click="$refs.editPlayerModal.open()"
          type="button"
          class="absolute top-0 right-0 mt-1 mr-4 p-2 text-gray-400 hover:text-gray-900 transition ease-out duration-150"
        >
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
            ></path>
            <path
              fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <h2 class="font-medium text-base">
          {{ name }}
        </h2>
        <p class="font-medium">{{ player.age }}</p>
        <p class="mt-2 text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia
          voluptates ipsum, fugiat soluta iste, cumque quae dolorum id
          consequatur pariatur ea dolore quam consequuntur quod ducimus, hic
          quisquam, ad perspiciatis?
        </p>
        <p class="mt-2 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro a nobis
          reiciendis voluptatum voluptates laborum dignissimos officia odio
          adipisci perspiciatis commodi saepe culpa aliquam voluptatibus ratione
          quasi, architecto atque nulla.
        </p>
        <p class="mt-2 text-gray-600">
          Ullam, unde explicabo quaerat deserunt laboriosam accusamus mollitia
          consequatur cupiditate, aut aspernatur sed dolorum incidunt eos at
          ducimus exercitationem amet, molestiae, sunt culpa eius. Excepturi
          culpa accusantium fugit eveniet quo. Eveniet, qui incidunt vero quas
          voluptas architecto? Porro consequuntur, animi sapiente eius harum
          doloremque repudiandae eum, dolores dolorem dolor aut ab totam
          voluptates voluptas! Veritatis sit doloremque consectetur mollitia,
          maiores.
        </p>
      </div>
    </div>
    <EditPlayerModal
      @player-updated="getPlayer"
      :player="player"
      ref="editPlayerModal"
    />
  </div>
</template>

<script>
import EditPlayerModal from "@/components/modals/EditPlayerModal";

export default {
  components: {
    EditPlayerModal,
  },
  data: () => ({
    player: {},
    loading: false,
  }),
  created() {
    this.getPlayer();
  },
  computed: {
    id() {
      return this.$route.params.playerId;
    },
    teamId() {
      return this.$route.params.teamId;
    },
    name() {
      return this.player.first_name + " " + this.player.last_name;
    },
  },
  methods: {
    getPlayer() {
      this.loading = true;

      this.$http
        .get(`teams/${this.teamId}/players/${this.id}`)
        .then(response => (this.player = response.data))
        .catch(err => console.log(err))
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style></style>
