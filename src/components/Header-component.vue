<template>
    <div
        class="header-container"
        :class="{ 'desktop-style': isDesktop, 'mobile-style': !isDesktop, 'header-darkmode' : isDarkMode }"
        @scroll-up="handleScroll"
    >
        <div class="header">
            <div class="container-logo-title">
                <div class="container-title">
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

                <div
                    class="container-mobile-logo"
                >
                    <div
                        v-if="!isDesktop"
                        class="mobile-user-logo"
                        @click="mobileUserMenu"
                    >
                        <img
                            class="user-logo"
                            src="../assets/user.png"
                            alt="user"
                        >
                        <p class="user-logo-msg">Bonjour, {{ pseudo }}</p>
                        <div />
                    </div>
                </div>
            </div>
        </div>
        
        
        <div
            v-if="isDesktop"
            class="container-user-dark-theme"
        >  
            <div
                class="container-logo-pseudo"
                @mouseenter="showMenu"
                @mouseleave="hideMenu"
            >
                <img
                    class="user-logo"
                    src="../assets/user.png"
                    alt="user"
                    @mouseenter="showMenu"
                    @mouseleave="hideMenu"
                >
                <div
                    :class="{ 'msg-user-log': !isDarkMode,'dark-mode-user-logo': isDarkMode}"
                >
                    Bonjour, {{ pseudo }}
                </div>
                <div
                    v-if="isUserMenu && isUserConnected"
                    class="user-menu"
                    @mouseenter="showMenu"
                    @mouseleave="hideMenu"
                >
                    <ul>
                        <li class="user-menu-list">consulter mes Reviews</li>
                        <li
                            class="user-menu-list"
                            @click="redirectToFavorites()"
                        >
                            mes coup de coeur
                        </li>
                        <li class="user-menu-list">besoin d'aide ? Chat Room</li>
                        <li
                            class="user-menu-list"
                            @click="signOut()"
                        >
                            Déconnexion
                        </li>
                    </ul>
                </div>

                <div
                    v-if="isUserMenu && !isUserConnected"
                    class="visitor-menu"
                    @mouseenter="showMenu"
                    @mouseleave="hideMenu"
                >
                    <a 
                        v-if="isUserMenu && !isUserConnected"
                        class="user-menu-list"
                        href="/login"
                    >
                        connectez-vous
                    </a>
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
            v-if="isExcludedRoute() && isDesktop"
            :class="{ 'container-user-connexion-mobile': !isDesktop, 'container-user-connexion-desktop': isDesktop, 'dark-container-user-connexion':!isDesktop && isDarkMode }"
            @mouseover="startHover"
            @mouseout="endHover"
        >
            <div
                v-if="$route.path === '/review-details' || $route.path === '/create-review'"
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
            
                v-if="!$route.path.includes('admin')" 
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
                    <li
                        v-if="pseudo != `visitor`"
                        class="link-create-review"
                    >
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
                <div
                   
                    v-if="isAdmin && isDesktop"
                    class="admin-button-link"
                >
                    <a
                        href="/admin"
                        class="admin-link"
                    > admin-page
                        <div class="button-link-container" />
                    </a>
                </div>
            </nav>
        </div>


        <div
            v-if="!isDesktop && !isExcludedRoute()" 
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
                v-if="!isFixed && $route.path ==='/main' "
                class="create-review-banner"
                @click="navigateToCreateReview"
            >
                Créer une review
            </button>


            <div class="container-right-button">
                <div :class="[{ 'dark-button': isDarkMode }, 'right-buttons']">
                    <img
                       
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
    </div>
</template>

<script>


import darkThemeComponent from '@/components/dark-theme-component.vue';

// eslint-disable-next-line no-unused-vars
import store from '../store/store';
import { mapState } from 'vuex';
import router from '@/router';

export default {

  name: 'ComponentHeader',

  components: {
    darkThemeComponent,

  },

     emits: ['returnButtonClicked','isUserMenuFromHeader'],

 


  data() {

    return {
     
      isFixed: false,
      isClassPresent: false,
      TitleIfTopMenu: "",
      windowWidth: window.innerWidth ,
      previousScrollY: 0,
      isScrollingUpX: false,
      pseudo: this.$store.state.pseudo,
      isAdmin: this.$store.state.isAdmin,
      isUserMenu: false,
      isUserConnected : localStorage.getItem('accessToken') !== null,
    };


  }, // Déclarer explicitement l'événement ici

    computed: {

    ...mapState(['isDarkMode']),
    // Autres computed properties

    isDesktop() {

        return this.windowWidth > 1000;
    }

  },
   

  mounted() {


    window.addEventListener('scroll', this.handleScroll);

    window.addEventListener('resize', this.handleResize);

     //test get isAdmin from store 
   
   // test console.log('isAdmin from header by sore', this.isAdmin);
  
     console.log('isUserConected ', this.isUserConected );
  },


  beforeUnmount() {

    window.removeEventListener('scroll', this.handleScroll);

    window.removeEventListener('resize', this.handleResize);

  },



  methods: {


    signOut() {

      console.log('clicked on deconnexion ');
      this.$store.dispatch('updatePseudo', 'visitor');
      localStorage.removeItem('accessToken');
      window.location.reload();

    },  


  mobileUserMenu () {
    const newState = !this.isUserMenu; // Inverser l'état actuel du menu utilisateur
      this.$emit('isUserMenuFromHeader', newState); // Émettre l'événement pour mettre à jour la prop
      console.log('newState from header: ', newState);

  } ,

  redirectToFavorites() {

router.push({ path: '/favorites' })

  },


    // Fonction pour afficher la div
 showMenu () {
  this.isUserMenu = true;
  console.log("Enter" ,"this.isUserMenu :",this.isUserMenu);
},

// Fonction pour masquer la div
 hideMenu () {
  this.isUserMenu = false;
  console.log("Out","this.isUserMenu :",this.isUserMenu);
},

 

     isDarkmodeActive() {
      

      console.log("test depuis un composant pour acceder a l'etat de isDarkmode depuuis le store :",this.$store.state.isDarkMode)
      // Access and update the state from the Vuex store
      this.$store.commit('toggleDarkMode');
     
    },


    handleMouseMove(event) {
      this.mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      this.mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    },

  
     isExcludedRoute () {
        const excludedPaths = ['/review-details', '/review-details']; // Liste des chemins à exclure
      return excludedPaths.includes(this.$route.path);
      
    },
  


    
    
    handleReturnButton() {
         this.$emit('returnButtonClicked');
         //logic pour alimenter currentPage avec this.$store.state.currentReviewsPage

  // Check if currentReviewsPage is greater than 1
    if (store.state.currentReviewsPage > 1) {
        this.currentPage = store.state.currentReviewsPage;
    }


       window.history.back();
    // console.log("from return button on click")

    console.log("XXXXXX test XxxXXXXXXXXXxxxXXXXX =========>",store.state.currentReviewsPage);
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
      this.windowWidth = window.innerWidth ;
    },


  }
};

</script>



<style scoped>


 .user-menu {
    position: absolute;
    display: flex;
    top:10rem;
    height:20rem;
    width: 30rem;
     background-color: rgba(255, 255, 255, 0.616); /* Couleur de fond semi-transparente */
    backdrop-filter: blur(4.5px); /* Applique un flou */
    color: black;
    border-radius: 25px;
    z-index: 5;
    justify-content: center;
    align-items: center;
 }



 .visitor-menu {
    position: absolute;
    display: flex;
    top:10rem;
    height:6rem;
    width: 30rem;
     background-color: rgba(255, 255, 255, 0.616); /* Couleur de fond semi-transparente */
    backdrop-filter: blur(4.5px); /* Applique un flou */
    color: black;
    border-radius: 25px;
    z-index: 5;
    justify-content: center;
    align-items: center;
 }




.user-menu-list {

list-style: none;
font-size : 1.7rem;
font-weight: bolder;
margin-top: 1.5rem;
font-family: 'Courgette',cursive;
color:rgb(124, 85, 160);
transition: transform 0.3s ease;


}

.user-menu-list:hover {

transform: scale(1.5);
cursor:pointer;
color: rgba(55, 197, 102, 0.603);
text-shadow: 1px 0px 1px #CCCCCC, 0px 1px 1px #EEEEEE, 2px 1px 1px #CCCCCC, 1px 2px 1px #EEEEEE, 3px 2px 1px #CCCCCC, 2px 3px 1px #EEEEEE, 4px 3px 1px #CCCCCC, 3px 4px 1px #EEEEEE, 5px 4px 1px #CCCCCC, 4px 5px 1px #EEEEEE, 6px 5px 1px #CCCCCC, 5px 6px 1px #EEEEEE, 7px 6px 1px #CCCCCC;
}






.dark-button {

  filter: invert(100%);
}

.dark-top-menu {
  background-color: rgb(51, 47, 47);
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
    color:rgb(67, 77, 82);
    font-size: 1.4rem;  
}

.container-mobile-logo {
    display: flex;
    justify-content: flex-end;
    width:100%;
    margin-top:0.5rem;
}

.container-user-connexion-desktop {
    
    margin: 2rem 0 0 0;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem ;
    
}

.container-user-dark-theme {

    display: flex;
    align-items: center;
    gap:1rem;
    justify-content:flex-end;
    width: calc(100vw - 17px);  
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

.mobile-user-logo {
    
    display:flex;
    flex-direction: column;
    align-items: center;
    color:aliceblue;
    width: 33%;
   
}

.user-logo {
    width:40%;
    margin: auto;
}

.user-logo-msg {
    font-size: 1rem;
    color: rgb(255, 253, 253);
    margin: 0;

}

.header-darkmode {

    background-color: rgb(34, 31, 31);
}



@media screen and ( max-width : 1000px) {

  

.return-button {

 width: 35%;  
 font-size: 1.2rem;
 padding:0.3rem;
}

.container-user-connexion-mobile {
 
 margin: 1.3rem 0 0rem 1rem;
 display: flex;
 align-items: flex-start;
 
}


 .container-logo-title,
 .header {

  height:14rem;
 }

 .container-mobile-logo {
    display:flex;
    justify-content: flex-end;
    align-items: flex-end;
    height:30%;
 } 

 .container-title {
    height:70%;
 }

 .header-title {
    margin-top: 3rem;
    
 }

 .header-title,
 .title-description {
    margin-left: 0.8rem;
    
 }

 .submit-form {
    margin: auto;
 }




}

@import url('../styles/Header.css');


</style>