<template>
    <HeaderComponent />

    <div class="main-content-activate-reviews">
        <ReviewsAwaitingActivationComponent
            v-for="review in displayReviews(reviews) "
            :key="review.id"
            :theme="review.theme"
            :arrondissement="review.district_num"
            :place-name="review.place_name"
            :image-url="review.secure_url"
        />
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
        ReviewsAwaitingActivationComponent,

    },

     data() {
        return {
            reviews: [],
            totalItems: 0,
            pagesShown: 0,
            itemsPerPage: 10, // Define your items per page
             currentPage: 1 // Add currentPage to your data properties
        };
    },



    mounted() {
   
    this.displayReviews()
    this.fetchData()

    },


    methods: {

         displayReviews() {

      const stratIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage
      const endIndex = stratIndex + this.itemsPerPage
      return this.reviews.slice(stratIndex, endIndex)
    },

    async fetchData() {



            try { //perte de temps enorme ( une aprés midi ) a cause de l'url qui indiqué localhost 



                const response = await fetch(`http://192.168.1.168:5001/admin/disable-reviews`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.reviews = data;
                this.totalItems = data.length;

                const totalRviewsFromStore = this.$store.state.totalReviews;

                this.totalItems = totalRviewsFromStore;

                console.log('totalReviewsFromStore: ', this.totalItems);




                if (this.totalItems == 0) {

                    this.pagesShown = Math.ceil(this.totalItems / this.itemsPerPage);
                    this.$store.commit('setInitialReviews', data);

                    this.$store.commit('setTotalReviews', data.length);
                    console.log('totalReviewsFromStore: ', totalRviewsFromStore);

                }




            } catch (error) {
                console.error('Error fetching data:', error);
            }




        }
   
    }



}





</script>

<style scoped>
.FooterComponent {
  
    flex:1;
}
</style>
