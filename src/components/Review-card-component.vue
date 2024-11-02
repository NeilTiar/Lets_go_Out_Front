<template>
    <div
        class="card-container "
        :class="{ 'dark-mode-class': isDarkMode }"
    >
        <div class="card-review">
            <img
                :src="imageUrl"
                :alt="generateAltText()"
                class="card-image"
            >
            <h3
                :class="[{ 'culture': theme === 'Culture', 'loisir': theme === 'Loisir', 'food-drink': theme === 'Food&drink' }, 'card-theme']"
            >
                {{ theme }}
            </h3>
        </div>

        <div
            class="card-details"
            :class="{ 'dark-card-details': isDarkMode }"
        >
            <div
                class="card-info"
                :class="{ 'dark-card-info': isDarkMode }"
            >
                <div class="header-card-info">
                    <h2 class="detail place-name"> {{ placeName }}</h2>
                    <div class="favorite-icon" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class="svg-icon"
                        fill="currentColor"
                        @click.stop="handleFavorite(reviewId)"
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
                <p
                    class="detail arrondissement"
                    :class="{ 'dark-arrondissement': isDarkMode }"
                >
                    {{ arrondissement }} eme
                </p>
            </div>
        </div>
    </div>
</template>

<script>

export default {

  props: {

    theme: String,
    arrondissement: String,
    placeName: String,
    imageUrl: String,
    reviewId: Number,
  },
  
emits: ['favorites-need-reload'],

  data() {
    return {
      mouseX: 0,
      mouseY: 0,

    };
  },


  computed: {

     isDarkMode() {
      return this.$store.state.isDarkMode;
      
    },

 

    carteStyle() {
      const rotateX = this.mouseY * 30;
      const rotateY = this.mouseX * 30;

      return {
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      };
    },
  },

  watch : {

    isDarkMode(newVal) {
     console.log("test ",this.$store.state.isDarkMode, newVal)
    
    }
  },

  mounted() {
 
    console.log('Mounted ReviewCard - reviewId:', this.reviewId);
    
  },


  methods: {

   async handleFavorite() {

    
    console.log('this.reviewId =====================>>>>>>>>>>>>>>: ', this.reviewId);
    
    //event.stopPropagation();
    const accessToken = localStorage.getItem('accessToken');

     await fetch(`http://192.168.1.168:5001/review/handle-favorites`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`, // Envoie le token dans l'en-tête d'autorisation
                       
                    },
                    body : JSON.stringify({ review_id: this.reviewId}),
                });

                 this.$emit('favorites-need-reload');
    },


    isDarkmodeActive() {
      

      console.log("test depuis un composant pour acceder a l'etat de isDarkmode depuuis le store :",this.$store.state.isDarkMode)
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
    generateUrlImage() {
      return `${this.imageUrl}`
    },
    handleMouseMove(event) {
      this.mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      this.mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    },



  },
};


</script>

<style scoped>


@import url('../styles/Review-card.css');
</style>
