<template>
  <Header />

  <button v-if="isDesktop" class="create-review">créer une review</button>

  <button v-if="isScrolledY" class="create-review-after-scrollY">créer une review</button>

  <main class="cards-container" @mouseover="startHover" @mouseout="endHover">



    <ReviewCard v-for="review in displayReviews(reviews)" :key="review.id" :theme="review.theme"
      :arrondissement="review.district_num" :placeName="review.place_name" :imageUrl="review.secure_url" />

    <button v-show="showButton" v-if="!isDesktop" class="create-review-mobile">Créer une
      nouvelle review</button>



  </main>

<div class="pagination">

<vue-awesome-paginate
v-model="currentPage"
:total-items ="totalImages"
:items-per-page="itemsPerPage"
:max-page-shown="pagesShown"
@page-clicked="handlePageChange"
:container-class="pagination-container"
>
</vue-awesome-paginate>

</div>

  <Footer />
</template>
  
<script>

import { dataReviews } from '../assets/data/static-data-reviews.js';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue'
import ReviewCard from '../components/Review-card-component.vue';




export default {

  name: 'view-Home',
  components: {
    Header,
    Footer,
    ReviewCard,
   

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
      currentPage :1,
      itemsPerPage:12,
      totalReviews:0,
      pagesShown:1


    }

  
  },

  mounted() {

    window.addEventListener('scroll', this.handleScroll);

    window.addEventListener('resize', this.handleResize);


    // Initialiser actualPostionY à la position actuelle de défilement
    this.actualPostionY = window.scrollY;


    setTimeout(() => {
      this.hideButton = true;
    }, 4000);

     this.fetchData();

  },




  beforeUnmount() {

    window.removeEventListener('scroll', this.handleScroll);

    window.removeEventListener('resize', this.handleResize);
  },


  methods: {

    displayReviews() {
    
    const stratIndex = (this.currentPage * this.itemsPerPage ) - this.itemsPerPage
    const endIndex = stratIndex + this.itemsPerPage
     return this.reviews.slice(stratIndex,endIndex)

    },

    handlePageChange(data) {
   
    this.currentPage = data.currentPage

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

  async fetchData() {
      try {
         const response = await fetch(`http://localhost:5001/review/home`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        this.reviews = data;
        this.totalReviews = data.length;
        this.pagesShown = Math.ceil(this.totalReviews / this.itemsPerPage )
      } catch (error) {
        console.error('Error fetching data:', error);
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

}

.pagination {
display:flex;
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
  left:50%;
  transform: translateX(-50%);
  bottom: 3.5%;
  background-color: rgb(137, 120, 148);
  width: max-content;
  height: 2.8rem;
  color: rgb(252, 255, 254);
  font-family: "kalam",sans-serif;
  font-size: 1.2rem;
  text-shadow: 4px 4px 3px rgba(015, 0, 0, 0.3);
  border-radius: 25px;
  font-weight:400;
   
}
</style>../assets/data/static-data-reviews.js