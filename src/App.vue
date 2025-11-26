<!-- ci dessous composant specifique permetant le point d'entrée principal pour l'aplication -->

<!-- App.vue -->
<template>
  <div id="app">
    <router-view :is-mobile="isMobile" />
  </div>
</template>

<script>
export default {

   name: 'App',

   data() {
    return {
      isMobile: window.innerWidth <= 768,
    };
  },

   mounted() {
    window.addEventListener("resize", this.updateIsMobile);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.updateIsMobile);
  },

  methods: {
    updateIsMobile() {
      this.isMobile = window.innerWidth <= 768;
    }
  },

 

};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
</style>
