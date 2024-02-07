<template>
  <div>
    <!-- Votre contenu à paginer -->

    <vue-awesome-paginate
      :total="totalItems"
      :limit="itemsPerPage"
      v-model="currentPage"
      @page-change="handlePageChange"
    ></vue-awesome-paginate>

    <!-- Affichage des commentaires de la page actuelle -->
    <div v-for="review in displayedReviews" :key="review.id">
      {{ totalPages }}
      <!-- Affichez d'autres propriétés du commentaire selon vos besoins -->
    </div>
  </div>
</template>

<script>

import VueAwesomePaginate from 'vue-awesome-paginate';


export default {
  components: {
    VueAwesomePaginate,
  },
  props: {
    reviews: {
      type: Array,
      required: true,
    },
       itemsPerPage: {
      type: Number,
      default: 10,
    },
  },
  data() {

    return {
      currentPage: 1,
     
    };
  },
  computed: {

    totalItems() {
      return this.reviews.length; // Nombre total de commentaires
    },

      totalPages() {
      return Math.ceil(this.reviews.length / this.itemsPerPage);
    },
    displayedReviews() {
      // Calcul des commentaires à afficher sur la page actuelle
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.reviews.slice(start, end);
    },
  },
  methods: {
    handlePageChange(page) {
      // Fonction appelée lorsqu'une page est changée
      this.currentPage = page;
    },
  },
  mounted() {
    // Appeler fetchData si besoin
  },
};
</script>

<style scoped>


/* Ajoutez des styles spécifiques au composant si nécessaire */
</style>
