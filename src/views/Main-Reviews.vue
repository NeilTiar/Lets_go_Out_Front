<template>
    <div
        v-if="isUserMenu"
        class="mobile-user-menu"
    >
        <div
            class="disableUserMenu"
            @click="HandleDisableUserMenu"
        >
            X
        </div>
    </div>

    <HeaderComponent
        v-model:isUserMenuFromHeader="isUserMenu"
        @is-user-menu-from-header="activateUserMenu"
    />

    <div
        class="container-main-reviews"
        :class="{ 'dark-body': isDarkMode }"
    >
        <button
            v-if="isScrolledY"
            class="create-review-after-scrollY"
        >
            créer une review
        </button>


        <main class="cards-container">
            <loadingComponent :loading="loading" />

            <ReviewCard
                v-for="review in displayReviews()"
                :key="review.id"
                :review-id="review.review_id"
                :theme="review.theme"
                :arrondissement="review.district_num"
                :place-name="review.place_name"
                :image-url="review.secure_url"
                @click="getDetailsReviewOnClick(review)"
            />

            <button
                v-show="showButton"
                v-if="!isDesktop"
                class="create-review-mobile"
            >
                Créer une
                nouvelle review
            </button>
        </main>


        <Pagination
            v-if="isDesktop"
            v-model="currentPage"
            :total-items="totalItems"
            :items-per-page="itemsPerPage"
            :max-page-shown="pagesShown"
            :reviews="reviews"
            @page-changed="handlePageChange"
        />

        <PaginationMobileComponent
            v-if="!isDesktop"
            v-model="currentPage"
            :total-items="totalItems"
            :items-per-page="itemsPerPage"
            :max-page-shown="pagesShown"
            :reviews="reviews"
            @mobile-page-changed="handlePageChange"
        />
    </div>

    <FooterComponent />
</template>

<script>

import { dataReviews } from '../assets/data/static-data-reviews.js';
import HeaderComponent from '@/components/Header-component.vue';
import FooterComponent from '@/components/Footer-component.vue';
import ReviewCard from '../components/Review-card-component.vue';
import Pagination from '../components/pagination-component.vue';
import PaginationMobileComponent from '../components/pagination-mobile-component.vue';
import loadingComponent from '../components/loading-component.vue';




export default {

  name: 'ViewHome',
  components: {

    HeaderComponent,
    FooterComponent,
    ReviewCard,
    Pagination,
    PaginationMobileComponent,
    loadingComponent,
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
      currentPage: this.$store.state.currentReviewsPage || 1,
      itemsPerPage: this.getDynamicItemsPerPage(),
      totalItems: this.$store.state.totalReviews,
      pagesShown: 1,
      pagination: {},
      currentId: null,
      isDarkmodeActive: this.$store.state.isDarkMode,
      loading: false,
      isUserMenu: false,
      reviewId: Number,

    }
  },

  computed: {



    isDarkMode() {
      return this.$store.state.isDarkMode;

    },

    currentIndex() {
      // Trouvez l'index de l'élément courant
      return (this.currentPage - 1);
    },
  },

  beforeMount() {

    this.fetchData();

    this.updateItemsPerPage();

    this.updateTotalItems();



  },




  async mounted() {


    const token =  localStorage.getItem('accessToken');

      console.log('req.authorization on mounted main page from localStorage: ' + token);
    

    /*test this.logTotalReviews()*/

    // les fonctions indiquées dans la section mounted d'un composant Vue sont automatiquement appelées lorsque le composant est monté dans le DOM

    window.addEventListener('scroll', this.handleScroll);

    window.addEventListener('resize', this.handleResize);


    // Initialiser actualPostionY à la position actuelle de défilement
    this.actualPostionY = window.scrollY;


    setTimeout(() => {
      this.hideButton = true;
    }, 4000);

    //test console.log("TOTAL ITEMS : ", this.totalItems);

  },


  beforeUnmount() {

    this.getTotalItems();

    window.removeEventListener('scroll', this.handleScroll);

    window.removeEventListener('resize', this.handleResize);
  },


  methods: {

    activateUserMenu() {

      this.isUserMenu = true;
      document.body.style.overflowY = 'hidden';
      console.log("From Activate User menu Func ", this.isUserMenu);

    },

    HandleDisableUserMenu() {
      this.isUserMenu = false;
      document.body.style.overflowY = 'auto';
    },


    getDynamicItemsPerPage() {
      return this.isDesktop ? 18 : 10;
    },


    /* test logTotalReviews(){
    console.log('this.$store.state.totalReviews: ', this.$store.state.totalReviews);
    },*/

    updateItemsPerPage() {

      if (!this.isDesktop) { // Mobile
        this.itemsPerPage = 10;
      } else { // Desktop
        this.itemsPerPage = 18;
      }
    },

    getTotalItems() {

      return this.$store.state.totalReviews === this.reviews.length;
    },

    getDetailsReviewOnClick(currentReview) {

      this.$store.state.currentReviewsPage = this.currentPage;
      this.$store.commit('setSelectedReview', currentReview);
      console.log("review was clicked !!!", currentReview.data)
      this.$router.push({ name: 'Review-details' });
    },



    displayReviews() {

      const startIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return this.reviews.slice(startIndex, endIndex)
    },

    updateTotalItems() {
      this.totalItems = this.$store.state.totalItems;
      console.log('totalItems: ', this.totalItems);
      this.$store.commit('setTotalReviews', this.totalItems);
    },




    async fetchData() {



      try { //perte de temps enorme ( une aprés midi ) a cause de l'url qui indiqué localhost 



        const response = await fetch(`http://192.168.1.168:5001/review/home`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.reviews = data;
        this.totalItems = data.length;

        const totalReviewsFromStore = this.$store.state.totalReviews;

        this.totalItems = totalReviewsFromStore;

        //test console.log('totalReviewsFromStore: ', this.totalItems);


        // test console.log("reviews from Main Reviews", this.reviews)

        if (this.totalItems == 0) {

          this.pagesShown = Math.ceil(this.totalItems / this.itemsPerPage);
          this.$store.commit('setInitialReviews', data);

          this.$store.commit('setTotalReviews', data.length);
          //test  console.log('totalReviewsFromStore: ', totalRviewsFromStore);

        }


        /*  détail sur la methode employé pour concerver les memes reviews qu'au premier chargement ,meme si visite autre pages que main-reviews:
        
            this.reviews etant le point d'acces pour afficher les annonces, (voir composant ReviewCard plus haut)
            l'idée est de copier this.reviews dans une propiété du store "initialReviews" ,celle ci alimentée au chargement de la page (l'ors du fetch)
            si initialeReviews est non vide ,elle vas alimenter this.reviews 
            pour afficher les meme annonces qu'au premier chargement car le fait de les stocker dans le store permet une immutabilité
            les annonces s'affichent donc dans le bonne ordre.
          */



        //this.reviews = JSON.parse(JSON.stringify(this.$store.state.initialReviews));

        /*
        L'utilisation de JSON.parse(JSON.stringify(...)) est une technique courante pour créer une copie profonde (deep copy) d'un objet en JavaScript.
         Voici comment cela fonctionne :
        
        JSON.stringify() convertit l'objet JavaScript en une chaîne JSON.
        JSON.parse() convertit la chaîne JSON en un nouvel objet JavaScript.
        Cette approche est utilisée pour contourner le fait que JSON.stringify() ne peut pas sérialiser
         les objets qui contiennent des références circulaires (lorsque des objets se référencent mutuellement).
        
        Dans le contexte de Vuex, cela peut être utile lorsque vous stockez des données complexes dans l'état de Vuex 
        et que vous devez effectuer des opérations d'écriture sans modifier l'état Vuex d'origine. Par exemple,
         si vous avez besoin de copier les données initiales de votre magasin Vuex pour les modifier localement dans 
         un composant sans altérer les données originales du magasin, cette technique est utile.    */



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

.mobile-user-menu {

  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  /* Couleur de fond semi-transparente */
  backdrop-filter: blur(4.5px);
  /* Applique un flou */
  overflow-y: hidden;
  z-index: 4;
}

.disableUserMenu {

  margin: 0.5rem;
  display: flex;
  line-height: 1;
  /* Ajuste la hauteur de ligne pour centrer verticalement */
  color: rgb(189, 183, 189);
  font-size: 3rem;
  font-weight: bolde;
  font-family: Arial, sans-serif;
  transform-origin: center;
  border-radius: 25px;
  justify-content: end
}

.dark-body {

  background-color: rgb(48, 34, 70);
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
  margin: 0;
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

.header {
  position: relative;
  border: 3px solid black;
  width: 100%;
}

.container-main-review {
  background-color: aquamarine;
}
</style>