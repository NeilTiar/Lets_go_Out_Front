
<!-- 1- gerer le changement de classe concernant l'icon coeur suivant la props : isFavorited

2- il faudrait ajouter la gestion des token ( verification au clique de l'icon coeur)-->


<template>
    <HeaderComponent />
    <div class="main-container">
        <div class="favorites-reviews-container" />
    </div>

    <main class="cards-container">
        <loadingComponent :loading="loading" />

        <ReviewCard
            v-for="review in reviews "
            :key="review.id"
            :review-id="review.review_id"
            :theme="review.theme"
            :arrondissement="review.district_num"
            :place-name="review.place_name"
            :image-url="review.secure_url[0]"
            @favorites-need-reload="displayFavoritesReviews"
        />
    </main>


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

            reviews: []

        }



    },

    mounted() {

        this.displayFavoritesReviews()

    
    },

    methods: {


        async displayFavoritesReviews() {

            try {

                const accessToken = localStorage.getItem('accessToken');

                console.log("passe bien par fonction fetch pour afficher favoris !!!");

                const response = await fetch(`http://localhost:5001/review/get-favorites-reviews`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}` // Envoie le token dans l'en-tête d'autorisation
                    }

                });



                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();

                

                const result = responseData.results;
                console.log('result to get reviewId ==================>>>>>>>>>>>>: ', result);

                

                 this.reviews = result; // Affecte directement le tableau des résultats
                 this.loading = false; // Marque la fin du chargement

               
            } catch (error) {


                console.error('Error fetching data:', error);
            }






        }

    }
}




</script>

<style scoped>
.footer-container {

    height: auto;
    background-color: blue;
    display: flex;
    align-items: flex-end;

}
</style>