<!-- ci dessous composant specifique permetant le point d'entrée principal pour l'aplication -->

<!-- App.vue -->
<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component
          :is="Component"
          :key="$route.fullPath"
         
        />
      </transition>
    </router-view>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
</style>
