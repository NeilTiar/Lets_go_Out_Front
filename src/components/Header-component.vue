<template>
    <div
        class="header-container"
        :class="{ 'desktop-style': isDesktop, 'mobile-style': !isDesktop }"
        @scroll-up="handleScroll"
    >
        <div class="header">
            <div class="container-logo-title">
                <!-- <img class=" logo" src="" alt="logo">-->
                <h1>
                    <a
                        class="header-title"
                        href="/"
                    >Let's go out in Paris</a>
                </h1>
                <h2
                    v-if="isDesktop"
                    class="title-description"
                >
                    Explorez et partagez les meilleurs endroits de la ville lumière
                </h2>
                <h2
                    v-if="!isDesktop"
                    class="title-description"
                >
                    les meilleurs endroits de la ville lumière
                </h2>
            </div>
        </div>
    </div>

    <div class="container-user-dark-theme">
        <div class="container-logo-pseudo">
            <img
                class="user-logo"
                src="../assets/user.png"
                alt="user"
            >
            <div
                :class="{ 'msg-user-log': !isDarkMode,'dark-mode-user-logo': isDarkMode}"
            >
                Bonjour, {{ pseudo }}
            </div>
        </div>
        <div class="dark-button-container">
            <darkThemeComponent
                v-if="isDesktop"
                @click="handleToggle"
            />
        </div>
    </div>

    <div
        v-if="$route.path === '/review-details'"
        :class="{ 'container-user-connexion-mobile': !isDesktop, 'container-user-connexion-desktop': isDesktop }"
        @mouseover="startHover"
        @mouseout="endHover"
    >
        <div
            v-if="$route.path === '/review-details'"
            class="return-button"
            @click="handleReturnButton"
        >
            retour vers reviews
        </div>
    </div>

    <div
        v-if="isDesktop"
        class="top-desktop-menu"
    >
        <nav 
            v-if="shouldDisplayBannerTheme" 
            class="theme-banner"
        >
            <ul
                class="themes"
                @mouseover="startHover"
                @mouseout="endHover"
            >
                <li class="theme-link">
                    <a 
                        class="theme-link culture-link"
                        href="#Culture"
                    >Culture</a>
                </li>
                <li class="theme-link">
                    <a
                        class="theme-link  food-and-drink-link"
                        href="#FoodAndDrink"
                    >Food & Drink</a>
                </li>
                <li class="theme-link">
                    <a
                        class="theme-link  loisir-link"
                        href="#Loisir"
                    >Loisirs</a>
                </li>
            </ul>

            <div class="container-create-review-link">
                <li class="link-create-review">
                    <a
                        class="create-link"
                        @click="navigateToCreateReview"
                    >Creer une review </a>
                    <div class="logo-container">
                        <img
                            :class="{'dark-logo-camera': isDarkMode }"
                            class="logo-camera"
                            src="../assets/black-camera.png"
                            alt="logo-camera"
                        >
                    </div>
                </li>
            </div>
        </nav>
    </div>


    <div
        v-if="!isDesktop"
        class="top-menu"
        :class="[{ 'fixed-container': isFixed, 'dark-top-menu': isDarkMode }, 'top-main']"
    >
        <div class="container-left-button ">
            <div :class="[{ 'dark-button': isDarkMode }, 'left-buttons']">
                <img
                    src="../assets/filter.png"
                    alt="button-filter"
                    class="buttons filter-button"
                >
                <img
                    src="../assets/search.png"
                    alt="input-search"
                    class="buttons search-button"
                >
            </div>
        </div>
        <p
            v-if="isFixed"
            :class="[{ 'dark-title': isDarkMode }, 'title-to-menu']"
        >
            {{ TitleIfTopMenu }}
        </p>

        <button
            v-if="!isFixed"
            class="create-review-banner"
        >
            Créer une review
        </button>


        <div class="container-right-button">
            <div :class="[{ 'dark-button': isDarkMode }, 'right-buttons']">
                <img
                    v-if="isDarkmodeActive"
                    src="../assets/dark-moon.png"
                    alt="moon-button"
                    class="buttons moon-button"
                    :class="{ 'darkTheme': isDarkMode, 'lightTheme': !isDarkMode, 'buttons': true, 'moon-button': true }"
                    @click="isDarkmodeActive"
                >

                <img
                    src="../assets/menu.png"
                    alt="menu-button"
                    class="buttons menu-button"
                >
            </div>
        </div>
    </div>
</template>

<script>


import darkThemeComponent from '@/components/dark-theme-component.vue';

// eslint-disable-next-line no-unused-vars
import store from '../store/store'
import { mapState } from 'vuex';

export default {

  name: 'ComponentHeader',

  components: {
    darkThemeComponent,

  },

     emits: ['returnButtonClicked'],

  data() {

    return {

      isFixed: false,
      isClassPresent: false,
      TitleIfTopMenu: "",
      isDesktop: window.innerWidth > 768,
      previousScrollY: 0,
      isScrollingUpX: false,
      pseudo: this.$store.state.pseudo,
    };

  },

    computed: {
    ...mapState(['isDarkMode']),
    // Autres computed properties

     shouldDisplayBannerTheme() {
      const excludedPaths = ['/review-details', '/create-review']; // Liste des chemins à exclure
      return !excludedPaths.includes(this.$route.path);
    }
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
    
    handleReturnButton() {
         this.$emit('returnButtonClicked');
         //logic pour alimenter currentPage avec this.$store.state.currentReviewsPage
       window.history.back();
     console.log("from return button on click")
    },



            navigateToCreateReview() {
      // Utiliser router.push() pour naviguer vers une autre page
      this.$router.push('/create-review')
      console.log("ok from crer une review")
    },

     
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

.dark-button {

  filter: invert(100%);
}

.dark-top-menu {
  background-color: rgb(36, 33, 33);
}

.dark-title {
  color: white;
}

.dark-mode-user-logo {
     
    color:aliceblue;
}

.return-button {

    cursor: pointer;
    display:flex;
    background-color: aquamarine;
    width: 14rem;
    height: 2.6rem;
    border-radius: 25px;
    align-items: center;
    justify-content: center;
    color:rgb(109, 140, 155);
    font-size: 1.4rem;  
}

.container-user-connexion-desktop {
    
    margin: 2rem 0 0 0;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem ;
    
}

.container-user-dark-theme {

    display: flex;
    padding-right: 2rem;
    align-items: center;
    gap:1rem;
    justify-content: flex-end;
    
}

.container-logo-pseudo {

    display: flex;
    flex-direction: column;
    align-items: center;
}

.container-user-connexion-desktop2 {

    background-color: aquamarine;
    height:2rem;
    width:100%;
}

@import url('../styles/Header.css');


</style>