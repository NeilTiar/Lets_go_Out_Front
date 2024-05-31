<template>
    <div>
        <HeaderComponent @return-button-clicked="handlePagePaginate" />

        <ReviewDetailsComponent />

        <FooterComponent />
    </div>
</template>

<script>
import ReviewDetailsComponent from '../components/Review-Details-Component.vue';
import FooterComponent from '@/components/Footer-component.vue';
import HeaderComponent from '@/components/Header-component.vue';


export default {

    components:{
        ReviewDetailsComponent,
        HeaderComponent,
        FooterComponent
    },

     methods: {
    handlePagePaginate() {
    
    
      console.log("TEST DEPUIS CLICK BACK BUTTON ")
    }
  }
}




</script>
