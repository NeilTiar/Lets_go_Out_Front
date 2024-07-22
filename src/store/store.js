import { createStore } from 'vuex';
import { useRoute } from 'vue-router';
import createPersistedState from "vuex-persistedstate";

const store =  createStore({

    state: {

        isDarkMode: false, 
        pseudo: 'visitor', // Initialise le pseudo à une valeur par défaut
        selectedReview: null,
        initialReviews: [],
        currentReviewsPage: "",
        accessToken: null,
        refreshToken: null, 
        isAdmin: false,
    },

     getters: {
 
    isAdmin(state) {
      return state.isAdmin; // Retourne true si l'utilisateur est administrateur
    }
  },
  

    mutations: {

        setIsAdmin(state, isAdmin) {
            state.isAdmin = isAdmin
        },

       
        setTotalReviews(state, totalReviews) {
            state.totalReviews = totalReviews;
        },


        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
        },


        setRefreshToken(state, refreshToken) {
            state.refreshToken = refreshToken;
        },

    
        lastReviewsPage(state, pageNumber) {

            state.currentReviewsPage = pageNumber;
            console.log("currentReviewsPage from vue store : ", this.currentReviewsPage)

        },


        setSelectedReview(state, review) {
            state.selectedReview = review;

            // Stockage des données dans localStorage pour concerver l'ordre des reviews
            localStorage.setItem('selectedReview', JSON.stringify(review));
        },

        setReviews(state, reviews) {

            state.reviews = reviews;


        },

        setInitialReviews(state, reviews) {
            state.initialReviews = reviews;
        },




        setPseudo(state, pseudo) {
            state.pseudo = pseudo;
        },


        setIsDarkMode(state, isDarkMode) {

            console.log("toggleDarkMode is called");
            state.isDarkMode = isDarkMode;

        },

        toggleDarkMode(state) {
            console.log("toggleDarkMode is called");
            state.isDarkMode = !state.isDarkMode;
        },


    },



    actions: {

        updateIsAdmin({commit}, isAdmin) {
        commit('setIsAdmin', isAdmin)

        },

             updateAccessToken({ commit }, accessToken) {
            commit('setAccessToken', accessToken);
        },

            currentRefreshToken({ commit }, refreshToken) {
            commit('setRefreshToken', refreshToken);
        },


        getLastReviewsPage({ commit }, pageNumber) {
            commit('lastReviewsPage', pageNumber);
        },

        updateReviewsPage({ commit }, pageNumber) {

            commit('setReviewsPage', pageNumber)
        },


        updatePseudo({ commit }, pseudo) {
            commit('setPseudo', pseudo);
        },

        setIsDarkMode({ commit }, isDarkMode) {
            console.log("toggleDarkMode is called");
            commit('setIsDarkMode', isDarkMode);
        },


        isDarkmodeActive() {

           /* const cardInfo = document.getElementsByClassName('card-info');
            const cardContainer = document.getElementsByClassName('card-container');*/

            this.isDarkMode = !this.isDarkMode
            this.darkTheme = !this.darkTheme
            document.body.style.transition = 'background-color 0.8s ease';

            // Changez la couleur du fond du body
            document.body.style.backgroundColor = this.isDarkMode ? '#0f0311' : 'white';

            //exemple pour Changez la couleur de fond de la card-container avec javascript ,mais finalement géré avec les classes conditionnelles.

         /*   if ((cardInfo.length > 0 && cardContainer)) {

                Array.from(cardInfo).map(card => {
                    card.style.color = this.isDarkMode ? '' : '';

                    Array.from(cardContainer).map(card => {

                        card.style.backgroundColor = this.isDarkMode ? '#0f4044' : '';

                    })

                })

            } */

            const route = useRoute();

            if (route !== '/review-details' && route !== undefined && route !== null) {
                document.querySelector('.logo-camera').style.filter = !this.isDarkMode ? 'invert(100%)' : '';
                document.querySelector('.msg-user-logo').style.filter = !this.isDarkMode ? 'invert(100%)' : '';
                console.log(document.querySelector('.logo-camera'))
            }

            // Assurez-vous de réinitialiser la transition après la transition terminée pour éviter de l'appliquer à d'autres changements non souhaités
            setTimeout(() => {
                document.body.style.transition = '';
            }, 500);
            console.log("from func :", this.isDarkMode)

        },

    },

  // permet de conserver letat du state pendant la visite du client ( changement de page , connexion etc ....)
  plugins: [createPersistedState()],
});



export default store;