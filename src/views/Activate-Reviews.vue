<template>
    <HeaderComponent />

    <div class="main-content-activate-reviews">
        <div class="reviews-grid">
            <ReviewsAwaitingActivationComponent
                v-for="review in reviews"
                :key="review.review_id"
                :theme="review.theme"
                :arrondissement-test="review.district_num"
                :place-name="review.place_name"
                :image-url="review.pictures"
                :author="review.author"
                :description="review.review"
                :address-place="review.address_place"
            />
        </div>
        <div />

        <FooterComponent class="FooterComponent" />
    </div>
</template>

<script>

import HeaderComponent from '@/components/Header-component.vue';
import FooterComponent from '@/components/Footer-component.vue';
import ReviewsAwaitingActivationComponent from '@/components/Reviews-awaiting-activation-component.vue';



export default {

    name: 'ActivateReviews',
    components: {
        HeaderComponent,
        FooterComponent,
        ReviewsAwaitingActivationComponent

    },

    data() {
        return {
            reviews: [],
            totalItems: 0,
            pagesShown: 0,
            itemsPerPage: 10, // Define your items per page
            currentPage: 1, // Add currentPage to your data properties
            organizedPictures: {},

        };
    },

   onMounted() {

     console.log("reviews from Activate Reviews", this.reviews)
   },

    beforeMount() {

        
        this.displayReviews()


    },

    mounted() {
   this.fetchData()
     console.log('log REVIEWS:', JSON.stringify(this.reviews));

    },

    


    methods: {

        displayReviews() {

            const stratIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage
            const endIndex = stratIndex + this.itemsPerPage
            return this.reviews.slice(stratIndex, endIndex)
        },




        async fetchData() {



            try { //perte de temps enorme ( une aprés midi ) a cause de l'url qui indiqué localhost au lieu de 192.168.1.168



                const response = await fetch(`http://192.168.1.168:5001/admin/disable-reviews`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('data: ', data);
            
                console.log('DATA TEST FIND PICTURES', data);
                this.totalItems = data.length;

                const totalRviewsFromStore = this.$store.state.totalReviews;

                this.totalItems = totalRviewsFromStore;

            // Utiliser un objet pour regrouper les données par review_id
    const reviewsMap = data.reduce((acc, item) => {
      if (!acc[item.review_id]) {
        acc[item.review_id] = {
          review_id: item.review_id,
          place_name: item.place_name,
          review: item.review,
          district_num: item.district_num,
          creator_name: item.creator_name,
          is_active: item.is_active,
          author:item.creator_name,
          theme:item.theme,
          address_place: item.adress_place,
          pictures: []
        };
      }
      // Ajouter l'image à la liste des images de la revue
      acc[item.review_id].pictures.push(item.secure_url);
      return acc;
    }, {});

    // Convertir l'objet reviewsMap en un tableau
   // const orderedReviewsWithPics = ;

    this.reviews = Object.values(reviewsMap)

    // Afficher le résultat
    //console.log('orderedReviewsWithPics: ', orderedReviewsWithPics);

    

                //test console.log('totalReviewsFromStore: ', this.totalItems);

                /*  this.reviews.forEach(review => {
 
                 if (!this.organizedPictures[review.review_id]) {
 
                     this.organizedPictures[review.review_id] = [];
                }//if(review.is_main_picture){
                // this.organizedPictures[review.review_id].unshift(review.secure_url)
                 }
                 if( review.is_main_picture ){
 
                 //la props a alimenter /la clé dans le tableau/la valeur avec methode unshift pour placer en premier dans le tableau ( index[0]) 
                 this.organizedPictures[review.review_id].unshift(review.secure_url);
                 }else {
                  this.organizedPictures[review.review_id].push(review.secure_url);
                 }
 
                 return this.organizedPictures[review.review_id]
 
                 
             });*/



               

                if (this.totalItems == 0) {

                    this.pagesShown = Math.ceil(this.totalItems / this.itemsPerPage);


                }

                console.log('DATA TEST FIND PICTURES', JSON.stringify(this.organizedPictures));


            } catch (error) {
                console.error('Error fetching data:', error);
            }




        }

    }



}





</script>

<style scoped>
.FooterComponent {

    flex: 1;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 items per row */


}




</style>
