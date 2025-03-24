<template>
    <HeaderComponent />
    
    <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/Header-component.vue';
import FooterComponent from '@/components/Footer-component.vue';

export default {

    name: 'ViewHome',
    components: {

        HeaderComponent,
        FooterComponent


    },
}



</script>