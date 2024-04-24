<template>
    <HeaderComponent />

    <ReviewDetailsComponent />

    <FooterComponent />
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
    }
}




</script>
