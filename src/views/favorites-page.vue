<!-- 1- gerer le changement de classe concernant l'icon coeur suivant la props : isFavorited

2- il faudrait ajouter la gestion des token ( verification au clique de l'icon coeur)-->

<template>
 
<div class="favorites-page-root">
  <HeaderComponent />
  
  <div class="main-container">

    <!--  1 - message quand pas de favoris ET pas loading -->
    <p v-if="!loading && reviews.length === 0" class="empty-favori-msg">
      Vous n'avez pas d'annonce en favoris
    </p>

    <!--  2 - toujours afficher le main -->
    <main class="cards-container">

      <!--  2A - skeleton pendant le loading -->
<div v-if="loading">
  <SkeletonCard
    v-for="n in itemsPerPage"
    :key="n"
  />

</div>

      <!--  2B - vraies cartes une fois chargé -->
      <ReviewCard
        v-for="review in reviews"
        v-else
        :key="review.review_id"
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

</div>
</template>

<script>
import HeaderComponent from '@/components/Header-component.vue';
import FooterComponent from '@/components/Footer-component.vue';
import ReviewCard from '@/components/Review-card-component.vue';
import SkeletonCard from '@/components/skeleton-compenent.vue';  

export default {
  name: 'FavoritesPage',
  components: {
    HeaderComponent,
    FooterComponent,
    ReviewCard,
    SkeletonCard,
  },

  data() {
    return {
      reviews: [],
      loading: false,
      itemsPerPage : 6,

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

         setTimeout(() => {this.loading = false}, 4800);
         

        this.loading = false;

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
