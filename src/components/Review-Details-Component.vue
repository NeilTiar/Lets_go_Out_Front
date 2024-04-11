<template>

    <div class="currentReview" v-if="currentReview">
        <p class="theme">{{ currentReview.theme }}</p>
        <h1 class="title">{{ currentReview.place_name }}</h1>
        <swiper swiper :rewind="true" :navigation="true" class="mySwiper">
            <swiper-slide v-for="(photoUrl, index) in pictures" :key="index">
                <img :src="photoUrl.secure_url" :alt="generateAltText()">
            </swiper-slide>
        </swiper>
        <p class="review">{{ currentReview.review }}</p>
        <p class="author">{{ currentReview.creator_name }}</p>
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

        /* JSON.parse() est utilisé pour convertir une chaîne JSON en un objet JavaScrip, et ceux afin d'exploiter les données coté front.
         à l'inverse .json() est souvent utilisé pour recevoir et envoyer des données entre le navigateur et le serveur via des requêtes HTTP, 
        ou pour stocker des données localement dans le navigateur via le stockage local ou les cookies .*/


        const reviewId = reviewObject.review_id;

        this.review_id = reviewId;

        // const reviewId = selectedReviewFromStorage;

        console.log(`reviewId from mounted :`, reviewId); // Ceci affichera 785 dans la console

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
    width: 80vw;
    height:100vh;
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
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
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

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit:cover;
    border-radius: 15px;
}

.review {
    font-size: 1.8rem;
    font-family: Arial, Helvetica, sans-serif;
}

.author {
    font-size: 1.2rem;
    font-family:Arial, Helvetica, sans-serif;
    font-style: italic;
}


/*@import url('../');*/
</style>
