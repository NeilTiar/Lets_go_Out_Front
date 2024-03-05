<template>
  <div class="header-container" :class="{ 'desktop-style': isDesktop, 'mobile-style': !isDesktop }" @scroll-up="handleScroll">

    <div class="header">

      <div class="container-logo-title">
        <!-- <img class=" logo" src="" alt="logo">-->
        <h1 >
        <a class="header-title" href="/">Let's go out in Paris</a>
        </h1>
        <h2 v-if="isDesktop" class="title-description"> Explorez et partagez les meilleurs endroits de la ville lumière
        </h2>
        <h2 v-if="!isDesktop" class="title-description"> les meilleurs endroits de la ville lumière</h2>
      </div>
      <div v-bind:class="{ 'container-user-connexion-mobile': !isDesktop, 'container-user-connexion-desktop': isDesktop }"
        @mouseover="startHover" @mouseout="endHover">
        <img class="user-logo" src="../assets/user.png" alt="user">
        <div class="msg-user-logo">Bonjour, Neil</div>
        <div class="dark-button-container">
          <darkThemeComponent v-if="isDesktop" @click="handleToggle" />
        </div>
      </div>
    </div>
  </div>

  <div v-if="isDesktop" class="top-desktop-menu">
    <nav class="theme-banner">
      <ul @mouseover="startHover" @mouseout="endHover">
        <li><a class="theme-link culture-link" href="#Culture">Culture</a></li>
        <li><a class="theme-link  food-and-drink-link" href="#FoodAndDrink">Food & Drink</a></li>
        <li><a class="theme-link  loisir-link" href="#Loisir">Loisirs</a></li>
        <div class="container-create-review-link">
          <li class="link-create-review"><a class="theme-link  create-link" href="#create">Creer une review </a>
            <div class="logo-container">
              <img class="logo-camera" src="../assets/black-camera.png" alt="logo-camera">
            </div>
          </li>

        </div>
      </ul>


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
      previousScrollY : 0,
      isScrollingUpX : false,
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
  
      if (this.isFixed ) {
        this.TitleIfTopMenu = "L'ets Go Out in Paris";

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