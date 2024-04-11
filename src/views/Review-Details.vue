<template>



<Header />

<ReviewDetailsComponent   />

<Footer/>

</template>

<script>
import Header from '@/components/Header.vue';
import ReviewDetailsComponent from '../components/Review-Details-Component.vue';
import Footer from '@/components/Footer.vue';


export default {

    components:{
        ReviewDetailsComponent,
        Header,
        Footer
    }
}




</script>
