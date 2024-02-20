<template>
  <div class="header-container" :class="{ 'desktop-style': isDesktop, 'mobile-style': !isDesktop }">

    <div class="header">

      <div class="container-logo-title">
        <!-- <img class=" logo" src="" alt="logo">-->
        <h1 class="header-title">L'ets go out to Paris</h1>
        <h2 class="title-description"> Explorez et partagez les meilleurs endroits de la ville lumière</h2>
      </div>
      <div v-bind:class="{ 'container-user-connexion-mobile': !isDesktop, 'container-user-connexion-desktop': isDesktop }"
        @mouseover="startHover" @mouseout="endHover">
        <img class="user-logo" src="../assets/user.png" alt="user">
        <div class="msg-user-logo">Bonjour, Neil</div>
      </div>
    </div>
  </div>


  <div v-if="isDesktop" class="top-desktop-menu">
    <nav class="theme-banner">
      <ul @mouseover="startHover" @mouseout="endHover">
        <li><a class="theme-link culture-link" href="#Culture">Culture</a></li>
        <li><a class="theme-link  food-and-drink-link" href="#FoodAndDrink">Food & Drink</a></li>
        <li><a class="theme-link  loisir-link" href="#Loisir">Loisir</a></li>
      </ul>

      <darkThemeComponent @click="handleToggle" />
    </nav>
  </div>


  <div v-if="!isDesktop" :class="[{ 'fixed-container': isFixed }, 'top-main']">

    <div class="container-left-button ">
      <div class="left-buttons">
        <img src="../assets/filter.png" alt="button-filter" class="buttons filter-button">
        <img src="../assets/search.png" alt="input-search" class="buttons search-button">
      </div>
    </div>

    <button class="create-review-banner" v-if="!isFixed">Créer une review</button>
    <p class='title-to-menu' v-if="isFixed">{{ TitleIfTopMenu }}</p>


    <div class="container-right-button">
      <div class="right-buttons">
        <img src="../assets/dark-moon.png" alt="moon-button" class="buttons moon-button">
        <img src="../assets/menu.png" alt="menu-button" class="buttons menu-button">
      </div>
    </div>
  </div>
</template>
  
<script>


import darkThemeComponent from '@/components/dark-theme-component.vue';


export default {

  components: {
    darkThemeComponent,

  },

  name: 'component-header',

  data() {

    return {

      isFixed: false,
      isClassPresent: false,
      TitleIfTopMenu: "",
      isDesktop: window.innerWidth > 768,
    };

  },


  mounted() {

    window.addEventListener('scroll', this.handleScroll);

    window.addEventListener('resize', this.handleResize);

  },
  beforeUnmount() {

    window.removeEventListener('scroll', this.handleScroll);

    window.removeEventListener('resize', this.handleResize);
  },






  methods: {

    handleToggle() {
      this.isActive = !this.isActive;

    },

    handleScroll() {
      const title = document.querySelector('h1');
      const titleBounding = title.getBoundingClientRect();
      this.isFixed = titleBounding.bottom <= 0;
      this.updateDynamicText();
    },

    updateDynamicText() {

      if (this.isFixed) {

        this.TitleIfTopMenu = "L'ets Go Out To Paris";

      } else {
        this.TitleIfTopMenu = "";
      }
    },

    handleResize() {
      // Met à jour isDesktop lors de changements de taille d'écran
      this.isDesktop = window.innerWidth > 768;
    },


  }
};

</script>
  


<style scoped>
@import url('../styles/Header.css');
</style>