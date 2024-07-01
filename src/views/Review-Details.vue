<template>
    <div :class="[getDarkmodestate ? 'container-dark-mode-review-details' : 'container-review-details']">
        <HeaderComponent />

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


  computed: {
        getDarkmodestate() {
            return this.$store.state.isDarkMode;
        },
  },

}




</script>


<style scoped>

.container-dark-mode-review-details {

    background-color: black;
}

</style>