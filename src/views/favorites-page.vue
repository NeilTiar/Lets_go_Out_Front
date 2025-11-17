<!-- 1- gerer le changement de classe concernant l'icon coeur suivant la props : isFavorited

2- il faudrait ajouter la gestion des token ( verification au clique de l'icon coeur)-->

<template>
  <HeaderComponent />
  <div class="main-container">
  
  

  <p class="empty-favori-msg" v-if="reviews.length == 0 && !loading"> Vous n'avez pas d'annonce en favoris </p>

  <main v-if="!reviews.length == 0 && !loading" class="cards-container">
  

    <ReviewCard
      v-for="review in reviews"
      :key="review.id"
      :review-id="review.review_id"
      :theme="review.theme"
      :arrondissement="review.district_num"
      :place-name="review.place_name"
      :image-url="review.secure_url[0]"
      @favorites-need-reload="displayFavoritesReviews"
       @click="getDetailsReviewOnClick(review)"
    />
  </main>
 </div>
  <div class="footer-container">
    <FooterComponent />
 
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header-component.vue';
import FooterComponent from '@/components/Footer-component.vue';
import ReviewCard from '@/components/Review-card-component.vue';

export default {
  name: 'FavoritesPage',
  components: {
    HeaderComponent,
    FooterComponent,
    ReviewCard,
  },

  data() {
    return {
      reviews: [],
    };
  },

  mounted() {
    this.displayFavoritesReviews();
  },

  methods: {

        getDetailsReviewOnClick(currentReview) {
      this.$store.state.currentReviewsPage = this.currentPage;
      this.$store.commit('setSelectedReview', currentReview);
      console.log('review was clicked !!!', currentReview.data);
      this.$router.push({ name: 'Review-details' });
    },

    async displayFavoritesReviews() {
      try {
        const accessToken = localStorage.getItem('accessToken');

        console.log('passe bien par fonction fetch pour afficher favoris !!!');

        const API_URL = import.meta.env.VITE_API_URL;

        const response = await fetch(
          `${API_URL}/review/get-favorites-reviews`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`, // Envoie le token dans l'en-tête d'autorisation
            },
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        const result = responseData.results;
        console.log(
          'result to get reviewId ==================>>>>>>>>>>>>: ',
          result
        );

        this.reviews = result; // Affecte directement le tableau des résultats
        this.loading = false; // Marque la fin du chargement
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
};
</script>

<style scoped>
.footer-container {
  height: auto;
  display: flex;
  align-items: flex-end;
}

.cards-container {
  margin: 2rem auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  width: 90vw;
}


.empty-favori-msg {
  display: flex;
  justify-content: center; 
  align-items: center;
  font-family: var(--font-title);
  text-align: center;
  font-size: 1.5rem;
  height:50vh;
  color: #555;
  

}
</style>
