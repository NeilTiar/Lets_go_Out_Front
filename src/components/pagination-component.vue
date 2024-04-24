<!-- eslint-disable no-undef -->
<!-- Pagination.vue -->

<template>
    <div class="pagination">
        <vue-awesome-paginate
            v-model="currentPage"
            :total-items="totalItems"
            :reviews="reviews"
            :items-per-page="itemsPerPage"
            :max-page-shown="pagesShown"
            :on-click="changePage"
        />
    </div>
</template>

<Home />
<script>


export default {




  props: {
    reviews: {
      type: Array,
      default: () => [],
    },
  },


  data() {
    return {
      currentPage: 1,
      itemsPerPage: 18,
      pagesShown: 1,

    };
  },


  computed: {


    totalItems() {
      return this.reviews.length; // Nombre total de commentaires
    },

    totalPages() {
      return Math.ceil(this.reviews.length / this.itemsPerPage);
    },


  },


  mounted() {

  },

  methods: {

    changePage(newPage) {

      this.$emit('page-changed', newPage);

    },



    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Pour un défilement en douceur, si pris en charge
      })

    },
  },

  /*handlePaginationClick(newPage) {
       // Assurez-vous que newPage et newPage.target sont définis
       if (newPage && newPage.target) {
         // Accéder à l'index du bouton de pagination
         const pageIndex = newPage.target.dataset.index;
 
         // Vérifier si pageIndex est une chaîne non vide
         if (pageIndex.trim() !== "") {
           // Convertir la valeur en nombre
           this.currentPage = parseInt(pageIndex, 10);
 
           // Appeler la fonction scrollToTop ou toute autre logique de mise à jour de la vue
           this.scrollToTop();
 
           console.log("Index de la page depuis le bouton de pagination :", pageIndex);
         } else {
           console.warn("L'index du bouton de pagination est une chaîne vide.");
         }
       } else {
         console.warn("L'événement de pagination ou son élément cible est indéfini.");
       }
     },*/
}



</script>

<style>
.pagination {
  margin: 3.5rem;
}

.pagination .pagination-container {
  border-radius: 22px;
  overflow: hidden;
}

.pagination .paginate-buttons {

  width: 44px;
  height: 44px;
  cursor: pointer;
  background-color: #e7f4fc;
  border-radius: 8px;
  border: none;
  color: #000000;

  font-size: 1.3rem;
  font-family: 'Times New Roman', Times, serif;
}

.pagination .active-page {
  background-color: #5cd4c6;
  ;
  color: #2c3e50;
}

.pagination .paginate-buttons:hover {
  background-color: #ede3f3;
}

.pagination .active-page:hover {
  background-color: #1abc9c;
}

.pagination .back-button {
  border-inline-start: none;
}

.pagination .next-button {
  border-inline-end: none;
}

.pagination .back-button svg {
  transform: rotate(180deg);
}

.pagination .back-button:active,
.pagination .next-button:active {
  background-color: #3a1131;
}
</style>
