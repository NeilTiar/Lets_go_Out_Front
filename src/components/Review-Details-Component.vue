<template>
  <div
    v-if="currentReview"
    :class="[
      isDarkMode && !isDesktop ? 'dark-mode-currentReview' : 'currentReview',
    ]"
  >
    <p class="theme">{{ currentReview.theme }}</p>
    <h1 class="title">{{ currentReview.place_name }}</h1>
    <p class="adress" :class="{ 'dark-mode-adress': isDarkMode }">
      {{ currentReview.adress_place }}
    </p>

    <Swiper
      v-if="!isDesktop"
      swiper
      :rewind="true"
      :navigation="true"
      class="mySwiper"
    >
      <SwiperSlide v-for="(photoUrl, index) in pictures" :key="index">
        <img
          v-if="!isDesktop"
          :src="photoUrl.secure_url"
          :alt="generateAltText()"
        />
      </SwiperSlide>
    </Swiper>

    <div
      v-for="(photoUrl, index) in pictures"
      :key="index"
      class="container-desktop-pictures"
    >
      <img
        v-if="isDesktop"
        class="desktop-pictures"
        :src="photoUrl.secure_url"
        :alt="generateAltText()"
      />
    </div>

    <p class="review" :class="{ 'dark-mode-review': isDarkMode }">
      {{ currentReview.review }}
    </p>
    <p class="author" :class="{ 'dark-mode-author': isDarkMode }">
      {{ currentReview.creator_name }}
    </p>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  props: {
    theme:{type: String, default: null},
    arrondissement:{type: String, default: null},
    placeName: {type: String, default: null},
  },

  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },

  data() {
    return {
      imageUrl: null,
      pictures: [],
      review_id: null,
      isDesktop: window.innerWidth > 768,
    };
  },

  computed: {
    currentReview() {
      return this.$store.state.selectedReview; // Utilisez une propriété calculée pour récupérer les détails de l'annonce
    },

    isDarkMode() {
      return this.$store.state.isDarkMode;
    },
  },

  watch: {
    isDarkMode(newVal) {
      console.log('test ', this.$store.state.isDarkMode, newVal);
    },
  },

  mounted() {
    // Récupération des données depuis localStorage lors de la création du store
    const selectedReviewFromStorage = localStorage.getItem('selectedReview');

    if (selectedReviewFromStorage) {
      this.$store.commit(
        'setSelectedReview',
        JSON.parse(selectedReviewFromStorage)
      );
    }

    this.imageUrl = this.currentReview.secure_url;

    // Convertir la chaîne JSON en objet JavaScript !!! ( perte de temps , convertion à faire non soupconné )
    const reviewObject = JSON.parse(selectedReviewFromStorage);

    /* JSON.parse() est utilisé pour convertir une chaîne JSON en un objet JavaScrip, et ceux afin d'exploiter les données coté front.
         à l'inverse .json() est souvent utilisé pour recevoir et envoyer des données entre le navigateur et le serveur via des requêtes HTTP, 
        ou pour stocker des données localement dans le navigateur via le stockage local ou les cookies . */

    const reviewId = reviewObject.review_id;

    this.review_id = reviewId;

    // const reviewId = selectedReviewFromStorage;

    // test console.log(`reviewId from mounted :`, reviewId);  Ceci affichera 785 dans la console

    this.fetchPictures();

    console.log('selectedReviewFromStorage :');
  },

  methods: {
    async fetchPictures() {
      try {
        const response = await fetch(
          `http://localhost:5001/review/pictures?review_id=${this.review_id}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        this.pictures = data;
        console.log(`data from fetch:`, data);
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    isDarkmodeActive() {
      console.log(
        "test depuis un composant pour acceder a l'etat de isDarkmode depuuis le store :",
        this.$store.state.isDarkMode
      );
      // Access and update the state from the Vuex store
      this.$store.commit('toggleDarkMode');
      // Your other dark mode logic here
    },

    generateAltText() {
      return `Description de l'image ${this.placeName}`;
    },

    generateTheme() {
      return `${this.theme}`;
    },
  },
};
</script>

<style scoped>
.currentReview {
  display: flex;
  flex-direction: column;
  width: 80vw;
  gap: 0.8rem;
  margin: auto;
}

html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family:
    Helvetica Neue,
    Helvetica,
    Arial,
    sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide {
  width: 80%;
  height: 110%;
  object-fit: scale-down;
}

img {
  width: 100%;
  height: 40rem;
}

.review {
  width: 80%;
  margin: 2rem auto;
  font-size: 2.3rem;
  font-family: Arial, Helvetica, sans-serif;
}

.author {
  font-size: 1.2rem;
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
}

.theme {
  font-size: 2.6rem;
  font-family: 'Exo 2', sans-serif;
  margin-top: 4rem;
  font-weight: 600;
  color: #3aafad;
}

.desktop-pictures-container {
  border: 1px solid black;
  height: 35rem;
  border-radius: 25px;
}

.desktop-pictures {
  border-radius: 25px;
  object-fit: contain;
  width: 100%;
  margin-top: 4rem;
}

.title {
  margin: 3rem 0 0 0;
}

.author {
  text-align: right;
  margin: 0 12rem 5rem 0;
  font-size: 1.4rem;
}

.dark-mode-author {
  margin: 0;
}

.dark-mode-adress,
.dark-mode-review,
.dark-mode-author {
  color: #fff;
}

.dark-mode-currentReview {
  background-color: #000;
}

@media screen and (min-width: 2000px) {
  .swiper-slide {
    border-radius: 25px;
    width: 60%;
  }

  .img {
    object-fit: fill;
  }

  .desktop-pictures {
    width: 80%;
    margin: auto;
  }
}

/*@import url('../');*/
</style>
