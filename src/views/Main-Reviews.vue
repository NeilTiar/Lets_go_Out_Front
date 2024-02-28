<template>
  <Header />

 

  <button v-if="isScrolledY" class="create-review-after-scrollY">créer une review</button>

  <main class="cards-container">


    <ReviewCard v-for="review in displayReviews(reviews)" :key="review.id" :theme="review.theme"
      :arrondissement="review.district_num" :placeName="review.place_name" :imageUrl="review.secure_url" />
   
    <button v-show="showButton" v-if="!isDesktop" class="create-review-mobile">Créer une
      nouvelle review</button>
  </main>


  <Pagination  v-model="currentPage" v-if="isDesktop" :total-items="totalItems" :items-per-page="itemsPerPage" :max-page-shown="pagesShown"
    @page-changed="handlePageChange" :reviews="reviews">
    
  </Pagination>

   <PaginationMobileComponent v-if="!isDesktop" v-model="currentPage" :total-items="totalItems" :items-per-page="itemsPerPage" :max-page-shown="pagesShown"
    @mobile-page-changed="handlePageChange" :reviews="reviews" >
     
   </PaginationMobileComponent>


  <Footer />
</template>
  
<script>

import { dataReviews } from '../assets/data/static-data-reviews.js';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue'
import ReviewCard from '../components/Review-card-component.vue';
import Pagination from '../components/pagination-component.vue';
import PaginationMobileComponent from '../components/pagination-mobile-component.vue';



export default {

  name: 'view-Home',
  components: {

    Header,
    Footer,
    ReviewCard,
    Pagination,
    PaginationMobileComponent
  },

  data() {

    return {

      dataReviews: dataReviews,
      isDesktop: window.innerWidth > 768,
      isScrolledY: window.scrollY > 174,
      showButton: false,
      hideButton: false,
      actualPostionY: window.scrollY,
      buttonOpacity: 0,
      reviews: [],
      currentPage: 1,
      itemsPerPage: 18,
      totalItems: 0,
      pagesShown: 1,
      pagination: {},

    }
  },



  mounted() {

    this.displayReviews(this.reviews)

    this.fetchData(this.reviews)

    console.log("totalItems ", this.totalItems)

    // les fonctions indiquées dans la section mounted d'un composant Vue sont automatiquement appelées lorsque le composant est monté dans le DOM

    window.addEventListener('scroll', this.handleScroll);

    window.addEventListener('resize', this.handleResize);


    // Initialiser actualPostionY à la position actuelle de défilement
    this.actualPostionY = window.scrollY;


    setTimeout(() => {
      this.hideButton = true;
    }, 4000);

  },

  computed: {

    currentIndex() {
      // Trouvez l'index de l'élément courant
      return (this.currentPage - 1);
    },
  },


  beforeUnmount() {

    window.removeEventListener('scroll', this.handleScroll);

    window.removeEventListener('resize', this.handleResize);
  },


  methods: {


    
 

    displayReviews(reviews) {

      reviews = this.reviews;
      const stratIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage
      const endIndex = stratIndex + this.itemsPerPage
      return reviews.slice(stratIndex, endIndex)
    },




    async fetchData() {

      try {
        const response = await fetch(`http://localhost:5001/review/home`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.reviews = data;
        this.totalItems = data.length;
        this.pagesShown = Math.ceil(this.totalItems / this.itemsPerPage);
        return data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },



    /* La fonction handlePageChange est automatiquement alimentée par la variable 'newPage' fournie par VueAwesomePagination.
     Lors de l'utilisation d'une liaison bidirectionnelle (v-model) avec VueAwesomePagination, cette variable est mise à jour automatiquement
     à chaque fois que l'utilisateur interagit avec la pagination, en cliquant sur un numéro de page, par exemple.
     Ainsi, 'newPage' représente le numéro de la page sélectionnée lors du clic dans le composant de pagination.*/

    handlePageChange(newPage) {

      console.log("click from home vue ok :", newPage)

      this.currentPage = newPage;

      // Faire quelque chose avec les avis paginés, par exemple, les assigner à une propriété


      this.scrollToTop();

    },

    
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Pour un défilement en douceur, si pris en charge
      })

      console.log("From scrollToTop()")
    },


    handleResize() {
      // Met à jour isDesktop lors de changements de taille d'écran
      this.isDesktop = window.innerWidth > 768;
    },


    handleScroll() {

      this.isScrolledY = window.scrollY > 174;

      if (this.actualPostionY != window.scrollY) {

        setTimeout(() => {
          this.showButton = true;
          this.actualPostionY = window.scrollY;
        }, 1800);


        setTimeout(() => {

          this.showButton = false;
        }, 5000);

      }
    },
  },
};

</script>
 
<style scoped>
/* config reset */

body {

  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background: none;
}

.pagination {

  display: flex;
  justify-content: center;

}

.main-container {

  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;

}

.create-review-mobile {

  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 3.5%;
  background-color: rgb(137, 120, 148);
  width: max-content;
  height: 2.8rem;
  color: rgb(252, 255, 254);
  font-family: "kalam", sans-serif;
  font-size: 1.2rem;
  text-shadow: 4px 4px 3px rgba(015, 0, 0, 0.3);
  border-radius: 25px;
  font-weight: 400;

}


</style>