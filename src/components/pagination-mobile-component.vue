<template>
  <!-- Emplacement pour le bouton de page précédente -->
  
  <div class="mobile-pagination-container">
    <div class="prev">
      <button class="prevButton" @click="handlePrevPage">
        <img
          class="arrow-prev-img"
          src="../assets/arrow.png"
          alt="black arrow for next page"
        />
      </button>
    </div>
    <!-- Emplacement pour le numéro de la page courante -->

    <p class="num-page-mobile">page n° : {{ currentPage }}/ {{ pagesShown }}</p>
    <!-- Emplacement pour le bouton de page suivante -->
    <div class="next">
      <button class="nextButton" @click="handleNextPage">
        <img
          class="arrow-next-img"
          src="../assets/arrow.png"
          alt="black arrow for next page"
        />
      </button>
    </div>
    <div class="ts" />
  </div>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array,
      default: () => [],
    },

      modelValue: {
      type: Number,
      default: 1,
    },

   /*  totalItems: {
     type: Number, 
   default: 0,
     required: true         
  },    */ 
  },

  emits: ['mobile-page-changed'],

  data() {
    return {
      currentPage: this.$store.state.currentReviewsPage || 1,
      itemsPerPage: 10,
      //pagesShown: this.totalPages,  // le nombre depage devrais etre indiquer dynamiquement et non en dur  !!!
    };
  },
  // Error point breakfrom totalItems : this.$store.state.reviews.length,
  beforeMount() {
    this.getNumPages();

    // console.log('reviews from component props: ',this.totalItems );
  },

  // eslint-disable-next-line vue/order-in-components
  computed: {

     totalItems() {
      return this.reviews.length; // Nombre total de commentaires
    },

   totalPages() {
      return Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
    },

     pagesShown() {
      return this.totalPages; //  Calculé dynamiquement
    },


  },

  mounted() {
    console.log('Nombre de cartes via composant pagination :', this.totalItems);

    this.getNumPages();

   
    this.totalPages
  },

  methods: {
    

    getNumPages() {
      console.log('this.reviews.length: ', this.reviews.length);

      if (this.pagesShown == 0) {
        this.pagesShown = Math.round(this.totalItems / this.itemsPerPage);
      } else {
        return;
      }

      // break point : probleme dans la parhentese avant le signe division !!!!
    },

    handleNextPage() {
      
      if (
        this.currentPage < this.pagesShown + 1 &&
        this.currentPage !== this.pagesShown
      ) {
        this.currentPage++;
        this.$emit('update:modelValue', this.currentPage); // Emit the page change event
      } else {
        return this.currentPage;
      }
      this.$emit('mobile-page-changed', this.currentPage);
    

      // Faire quelque chose avec les avis paginés, par exemple, les assigner à une propriété
    },

    handlePrevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.$emit('update:modelValue', this.currentPage); 
      } else {
        return this.currentPage;
      }

      this.$emit('mobile-page-changed', this.currentPage);

      // Faire quelque chose avec les avis paginés, par exemple, les assigner à une propriété
    },
  },
};
</script>

<style>

.mobile-pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  height: 4rem;
}

.mobile-pagination-container button {
  display: flex;

  background-color: rgb(124, 108, 136);
  color: aliceblue;
  align-items: center;
  justify-content: center;
  height: 2rem;
}

.prevButton {
  display: flex;
  background-color: brown;
  border-radius: 15px 0 0 15px;
  font-size: 2rem;
}

.nextButton {
  display: flex;
  background-color: brown;
  border-radius: 0 15px 15px 0;
  font-size: 2rem;
}

.num-page-mobile {
  font-family: 'Courgette', cursive;
  color: rgb(44, 25, 63);
}

.arrow-next-img {
  height: 1rem;
  width: 1rem;
}

.arrow-prev-img {
  height: 1rem;
  width: 1rem;
  transform: rotate(180deg);
}

</style>
