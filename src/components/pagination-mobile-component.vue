<template>
    <!-- Emplacement pour le bouton de page précédente -->

    <div class="mobile-pagination-container">
        <div class="prev">
            <button
                class="prevButton"
                @click="handlePrevPage"
            >
                <img
                    class="arrow-prev-img"
                    src="../assets/arrow.png"
                    alt="black arrow for next page"
                >
            </button>
        </div>  
        <!-- Emplacement pour le numéro de la page courante -->

        <p class="num-page-mobile">page n° : {{ currentPage }}/ {{ pagesShown + 1 }}</p>
        <!-- Emplacement pour le bouton de page suivante -->
        <div class="next">
            <button
                class="nextButton"
                @click="handleNextPage"
            >
                <img
                    class="arrow-next-img"
                    src="../assets/arrow.png"
                    alt="black arrow for next page"
                >
            </button>
        </div>
        <div class="ts" />
    </div>
</template>

<script>



export default {

    emits: ['mobile-page-changed'],

    data() {
        return {

            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 100,
            pagesShown: 1,
            
        };
    },


    methods: {
        
        handleNextPage() {

           if(this.currentPage < this.pagesShown + 1) {
            this.currentPage++
           }else{
            return this.currentPage
           }
             this.$emit('mobile-page-changed', this.currentPage);
           
            // Faire quelque chose avec les avis paginés, par exemple, les assigner à une propriété
        },


          
        handlePrevPage() {

              if(this.currentPage >  1) {
            this.currentPage--
           }else{
            return this.currentPage
           }
            
             this.$emit('mobile-page-changed', this.currentPage);
            
            // Faire quelque chose avec les avis paginés, par exemple, les assigner à une propriété
        },
    },
};
</script>

<style>

.mobile-pagination-container{
    display:flex;
    align-items: center;
    justify-content: center;
    gap:0.7rem;
    height:4rem;
}

.mobile-pagination-container button{
    display: flex;

   background-color:rgb(124, 108, 136) ;
   color:aliceblue;
   align-items: center;
   justify-content: center;
   height:2rem;
   

}

.prevButton {
    display: flex;
    background-color: brown;
border-radius: 15px  0 0 15px ;
font-size: 2rem;

}

.nextButton {
    display: flex;
    background-color: brown;
border-radius: 0  15px 15px  0;
font-size: 2rem;
}

.num-page-mobile {

 font-family:"Courgette",cursive;
 color:rgb(44, 25, 63);
}

.arrow-next-img {
    height:1rem;
    width: 1rem;
}

.arrow-prev-img {
    height:1rem;
    width: 1rem;
   transform:  rotate(180deg);
}

</style>


