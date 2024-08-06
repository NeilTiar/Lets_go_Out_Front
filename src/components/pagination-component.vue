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

  emits: ['page-changed'],


  data() {
    return {
      currentPage: this.$store.state.currentReviewsPage || 1,
      itemsPerPage: 18,
      pagesShown: 1,
     //totalItems :  la fonction totalItems() dans computed creer implicitement une props du meme nom  ici. 
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

 
 
    window.addEventListener('resize', this.updateItemsPerPage),


     function beforeUnmount() {
      window.removeEventListener('resize', this.updateItemsPerPage)
    }

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
