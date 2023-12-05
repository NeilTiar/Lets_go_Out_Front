<template>
  <Header />

  <main class="cards-container" @mouseover="startHover" @mouseout="endHover">

   
    
 <ReviewCard v-for="(review, index) in dataReviews" :key="index" :theme="review.theme"
      :arrondissement="review.arrondissement" :placeName="review.placeName" :imageUrl="review.imageUrl" />
   
  </main>



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

    }
  }
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



</style>../assets/data/static-data-reviews.js