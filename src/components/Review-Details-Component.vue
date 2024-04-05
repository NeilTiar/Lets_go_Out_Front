<template>

    <div class="currentReview" v-if="currentReview">>


        <p class="test">Test depuis le composant !!!!!{{ currentReview }}</p>

        <p class="theme"> {{ currentReview.theme }}</p>

        <h1 class="title">{{ currentReview.place_name }}</h1>


        <img :src="imageUrl" alt="image test " />

        <p class="review">{{ currentReview.review }}</p>


        <p class="author">{{ currentReview.creator_name }}</p>

          <div v-if="pictures.length > 0" class="photos">
      <img v-for="photoUrl of pictures" :key="photoUrl.secure_url" :src="photoUrl.secure_url" alt="Photo">
    </div>
    <div v-else>
      <p>Aucune photo trouvée</p>
    </div>
         

    </div>
</template>

<script>

export default {

    components: {

    },

    data() {

        return {
            imageUrl: null,
            pictures: [],
            review_id : null,

        };

    },



    mounted() {

        // Récupération des données depuis localStorage lors de la création du store
        const selectedReviewFromStorage = localStorage.getItem('selectedReview');
        if (selectedReviewFromStorage) {
            this.$store.commit('setSelectedReview', JSON.parse(selectedReviewFromStorage));
        }

        this.imageUrl = this.currentReview.secure_url;


    // Convertir la chaîne JSON en objet JavaScript !!! (perte de temps , convertion a faire non soupconné) 
        const reviewObject = JSON.parse(selectedReviewFromStorage);

        const reviewId = reviewObject.review_id;

        this.review_id = reviewId;

    // const reviewId = selectedReviewFromStorage;

    console.log(`reviewId from mounted :`,reviewId); // Ceci affichera 785 dans la console

        this.fetchPictures();

      console.log("selectedReviewFromStorage :",)

      

    },


    computed: {

        currentReview() {
            return this.$store.state.selectedReview; // Utilisez une propriété calculée pour récupérer les détails de l'annonce
        },

        isDarkMode() {
            return this.$store.state.isDarkMode;

        },


    },

    props: {

        theme: String,
        arrondissement: String,
        placeName: String,

    },


    watch: {

        isDarkMode(newVal) {
            console.log("test ", this.$store.state.isDarkMode, newVal)

        }
    },


    methods: {



        async fetchPictures() {

            try {


                const response = await fetch(`http://192.168.1.168:5001/review/pictures?review_id=${this.review_id}`);

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


            console.log("test depuis un composant pour acceder a l'etat de isDarkmode depuuis le store :", this.$store.state.isDarkMode)
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
    width: 50vw;
    gap: 0.8rem;
    margin: auto;
}

/*@import url('../');*/
</style>
